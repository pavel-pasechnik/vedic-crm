#!/bin/sh

# Check if running in WSL
if grep -q Microsoft /proc/version 2>/dev/null; then
  echo "Running under WSL"
else
  echo "Not running under WSL"
fi

# Check if bash is available
if ! command -v bash > /dev/null 2>&1; then
  echo "Error: Bash is not available. Please install Git Bash or WSL."
  exit 1
fi

# Protection: if there is no remote origin
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

echo "Running RuboCop autofix loop..."
while ! bundle exec rubocop -A; do
  echo "Another round of fixes..."
done

echo "Staging any new changes after autofix..."
git add .

echo "Merge successful. Continuing push..."
exit 0
