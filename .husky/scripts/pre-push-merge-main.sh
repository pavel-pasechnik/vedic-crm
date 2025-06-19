#!/bin/sh

# Checking for bash
if ! command -v bash > /dev/null 2>&1; then
  echo "Error: Bash is not available. Please install Bash."
  exit 1
fi

# Origin check
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "No remote origin found. Skipping merge."
  exit 0
fi

echo "Fetching latest origin/main..."
git fetch origin main

echo "Merging origin/main into current branch..."
git merge --no-commit --no-ff origin/main

if [ $? -ne 0 ]; then
  echo "Merge conflict detected. Resolve conflicts before pushing."
  exit 1
fi
