#!/usr/bin/env bash
# scripts/lib/common.sh — shared helpers; source this file, do not run directly.

_SCRIPT_NAME="$(basename "${BASH_SOURCE[1]:-$0}" .sh)"

log_info() {
	echo "[${_SCRIPT_NAME}] $*"
}

log_warn() {
	echo "[${_SCRIPT_NAME}] [WARN]  $*" >&2
}

log_error() {
	echo "[${_SCRIPT_NAME}] [ERROR] $*" >&2
}

require_mirae_app_dir() {
	if [[ -z ${MIRAE_APP_DIR-} ]]; then
		log_error "MIRAE_APP_DIR is required but not set."
		log_error "Set it before running this script:"
		log_error "  export MIRAE_APP_DIR=/path/to/mirae"
		exit 1
	fi

	if [[ ! -d ${MIRAE_APP_DIR} ]]; then
		log_error "MIRAE_APP_DIR does not exist: ${MIRAE_APP_DIR}"
		log_error "  export MIRAE_APP_DIR=/path/to/mirae"
		exit 1
	fi
}
