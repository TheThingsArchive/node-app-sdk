
PRE_COMMIT = quality-staged

include .make/*.make
include .make/js/*.make

dev-deps: js.dev-deps
test: js.test
quality: js.quality
quality-staged: js.quality-staged

BABEL_FLAGS = -D --ignore '*.test.js'
build: js.build

PRE_COMMIT = quality_staged

.PHONY: protos docs

PROTOC ?= protoc

GOLAST ?= $(lastword $(subst :, ,$(GOPATH)))

PROTO_DIR = ./src/proto
NODE_MODULES = node_modules

PROTOC_INCLUDES ?= -I/usr/local/include \
  -I$(subst :, -I,$(GOPATH)) \
	-I`dirname $(PWD)` \
	-I$(GOLAST)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	-I$(GOLAST)/src

PROTOC_FLAGS ?= $(PROTOC_INCLUDES) \
	--grpc_out=$(PROTO_DIR) \
  --plugin=protoc-gen-grpc=$(PWD)/$(NODE_MODULES)/.bin/grpc_tools_node_protoc_plugin

protos:
	$(log) building protos
	@mkdir -p $(PROTO_DIR)
	@$(PROTOC) $(PROTOC_FLAGS) --js_out=import_style=commonjs,binary:$(PROTO_DIR) $(GOLAST)/src/github.com/TheThingsNetwork/ttn/api/discovery/discovery.proto


DOCJS = ./node_modules/.bin/documentation
DOCJS_FLAGS = --shallow

DOC_FILE = DOCUMENTATION.md

docs:
	$(log) building documentation
	@$(DOCJS) build `$(JS_LINT_FILES)` $(DOCJS_FLAGS) -f md > $(DOC_FILE)

