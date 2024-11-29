USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)

.PHONY: help
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z1-9_\-\/\.]+:.*?## / {printf "  \033[32m%-24s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

node_modules:
	@docker run -p 3000:3000 -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:23 bash -c "yarn install"

.PHONY: start
start: node_modules ## Yarn start
	@docker run -p 3000:3000 -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:23 bash -c "yarn start -h 0.0.0.0"

.PHONY: upgrade
upgrade: node_modules ## Yarn upgrade
	@docker run -p 3000:3000 -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:23 bash -c "yarn upgrade"

.PHONY: build
build: node_modules ## Yarn build
	@docker run -p 3000:3000 -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:23 bash -c "yarn build"
