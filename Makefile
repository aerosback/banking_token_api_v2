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

migrate-banking-create: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run migrate:banking:create $(ARGS)

migrate-banking-run: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run migrate:banking:run

migrate-banking-revert: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run migrate:banking:revert

seed-banking-create: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run seed:banking:create $(ARGS)

seed-banking-run: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run seed:banking:run

seed-banking-revert: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run seed:banking:revert

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
