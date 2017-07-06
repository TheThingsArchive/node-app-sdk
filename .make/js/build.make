
# build the src files
js.build:
	@$(BABEL) $(JS_SRC) $(BABEL_FLAGS) -d $(PUBLIC_DIR)

# vim: ft=make
