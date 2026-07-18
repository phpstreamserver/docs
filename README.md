# PHPStreamServer Documentation

This repository contains the source for the PHPStreamServer documentation website, published at [phpstreamserver.dev](https://phpstreamserver.dev/).

## Requirements

- Node.js 20 or later
- npm
- GNU Make (optional, for the `make` commands)

## Getting Started

Install dependencies and start the local development server:

```bash
make start
```

The site is available at [http://127.0.0.1:8081/](http://127.0.0.1:8081/).

## Docker

Build and run the production site with Docker Compose:

```bash
docker compose up -d --build
```

## Documentation Content

- Documentation pages are in [`docs/`](docs/).
- Site components and styles are in [`src/`](src/).
- Static assets are in [`static/`](static/).
- Docusaurus configuration is in [`docusaurus.config.js`](docusaurus.config.js).
