
PRE_COMMIT = quality-staged
HEADER ?= "// Copyright © 2017 The Things Network\n// Use of this source code is governed by the MIT license that can be found in the LICENCE file."

include .make/*.make
include .make/js/*.make

dev-deps: js.dev-deps
test: js.test
quality: js.quality typecheck headers.check
quality-staged: js.quality-staged headers.fix-staged typecheck-staged

BABEL_FLAGS = -D --ignore '*.test.js'
build: js.build

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

only_pb = grep '_pb\.js$$'

protos: fix-protos

compile-protos:
	$(log) "building protos"
	@mkdir -p $(PROTO_DIR)
	@$(PROTOC) $(PROTOC_FLAGS) --js_out=import_style=commonjs,binary:$(PROTO_DIR) $(GOLAST)/src/github.com/TheThingsNetwork/ttn/api/discovery/discovery.proto

fix-protos: compile-protos
	$(log) "fixing protos"
	@$(JS_FILES) | $(only_pb) | xargs sed -i.bk 's:\([^/]\)github\.com:\1github_com:g'
	@find $(PROTO_DIR) -name '*_pb.js.bk' | xargs rm


DOCJS = ./node_modules/.bin/documentation
DOCJS_FLAGS = --shallow

DOC_FILE = DOCUMENTATION.md

docs:
	$(log) building documentation
	@$(DOCJS) build `$(JS_LINT_FILES)` $(DOCJS_FLAGS) -f md > $(DOC_FILE)

FLOW = ./node_modules/.bin/flow

typecheck:
	@$(FLOW) check

typecheck-staged:
	@CODE=0; for file in `$(JS_STAGED_FILES)`; do $(FLOW) focus-check --quiet $$file || { $(erri) "type error in $$file"; CODE=1; }; done; exit $$CODE

typestatus:
	@$(FLOW) status

