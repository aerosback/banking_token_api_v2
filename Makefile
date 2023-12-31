API_CONTAINER_NAME=api

up:
	@docker-compose up -d

down: up
	@docker-compose down

install: up
	@docker-compose exec $(API_CONTAINER_NAME) npm install $(ARGS)

.PHONY: build
build: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run build

run-dev: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run dev

run-start: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run start

run-build: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run build

run-test-all: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run test:all

run-test-unit: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run test:unit

run-test-unit-coverage: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run test:unit:coverage

run-test-e2e: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run test:e2e

eslint-check: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run eslint:check

eslint-fix: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run eslint:fix
