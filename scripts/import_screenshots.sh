#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
source "${SCRIPT_DIR}/lib/common.sh"

DRY_RUN=false
for arg in "$@"; do
  [[ "$arg" == "--dry-run" ]] && DRY_RUN=true
done

require_mirae_app_dir

LOCALES_SRC=("ko"    "en-US")
LOCALES_TGT=("ko"    "en")

for i in "${!LOCALES_SRC[@]}"; do
  locale_src="${LOCALES_SRC[$i]}"
  locale_tgt="${LOCALES_TGT[$i]}"

  src_dir="${MIRAE_APP_DIR}/fastlane/screenshots/ios/${locale_src}"
  tgt_dir="${REPO_ROOT}/public/screens/${locale_tgt}"

  if [[ ! -d "$src_dir" ]]; then
    log_error "Source directory does not exist: ${src_dir}"
    exit 1
  fi

  # Count PNG files
  png_count=0
  while IFS= read -r -d '' _; do
    (( png_count++ )) || true
  done < <(find "$src_dir" -maxdepth 1 -name '*.png' -print0)

  if (( png_count < 5 || png_count > 10 )); then
    log_error "PNG count ${png_count} is outside valid range [5, 10] in: ${src_dir}"
    exit 1
  fi

  if $DRY_RUN; then
    log_info "ios/${locale_src} → ${tgt_dir}  (${png_count} files, dry-run)"
    n_changed=0
    n_new=0
    n_unchanged=0
    n_stale=0

    # Collect source filenames for stale detection
    declare -A src_names=()
    while IFS= read -r -d '' src_file; do
      src_names["$(basename "$src_file")"]=1
    done < <(find "$src_dir" -maxdepth 1 -name '*.png' -print0)

    while IFS= read -r -d '' src_file; do
      filename="$(basename "$src_file")"
      tgt_file="${tgt_dir}/${filename}"

      if [[ ! -e "$tgt_file" ]]; then
        status="NEW"
        (( n_new++ )) || true
      elif cmp -s "$src_file" "$tgt_file"; then
        status="UNCHANGED"
        (( n_unchanged++ )) || true
      else
        status="CHANGED"
        (( n_changed++ )) || true
      fi

      printf "  %-40s %s\n" "${filename}" "${status}"
    done < <(find "$src_dir" -maxdepth 1 -name '*.png' -print0 | sort -z)

    # Report stale files present in target but absent from source
    if [[ -d "$tgt_dir" ]]; then
      while IFS= read -r -d '' tgt_file; do
        filename="$(basename "$tgt_file")"
        if [[ -z "${src_names[$filename]:-}" ]]; then
          printf "  %-40s %s\n" "${filename}" "STALE"
          (( n_stale++ )) || true
        fi
      done < <(find "$tgt_dir" -maxdepth 1 -name '*.png' -print0 | sort -z)
    fi
    unset src_names

    log_info "dry-run: ${n_changed} changed, ${n_new} new, ${n_unchanged} unchanged, ${n_stale} stale"
  else
    mkdir -p "$tgt_dir"
    find "$tgt_dir" -maxdepth 1 -name '*.png' -delete
    copied=0

    while IFS= read -r -d '' src_file; do
      filename="$(basename "$src_file")"
      cp "$src_file" "${tgt_dir}/${filename}"
      (( copied++ )) || true
    done < <(find "$src_dir" -maxdepth 1 -name '*.png' -print0 | sort -z)

    log_info "copied ${copied} file(s) to ${tgt_dir}/"
  fi
done
