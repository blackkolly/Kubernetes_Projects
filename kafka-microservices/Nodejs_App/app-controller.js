console.log("We are inside client.js");

/* on page load  */
window.onload = function () {
  // Streaming controls
  const dataSource = document.getElementById("dataSource");
  const cryptoSymbol = document.getElementById("cryptoSymbol");
  const weatherLat = document.getElementById("weatherLat");
  const weatherLon = document.getElementById("weatherLon");
  const paramInputs = document.getElementById("paramInputs");
  const startBtn = document.getElementById("startStreamBtn");
  const stopBtn = document.getElementById("stopStreamBtn");
  const logElem = document.getElementById("liveLog");
  const logContainer = document.getElementById("liveLogContainer");
  const toggleBtn = document.getElementById("toggleLiveLogBtn");
  const clearBtn = document.getElementById("clearLogBtn");
  const logList = [];
  // Make addToLog globally accessible, with timestamp
  window.addToLog = function (msg) {
    const now = new Date().toLocaleTimeString();
    logList.unshift(`[${now}] ${msg}`);
    if (logList.length > 10) logList.length = 10;
    if (logElem)
      logElem.innerHTML = logList.map((m) => `<li>${m}</li>`).join("");
    // If log is hidden, show it automatically on new log
    if (logContainer && logContainer.style.display === "none") {
      logContainer.style.display = "";
      if (toggleBtn) toggleBtn.textContent = "Hide Live Log";
    }
  };
  // Clear log function
  window.clearLiveLog = function () {
    logList.length = 0;
    if (logElem) logElem.innerHTML = "";
  };
  if (clearBtn) {
    clearBtn.onclick = function () {
      window.clearLiveLog();
    };
  }

  // Demo: Add a few messages to the Live Log on page load
  if (window.addToLog) {
    addToLog("Welcome to the Kafka Microservices Demo!");
    addToLog("Select a data source and click Start Streaming.");
    addToLog("Live Log will show streaming actions and errors here.");
  }

  function updateParamInputs() {
    if (!dataSource) return;
    cryptoSymbol.style.display = dataSource.value === "crypto" ? "" : "none";
    weatherLat.style.display = weatherLon.style.display =
      dataSource.value === "weather" ? "" : "none";
  }
  if (dataSource) {
    dataSource.onchange = updateParamInputs;
    updateParamInputs();
  }

  let streaming = false;
  function getParams() {
    if (dataSource.value === "crypto") {
      return { symbol: cryptoSymbol.value || "bitcoin" };
    } else if (dataSource.value === "weather") {
      return { lat: weatherLat.value || 35, lon: weatherLon.value || 139 };
    }
    return {};
  }

  startBtn.onclick = function () {
    if (streaming) return;
    streaming = true;
    const params = getParams();
    let endpoint = "http://backend:4000/api/stream/" + dataSource.value;
    let body = { ...params, action: "start" };
    addToLog("Requesting to start streaming: " + dataSource.value);
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) =>
        addToLog(
          "Started streaming: " +
            dataSource.value +
            " | Response: " +
            JSON.stringify(data)
        )
      )
      .catch((err) => addToLog("Error: " + err.message));
  };
  stopBtn.onclick = function () {
    if (!streaming) return;
    streaming = false;
    const params = getParams();
    let endpoint = "http://backend:4000/api/stream/" + dataSource.value;
    let body = { ...params, action: "stop" };
    addToLog("Requesting to stop streaming: " + dataSource.value);
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) =>
        addToLog(
          "Stopped streaming: " +
            dataSource.value +
            " | Response: " +
            JSON.stringify(data)
        )
      )
      .catch((err) => addToLog("Error: " + err.message));
  };

  // For news and air, just send once
  if (dataSource) {
    dataSource.onchange = function () {
      updateParamInputs();
      if (["news", "air"].includes(dataSource.value)) {
        startBtn.onclick = function () {
          let endpoint = "http://backend:4000/api/stream/" + dataSource.value;
          addToLog("Requesting " + dataSource.value + " data");
          fetch(endpoint, { method: "POST" })
            .then((res) => res.json())
            .then((data) =>
              addToLog(
                "Sent " +
                  dataSource.value +
                  " data | Response: " +
                  JSON.stringify(data)
              )
            )
            .catch((err) => addToLog("Error: " + err.message));
        };
        stopBtn.onclick = function () {
          addToLog("No continuous streaming for this source.");
        };
      } else {
        startBtn.onclick = function () {
          if (streaming) return;
          streaming = true;
          const params = getParams();
          let endpoint = "http://backend:4000/api/stream/" + dataSource.value;
          let body = { ...params, action: "start" };
          addToLog("Requesting to start streaming: " + dataSource.value);
          fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((data) =>
              addToLog(
                "Started streaming: " +
                  dataSource.value +
                  " | Response: " +
                  JSON.stringify(data)
              )
            )
            .catch((err) => addToLog("Error: " + err.message));
        };
        stopBtn.onclick = function () {
          if (!streaming) return;
          streaming = false;
          const params = getParams();
          let endpoint = "http://localhost:4000/api/stream/" + dataSource.value;
          let body = { ...params, action: "stop" };
          addToLog("Requesting to stop streaming: " + dataSource.value);
          fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((data) =>
              addToLog(
                "Stopped streaming: " +
                  dataSource.value +
                  " | Response: " +
                  JSON.stringify(data)
              )
            )
            .catch((err) => addToLog("Error: " + err.message));
        };
      }
    };
  }

  // --- Consumed Data Fetch ---
  const fetchConsumedBtn = document.getElementById("fetchConsumedBtn");
  const consumedDataContainer = document.getElementById(
    "consumedDataContainer"
  );
  const consumedDataList = document.getElementById("consumedDataList");
  let consumedVisible = false;
  function renderConsumedData(data) {
    if (!consumedDataList) return;
    if (!Array.isArray(data) || data.length === 0) {
      consumedDataList.innerHTML = "<li>No consumed messages found.</li>";
      return;
    }
    consumedDataList.innerHTML = data
      .map((item) => {
        let ts = item.timestamp
          ? new Date(item.timestamp).toLocaleString()
          : "";
        return `<li><b>${ts}</b>: <pre style="display:inline; color:#fff;">${JSON.stringify(
          item,
          null,
          2
        )}</pre></li>`;
      })
      .join("");
  }
  if (fetchConsumedBtn) {
    fetchConsumedBtn.onclick = function () {
      consumedVisible = !consumedVisible;
      consumedDataContainer.style.display = consumedVisible ? "" : "none";
      fetchConsumedBtn.textContent = consumedVisible
        ? "Hide Consumed Data"
        : "Fetch Consumed Data";
      if (consumedVisible) {
      fetch("http://backend:4000/api/consumed")
          .then((res) => res.json())
          .then((data) => renderConsumedData(data))
          .catch((err) => {
            renderConsumedData([]);
            addToLog("Error fetching consumed data: " + err.message);
          });
      }
    };
  }
};
