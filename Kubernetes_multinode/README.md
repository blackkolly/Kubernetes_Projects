# Netflix-like Streaming Service on Kubernetes (Docker Desktop, Windows)

## Project Overview

This project is a full-stack Netflix-like streaming service with:

- **Backend:** Java Spring Boot (REST API, MongoDB, JWT security)
- **Frontend:** React (Netflix-style UI, advanced video player)
- **Database:** MongoDB
- **DevOps:** Docker, Kubernetes, ConfigMaps, Secrets, Nginx, Ingress

---

## Directory Structure & Key Files

- `Dockerfile` (root): Builds the backend (Spring Boot) Docker image.
- `frontend/Dockerfile`: Builds the frontend (React) Docker image.
- `k8s-app.yaml`: Deploys both backend and frontend (Deployments & Services).
- `mongodb-production.yaml`: Persistent MongoDB Deployment, PVC, and Service.
- `mongodb-testing.yaml`: Ephemeral MongoDB for development/testing.
- `configmap.yaml`: Contains `frontend-config` and `backend-config` ConfigMaps.
- `secret.yaml`: Contains both backend and frontend Kubernetes Secrets.
- `k8s-nginx-configmap.yaml`: Nginx config for frontend reverse proxy.
- `k8s-ingress.yaml`: (Optional) Ingress resource for host-based routing.
- `src/main/resources/application.properties`: Spring Boot backend config.

---

## Step-by-Step Setup & Commands

### 1. Enable Kubernetes in Docker Desktop

- Open Docker Desktop → Settings → Kubernetes → Enable Kubernetes.

### 2. Build Docker Images

From the `Kubernetes_multinode` directory:

**Backend:**

```bash
docker build -t my-flask-app-backend:latest -f Dockerfile .
```

**Frontend:**

```bash
docker build -t my-flask-app-frontend:latest -f frontend/Dockerfile frontend
```

### 3. Apply Kubernetes Resources

Apply in this order:

```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f mongodb-production.yaml   # or mongodb-testing.yaml for dev
kubectl apply -f k8s-nginx-configmap.yaml
kubectl apply -f k8s-app.yaml
# (Optional) kubectl apply -f k8s-ingress.yaml
```

### 4. Check Status

```bash
kubectl get pods
kubectl get svc
kubectl get endpoints netflix-frontend
```

### 5. Access the Application

- **Port-forward (always works):**
  ```bash
  kubectl port-forward svc/netflix-frontend 8080:80
  ```
  Visit: http://localhost:8080
- **Or, try LoadBalancer port:**
  ```bash
  kubectl get svc
  # Look for the PORT (e.g., 30544) and try http://localhost:30544
  ```

### 6. Troubleshooting

- **Pod logs:**
  ```bash
  kubectl logs <pod-name>
  ```
- **Pod events:**
  ```bash
  kubectl describe pod <pod-name>
  ```

---

## Functions of Each File

- **Dockerfile (root):** Builds backend image from Spring Boot JAR.
- **frontend/Dockerfile:** Builds frontend image from React build.
- **k8s-app.yaml:**
  - Deploys backend and frontend as Kubernetes Deployments and Services.
  - Uses local Docker images (`my-flask-app-backend:latest`, `my-flask-app-frontend:latest`).
- **mongodb-production.yaml:** MongoDB with persistent storage (PVC).
- **mongodb-testing.yaml:** MongoDB with ephemeral storage (for dev/testing).
- **configmap.yaml:**
  - `frontend-config`: Frontend environment variables (e.g., API URL).
  - `backend-config`: Backend environment variables (e.g., log level, features).
- **secret.yaml:**
  - `backend-secrets`: JWT secret for backend.
  - `frontend-secrets`: API key for frontend.
- **k8s-nginx-configmap.yaml:** Nginx config for frontend container (reverse proxy, static files).
- **k8s-ingress.yaml:** (Optional) Ingress resource for host-based routing.
- **src/main/resources/application.properties:** Spring Boot backend config, including actuator health endpoint exposure.

---

## Functions of Each YAML File

- **k8s-app.yaml**: Contains both backend and frontend Deployments and Services. Deploys your main application workloads and exposes them as Kubernetes services.
- **mongodb-production.yaml**: Deploys MongoDB with persistent storage using a PersistentVolumeClaim (PVC) for production use.
- **mongodb-testing.yaml**: Deploys MongoDB with ephemeral storage (emptyDir) for development or testing environments.
- **configmap.yaml**: Defines two ConfigMaps:
  - `frontend-config`: Provides environment variables for the React frontend (e.g., API URL).
  - `backend-config`: Provides environment variables for the backend (e.g., Spring profiles, log level, feature flags).
- **secret.yaml**: Defines two Kubernetes Secrets:
  - `backend-secrets`: Stores sensitive backend values (e.g., JWT secret).
  - `frontend-secrets`: Stores sensitive frontend values (e.g., API key).
- **k8s-nginx-configmap.yaml**: Provides the Nginx configuration for the frontend container, enabling reverse proxying and static file serving.
- **k8s-ingress.yaml**: (Optional) Configures Ingress for host-based routing and external access to your services.

---
