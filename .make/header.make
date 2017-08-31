
## The header to check for
HEADER ?= "// Copyright © 2017 The Things Industries B.V."

# fallbacks
GO_LINT_FILES ?= echo
GO_LINT_STAGED_FILES ?= echo

JS_LINT_FILES ?= echo
JS_LINT_STAGED_FILES ?= echo

no_blanks = sed '/^$$/d'

## THe files to check for a header
HEADER_FILES ?= { $(GO_LINT_FILES) ; $(JS_LINT_FILES); } | $(no_blanks)
HEADER_STAGED_FILES ?= { $(GO_LINT_STAGED_FILES) ; $(JS_LINT_STAGED_FILES); } | $(no_blanks)

## The number of lines in the header
HEADER_LINES = echo -e $(HEADER) | wc -l

## Check files to see if they have the required header
headers.check:
	$(log) checking headers in `echo $$($(HEADER_FILES)) | $(count)` files
	@CODE=0; for file in `$(HEADER_FILES)`; do [[ "`head -n $$($(HEADER_LINES)) $$file`" = "`echo -e $(HEADER)`" ]] || { $(erri) "incorrect or missing header in $$file"; CODE=1; }; done; exit $$CODE

headers.fix:
	$(log) fixing headers in `echo $$($(HEADER_FILES)) | $(count)` files
	@for file in `$(HEADER_FILES)`; do [[ "`head -n $$($(HEADER_LINES)) $$file`" = "`echo -e $(HEADER)`" ]] || { { echo -e $(HEADER) ; echo ; cat "$$file"; } > file.new && mv file.new "$$file"; } ; done

## Check staged files
headers.check-staged: HEADER_FILES = $(HEADER_STAGED_FILES)
headers.check-staged: headers.check

## Fix staged files
headers.fix-staged: HEADER_FILES = $(HEADER_STAGED_FILES)
headers.fix-staged: headers.fix
	@test `$(HEADER_STAGED_FILES) | wc -l` -eq 0 || git add `$(HEADER_STAGED_FILES)`

# headers vs header?
header.check: headers.check
header.fix: headers.fix
header.check-staged: headers.check-staged
header.fix-staged: headers.fix

# backwards compatability
check-header: headers.check
check-header-staged: headers.check-staged
fix-header: headers.fix
fix-header-staged: headers.fix

# vim: ft=make
