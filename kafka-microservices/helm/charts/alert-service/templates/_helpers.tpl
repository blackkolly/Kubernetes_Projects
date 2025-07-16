{{- define "alert-service.fullname" -}}
{{- printf "%s-%s" .Release.Name "alert-service" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- define "alert-service.name" -}}
alert-service
{{- end -}}
{{- define "alert-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{- end -}}
