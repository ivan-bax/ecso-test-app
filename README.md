# ECSO Test App

A simple Node.js application for testing ECSO (ECS Operator) deployments.

## Features

- Simple HTTP server on port 8080
- Health check endpoint (`/health`)
- Info endpoint (`/info`)
- Styled HTML landing page (`/`)

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `/` | HTML landing page with app info |
| `/health` | Health check (JSON) |
| `/info` | Application info (JSON) |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `APP_VERSION` | Application version | 1.0.0 |
| `NODE_ENV` | Environment name | unknown |

## Local Development

```bash
# Run locally
node index.js

# Run with Docker
docker build -t ecso-test-app .
docker run -p 8080:8080 ecso-test-app
```

## CI/CD

This repository uses GitHub Actions to automatically build and push Docker images to Amazon ECR on every push to `main`.

### Required Secrets

- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

## Related

- [ecso-platform](https://github.com/ivan-bax/ecso-platform) - ECSO configurations
