
# Set this to the capability your package needs to check for
LICENSE_CAP ?= <unset>

# The directory to cache the license key in
CACHE_DIR ?= .cache

# The name of the license cehck package
LICENSE_PKG_NAME = github.com/TheThingsIndustries/infrastructure/license/check

# The name of the license package when vendored
LICENSE_PKG_VENDORED ?= vendor/$(LICENSE_PKG_NAME)

# Check if the license package is vendored
ifneq ($(wildcard $(LICENSE_PKG_VENDORED)),)
	LICENSE_PKG ?= $(GO_PKG)/$(LICENSE_PKG_VENDORED)
else
	LICENSE_PKG ?= $(LICENSE_PKG_NAME)
endif

# The variable to put the license key in
LICENSE_KEY_VAR ?= $(LICENSE_PKG).publicKey

# The variable to put the license capability in
LICENSE_CAP_VAR ?= $(LICENSE_PKG).capability

# The location where to locally cache the license key
LICENSE_KEY_FILENAME ?= $(CACHE_DIR)/license.pub

# The url to fetch the license key from
LICENSE_KEY_URL = https://thethingsindustries.com/license.pub

LICENSE_KEY ?= cat "$(LICENSE_KEY_FILENAME)" 2>/dev/null | head -n -1 | tail -n +2 | tr -d '\n'

# Use these vars in you ld flags
ifneq ($(LICENSE_CAP),<unset>)
	LICENSE_VARS ?= -X $(LICENSE_KEY_VAR)=`$(LICENSE_KEY)` -X $(LICENSE_CAP_VAR)=$(LICENSE_CAP)
endif

# cache the license key
license-key: $(LICENSE_KEY_FILENAME)

$(LICENSE_KEY_FILENAME):
	$(log) "fetching license key from $(LICENSE_KEY_URL)"
	@mkdir -p $(CACHE_DIR)
	@curl -fsSL $(LICENSE_KEY_URL) > $(LICENSE_KEY_FILENAME)

# vim: ft=make
