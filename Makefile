USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)

.PHONY: help
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z1-9_\-\/\.]+:.*?## / {printf "  \033[32m%-24s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

node_modules:
	npm install

.PHONY: start
start: node_modules ## Start in dev mode
	npm run start -- --port 8081
	@echo "➡️ Serve: http://127.0.0.1:8081/"

.PHONY: clean
clean: ## Remove files
	rm -rf node_modules
	rm -rf build
	rm -rf .docusaurus
