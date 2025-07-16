{{- define "producer-service.fullname" -}}
{{- printf "%s-%s" .Release.Name "producer-service" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- define "producer-service.name" -}}
producer-service
{{- end -}}
{{- define "producer-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{- end -}}
