# Audit-log-me-identity

This is a sub-repository of the [audit-log-me](https://dev.azure.com/dxdhub/Internal%20Project-%20Software%20Development%20Infrastructure%20Deployment/_git/audit-log-me) project. This sub-repository provides a wrapper for Keycloak, allowing you to easily run a Keycloak server using Docker. It includes a realm configuration file that is automatically imported into the Keycloak instance when the container is started.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Configuration](#configuration)

## Introduction

Keycloak is an open-source identity and access management solution that provides single sign-on (SSO) capabilities for web applications and RESTful web services. This project simplifies the process of setting up and running Keycloak by leveraging Docker and including a preconfigured realm configuration file.

This repository contains the following:

- `Dockerfile`: Dockerfile for building the Keycloak Docker image.
- `predictz.json`: Realm configuration file that is imported into Keycloak when the container is started.
- `docker-compose.yml`: Docker Compose file for running Keycloak with the realm configuration.

## Getting Started

### Prerequisites

Before getting started, ensure that you have the following prerequisites installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone this repository to your local machine:

  ```bash
  git clone https://dxdhub@dev.azure.com/dxdhub/Internal%20Project-%20Software%20Development%20Infrastructure%20Deployment/_git/audit-log-me-identity
  ```

2. Navigate to the project directory:

  ```bash
  cd audit-log-me-identity
  ```

### Usage
To start the Keycloak server using Docker, run the following command:

  ```bash
  docker-compose up -d
  ```

This command will build the Keycloak Docker image and start a container based on the provided configuration. The realm configuration file (predictz.json) will be automatically imported into Keycloak during the container startup process.

Once the container is up and running, you can access the Keycloak administration console by opening a web browser and navigating to http://localhost:8080.

To stop the Keycloak server and remove the container, run the following command:

  ```bash
  docker-compose down
  ```

###Configuration
The realm configuration file (predictz.json) contains the initial setup and configuration for Keycloak. It includes predefined realms, clients, roles, users, and other settings. You can modify this file to match your specific requirements.

If you make changes to the realm configuration file after the initial import, you can update the Keycloak instance by running the following command:

```bash
docker-compose down
docker-compose up -d
```

The new configuration will be applied during the container startup process.
