# Docker Setup Guide

This application is fully dockerized and ready to deploy. Follow these instructions to run the application using Docker.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. **Clone or extract the project** (if you haven't already)

2. **Navigate to the project root directory**

3. **Start all services**:
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database (port 5432)
   - Spring Boot backend (port 8080)
   - React frontend (port 3000)

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Services

### PostgreSQL Database
- **Port**: 5432
- **Database**: securedIT
- **Username**: postgres
- **Password**: 12345678
- **Data persistence**: Data is stored in a Docker volume (`postgres_data`)

### Backend (Spring Boot)
- **Port**: 8080
- **Health Check**: http://localhost:8080/api/auth/register
- Automatically connects to PostgreSQL database
- Seeds initial scenario data on first startup

### Frontend (React + Nginx)
- **Port**: 3000
- Serves the React application
- Proxies API requests to backend

## Environment Variables

You can customize the configuration by modifying the `docker-compose.yml` file or setting environment variables:

### Backend Environment Variables:
- `SPRING_DATASOURCE_URL`: Database connection URL (default: jdbc:postgresql://postgres:5432/securedIT)
- `SPRING_DATASOURCE_USERNAME`: Database username (default: postgres)
- `SPRING_DATASOURCE_PASSWORD`: Database password (default: 12345678)
- `CORS_ALLOWED_ORIGINS`: Allowed CORS origins (default: http://localhost:3000)

### Database Environment Variables:
- `POSTGRES_DB`: Database name (default: securedIT)
- `POSTGRES_USER`: Database user (default: postgres)
- `POSTGRES_PASSWORD`: Database password (default: 12345678)

## Useful Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild containers
```bash
docker-compose up -d --build
```

### Stop and remove volumes (clears database)
```bash
docker-compose down -v
```

### Check service status
```bash
docker-compose ps
```

## Production Deployment

For production deployment, consider:

1. **Change default passwords** in `docker-compose.yml`
2. **Use environment variables** for sensitive data
3. **Set up SSL/TLS** certificates
4. **Configure proper CORS origins** for your domain
5. **Use a production database** instead of the default PostgreSQL setup
6. **Set up proper logging** and monitoring

## Troubleshooting

### Port already in use
If ports 3000, 8080, or 5432 are already in use, modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Change frontend port
  - "8081:8080"  # Change backend port
  - "5433:5432"  # Change database port
```

### Database connection issues
- Ensure PostgreSQL container is healthy: `docker-compose ps`
- Check database logs: `docker-compose logs postgres`
- Verify environment variables are set correctly

### Frontend not loading
- Check if backend is running: `docker-compose logs backend`
- Verify nginx configuration
- Check browser console for errors

### Rebuild after code changes
```bash
docker-compose up -d --build
```

## Data Persistence

Database data is persisted in a Docker volume. To completely reset:
```bash
docker-compose down -v
docker-compose up -d
```

This will remove all data and reseed with initial scenarios.

