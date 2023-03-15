# compose-generator

This script creates a docker-compose.yml file using the provided information, which configures a PostgreSQL instance running in a Docker container.
if you give empty answers, values ​​will be passed by default.

The write-yaml-file library is used to create and write to the docker-compose.yml file.

## How use this package

Install dependancies
```sh
npm install
```

For create docker-compose.yaml
```sh
npm run generate-docker-compose
```

## Output example after running
```yaml
version: '3'
services:
  posgresDB:
    container_name: postgres
    restart: 'no'
    env_file: .env
    image: postgres:14.5-alpine
    environment:
      POSTGRES_USER: ' superusername'
      POSTGRES_PASSWORD: superpassword
      POSTGRES_DB: mydatabasename
    volumes:
      - mystrapi-data:/var/lib/postgresql/data/
ports:
  - '5432:5432'
volumes:
  mystrapi-data:
```