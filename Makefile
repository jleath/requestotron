include .env

# ==================================================================================== #
# HELPERS
# ==================================================================================== #

## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'

.PHONY: confirm
confirm:
	@echo -n 'Are you sure? [y/N] ' && read ans && [ $${ans:-N} = y ]

# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## run/requesto: run the requestotron app
.PHONY: run/requesto
run/requesto:
	node ./url-gen/index.js

## db/psql: connect to the database using psql
.PHONY: db/psql
db/psql:
	psql ${REQUESTO_DB_DSN}

## db/migrations/new name=$1: create a new database migration
.PHONY: db/migrations/new
db/migrations/new:
	@echo 'Creating migration file for ${name}...'
	migrate create -seq -ext=.sql -dir=./migrations ${name}

## db/migrations/up: apply 1 up database migration
.PHONY: db/migrations/up
db/migrations/up: confirm
	@echo 'Running 1 up migration...'
	migrate -path ./migrations -database ${REQUESTO_DB_DSN} up 1
