{{/*
Common template helpers for naming, labels, and Prometheus annotations
*/}}

{{- define "microservice.fullname" -}}
{{- printf "%s-%s" .Release.Name .service.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "microservice.labels" -}}
app.kubernetes.io/name: {{ .service.name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ .service.name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/version: {{ .Chart.Version }}
{{- end -}}

{{- define "microservice.prometheus.annotations" -}}
prometheus.io/scrape: "true"
prometheus.io/port: "{{ .service.port }}"
{{- end -}}
