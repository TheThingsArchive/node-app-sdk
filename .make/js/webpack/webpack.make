
# Include this makefile to enable webpack-related rules

## The location of the config files
CONFIG_DIR ?= config

## The place where we keep intermediate build files
CACHE_DIR ?= .cache

# Webpack
WEBPACK = ./node_modules/.bin/webpack
WEBPACK_FLAGS ?= --colors $(if $(CI),,--progress)

## Pre-build config files for quicker builds
$(CACHE_DIR)/config/%.js: $(CONFIG_DIR)/%.js
	$(log) pre-building config files [babel $<]
	@mkdir -p $(CACHE_DIR)/config
	@$(BABEL) $< >| $@


## The config file to use for client
WEBPACK_CONFIG ?= $(CONFIG_DIR)/webpack.config.js

## The config file for DLL builds
DLL_CONFIG ?= $(CONFIG_DIR)/webpack.dll.js

WEBPACK_CONFIG_BUILT = $(subst $(CONFIG_DIR)/,$(CACHE_DIR)/config/,$(WEBPACK_CONFIG))

.SECONDEXPANSION:
webpack.build: $$(WEBPACK_DEPS) $(WEBPACK_CONFIG_BUILT)
	$(log) "building client [webpack -c $(WEBPACK_CONFIG_BUILT) $(WEBPACK_FLAGS)]"
	@$(JS_ENV) $(WEBPACK) --config $(WEBPACK_CONFIG_BUILT) $(WEBPACK_FLAGS)

# build in dev mode
webpack.build-dev: NODE_ENV =
webpack.build-dev: webpack.build

# watch files
webpack.watch: WEBPACK_FLAGS += -w
webpack.watch: NODE_ENV = development
webpack.watch: webpack.build

## the location of the dll output
DLL_OUTPUT ?= $(CACHE_DIR)/dll.json

DLL_CONFIG_BUILT = $(subst $(CONFIG_DIR),$(CACHE_DIR)/config,$(DLL_CONFIG))

# DLL for faster dev builds
$(DLL_OUTPUT): $(DLL_CONFIG_BUILT) package.json yarn.lock
	$(log) "building dll file"
	@GIT_TAG=$(GIT_TAG) DLL_FILE=$(DLL_OUTPUT) NODE_ENV=$(NODE_ENV) CACHE_DIR=$(CACHE_DIR) $(WEBPACK) --config $(DLL_CONFIG_BUILT) $(WEBPACK_FLAGS)

# build dll for faster rebuilds
webpack.dll: $(DLL_OUTPUT)

webpack.dev-deps:
	$(log) "fetching webpack tools"
	@$(log) Installing webpack && $(YARN) add webpack --dev $(YARN_FLAGS)

# vim: ft=make
