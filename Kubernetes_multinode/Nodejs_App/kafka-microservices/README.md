# Scalable Event-Driven Microservices with Kafka

## Overview

This project demonstrates a real-time, event-driven microservices architecture using Node.js, Kafka, and MongoDB. It is fully dockerized, deployable on Kubernetes with Helm, and includes CI/CD integration. The platform is designed for autonomous failure detection, recovery, and alerting.

## Stack

- Node.js (Express)
- Apache Kafka (event streaming)
- MongoDB (data storage)
- Docker (containerization)
- Kubernetes + Helm (orchestration)
- CI/CD: Jenkins or GitHub Actions

## Microservices

- **producer-service**: Publishes events to Kafka topics.
- **consumer-service**: Subscribes to Kafka topics, processes events, and stores results in MongoDB.
- **alert-service**: Monitors system health, detects failures, and sends alerts.

## Features

- Real-time event streaming with Kafka
- Scalable, stateless microservices
- Health checks, liveness/readiness probes
- Automated recovery and alerting
- Helm charts for easy deployment
- CI/CD pipeline example

## Directory Structure

- `producer-service/` - Node.js Kafka producer
- `consumer-service/` - Node.js Kafka consumer
- `alert-service/` - Node.js health/alert microservice
- `k8s/` - Kubernetes manifests and Helm charts
- `ci/` - CI/CD pipeline examples

---

## Quick Start

1. Build Docker images for each service
2. Deploy Kafka, MongoDB, and microservices to Kubernetes using Helm
3. Verify health, simulate failures, and observe autonomous recovery/alerting

See each subdirectory for service-specific code and configuration.
