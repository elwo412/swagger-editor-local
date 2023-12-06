# Local Swagger-to-OpenAPI Converter

## Overview

This project provides a completely local solution for validating Swagger (OpenAPI v2/v3) documents and converting OpenAPI v2 documents into OpenAPI v3 YAML files, which are compatible with Postman. The solution includes a front-end application and a back-end server that operate entirely offline, with no external API calls.

## Features

- **Local Validation:** Validates Swagger documentation in a secure, offline environment.
- **Conversion to OpenAPI v3:** Converts Swagger documents (OpenAPI v2) to OpenAPI v3 in YAML format for compatibility with tools like Postman.
- **Fully Offline:** Privacy and security are ensured as no external API calls are needed.
- **YAML Output:** Produces beautified YAML output, optimized for readability and Postman.

## Getting Started

### Prerequisites

- Node.js and npm must be installed on your machine.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.

### Running the Application

- **Start the Application:** Navigate to the project root and execute:
    - `npm i --legacy-peer-deps`
    - `npm start`.

## Usage

- The front-end application will be accessible at `http://localhost:3001`
- The back-end server will run at `http://localhost:3000`.
- Use the front-end interface to upload and validate Swagger documents.
- Download the converted OpenAPI v3 YAML files via the interface for use in Postman or other tools.
