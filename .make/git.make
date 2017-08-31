# This makefile has variables related to the git commit, branch and tags
# of your repository

.PHONY: hooks

GIT_COMMIT = `git rev-parse HEAD 2>/dev/null`
GIT_BRANCH = `git rev-parse --abbrev-ref HEAD 2>/dev/null`
GIT_TAG = $(shell git describe --abbrev=0 --tags 2>/dev/null)
BUILD_DATE = `date -u +%Y-%m-%dT%H:%M%SZ`

GIT_RELATIVE_DIR=git rev-parse --show-prefix

# All files that are not ignored by git
ALL_FILES ?= (git ls-files . && git ls-files . --exclude-standard --others) | sed 's:^:./:' | (xargs stat -c'%n' 2>/dev/null || true)

# Get all files that are currently staged, except for deleted files
STAGED_FILES = git diff --staged --name-only --diff-filter=d --relative=$$($(GIT_RELATIVE_DIR))

# Install git hooks
git.hooks:
	$(log) "installing git hooks"
	@touch .git/hooks/pre-commit
	@chmod u+x .git/hooks/pre-commit
	@grep pre-commit .git/hooks/pre-commit >/dev/null || echo "make pre-commit" >> .git/hooks/pre-commit

# noop does nothing
_noop:
	$(warn) "Warning: no pre-commit hooks set, add them by overriding PRE_COMMIT in your makefile"

# Change this to add more pre commit targets
PRE_COMMIT ?= _noop

# this will run before every commit
pre-commit: $(PRE_COMMIT)

# vim: ft=make
