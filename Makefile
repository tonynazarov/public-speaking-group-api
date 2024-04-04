# -----------------------------------------------------------------------------
# Makefile
# -----------------------------------------------------------------------------

# Docker Compose v2.x
DOCKER_COMPOSE = docker compose

COMPOSE_FILE = ./docker-compose.yml

DOCKER_COMPOSE_ENV_LOCAL = $(DOCKER_COMPOSE) -f $(COMPOSE_FILE)

# -----------------------------------------------------------------------------
# -----------------------------------------------------------------------------

up: local-docker-up
down: local-docker-down
restart: down up
ps: local-docker-ps
logs: local-docker-logs
nginx: local-docker-exec-nginx

local-docker-up:
	$(DOCKER_COMPOSE_ENV_LOCAL) --env-file .env.local up -d --build --remove-orphans

local-docker-down:
	$(DOCKER_COMPOSE_ENV_LOCAL) --env-file .env.local down --remove-orphans

local-docker-ps:
	$(DOCKER_COMPOSE_ENV_LOCAL) --env-file .env.local ps --all

local-docker-logs:
	$(DOCKER_COMPOSE_ENV_LOCAL) --env-file .env.local logs

local-docker-exec-nginx:
	$(DOCKER_COMPOSE_ENV_LOCAL) --env-file .env.local exec nginx sh

# -----------------------------------------------------------------------------
# -----------------------------------------------------------------------------

.PHONY: tests
tests:
	php bin/phpunit

