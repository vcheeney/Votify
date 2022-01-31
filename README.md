<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="web/public/logo.png" alt="Logo" width="80" height="80" style="background: #095797; padding: 10px; border-radius: 10px;">
  </a>

  <h3 align="center">Votify</h3>

  <p align="center">
    Decentralized Voting Platform
  </p>
</div>

<!-- TABLE OF CONTENTS -->

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Database](#database)
    - [Web App](#web-app)
- [Usage](#usage)
  - [Start the database](#start-the-database)
  - [Start the web application](#start-the-web-application)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node v16 or above
- NPM
- Docker and docker-compose

### Installation

#### Database

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the database subdirectory
cd database

# Create the .env file from the template
cp database.env.template database.env
```

#### Web App

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the web project subdirectory
cd web

# Install the project dependencies
npm install

# Create the .env file from the template
cp .env.template .env

# Run the prisma migrations
npx prisma migrate reset

# Build the project
npm run build
```

<!-- USAGE EXAMPLES -->

## Usage

### Start the database

Open a terminal at the root of the project and run the following command:

```sh
docker-compose up
```

### Start the web application

In an other terminal, run the following commands:

```sh
# Move into the web project subdirectory
cd web

# Start the production application
npm run start

# If you would rather run the development server, run:
npm run dev
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: misc/screenshot.png
