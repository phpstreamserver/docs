USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)

.PHONY: help
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z1-9_\-\/\.]+:.*?## / {printf "  \033[32m%-24s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

node_modules:
	@docker run -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:25 bash -c "yarn install"

.PHONY: dev
dev: node_modules ## Start in dev mode
	@docker run -p 3000:3000 -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:25 bash -c "yarn start -h 0.0.0.0"
	@echo "➡️ Serve: http://127.0.0.1:3000/"

.PHONY: upgrade
upgrade: node_modules ## Yarn upgrade
	@docker run -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:25 bash -c "yarn upgrade"

.PHONY: bash
bash: node_modules ## Go to bash console
	@docker run -it --rm --user=${USER_ID}:${GROUP_ID} -v ./:/app/ -w /app/ node:25 bash

.PHONY: clean
clean: ## Remove files
	@rm -rf node_modules
	@rm -rf build
	@rm -rf .docusaurus
