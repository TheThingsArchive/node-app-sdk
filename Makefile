
PRE_COMMIT = quality-staged
HEADER ?= "// Copyright © 2017 The Things Network\n// Use of this source code is governed by the MIT license that can be found in the LICENSE file."

JS_FILES ?= $(ALL_FILES) | $(only_js) | $(not_flowtyped)
JS_STAGED_FILES = $(STAGED_FILES) | $(only_js) | $(not_flowtyped)

NODE_MODULES = ./node_modules

include .make/*.make
include .make/js/*.make

dev-deps: js.dev-deps type-deps
test: js.test
quality: js.quality typecheck headers.check
quality-staged: js.quality-staged headers.fix-staged typecheck-staged

BABEL_FLAGS = -D --ignore '*.test.js'
build: js.build

.PHONY: docs

DOCJS = ./node_modules/.bin/documentation
DOCJS_FLAGS = --shallow

DOC_FILE = DOCUMENTATION.md

docs:
	$(log) building documentation
	@$(DOCJS) build `$(JS_LINT_FILES)` $(DOCJS_FLAGS) -f md > $(DOC_FILE)

FLOW = ./node_modules/.bin/flow

typecheck:
	$(log) "typechecking all files"
	@$(FLOW) check

typecheck-staged:
	$(log) "typechecking `$(JS_STAGED_FILES) | $(count)` js files"
	@CODE=0; for file in `$(JS_STAGED_FILES)`; do $(FLOW) focus-check --quiet $$file || { $(erri) "type error in $$file"; CODE=1; }; done; exit $$CODE

typestatus:
	$(log) "checking flow status"
	@$(FLOW) status

FLOW_TYPED = $(NODE_MODULES)/.bin/flow-typed

type-deps:
	$(log) "installing type definitions"
	@$(FLOW_TYPED) install


not_flowtyped = grep -v './flow-typed'

JS_FILES ?= $(ALL_FILES) | $(only_js) | $(not_flowtyped)
JS_STAGED_FILES = $(STAGED_FILES) | $(only_js) | $(not_flowtyped)
