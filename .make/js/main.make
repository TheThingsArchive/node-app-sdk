
NODE = node
NPM = npm
YARN = yarn
ESLINT = ./node_modules/.bin/eslint
BABEL = ./node_modules/.bin/babel
JSON = ./node_modules/.bin/json
JEST = ./node_modules/.bin/jest

NODE_ENV ?= production

YARN_FLAGS ?= --no-emoji --no-progress
ESLINT_FLAGS ?= --no-ignore --color
BABEL_FLAGS ?= -D

PUBLIC_DIR ?= dist

JS_ENV = \
	PUBLIC_DIR=$(PUBLIC_DIR) \
	CACHE_DIR=$(CACHE_DIR) \
	NODE_ENV=$(NODE_ENV) \
	GIT_TAG=$(GIT_TAG)

JS_SRC ?= src

JS_FILES ?= $(ALL_FILES) | $(only_js)

JS_STAGED_FILES = $(STAGED_FILES) | $(only_js)

JS_TESTS ?= $(JS_FILES) | grep "\.test\.js$$"

VERSION = cat package.json | $(JSON) version

# Filters

## select only js files
only_js = grep '\.js$$'

## ignore proto files
no_pb = grep -vE '_pb\.js$$'

# Rules

## install dev dependencies
js.dev-deps:
	$(log) "fetching js tools"
	@command -v yarn > /dev/null || ($(log) Installing yarn && npm install -g yarn)
	@$(log) Installing json && $(YARN) add json --dev $(YARN_FLAGS)
	@$(log) Installing eslint && $(YARN) add eslint eslint-config-ttn --dev $(YARN_FLAGS)
	@$(log) Installing babel && $(YARN) add babel-cli babel-preset-ttn --dev $(YARN_FLAGS)
	@$(log) Installing jest && $(YARN) add jest jest-preset-ttn --dev $(YARN_FLAGS)

js_init_script = \
	var fs = require('fs'); \
	try { var pkg = require('./package.json') } catch(err) { pkg = {} }; \
	pkg.babel = pkg.babel || { presets: [ 'ttn' ] }; \
	pkg.eslintConfig = pkg.eslintConfig || { extends: 'ttn' }; \
	pkg.jest = pkg.jest || { preset: 'jest-preset-ttn' }; \
	fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

## initialize repository
js.init:
	$(log) "initializing js"
	@echo "$(js_init_script)" | node

INIT_RULES += js.init

## install dependencies
js.deps:
	$(log) "fetching js dependencies"
	@$(YARN) install $(YARN_FLAGS)

## clean build files
js.clean:
	$(log) "cleaning js public dir" [rm -rf $(PUBLIC_DIR)]
	@rm -rf $(PUBLIC_DIR)

# list js files
js.list:
	@$(JS_FILES) | sort

# list js files
js.list-staged:
	@$(JS_STAGED_FILES) | sort

# vim: ft=make
