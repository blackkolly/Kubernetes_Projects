{{- define "consumer-service.fullname" -}}
{{- printf "%s-%s" .Release.Name "consumer-service" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- define "consumer-service.name" -}}
consumer-service
{{- end -}}
{{- define "consumer-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{- end -}}
