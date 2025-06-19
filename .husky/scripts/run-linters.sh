#!/bin/sh

echo "Starting RuboCop autofix loop..."
while ! bundle exec rubocop -A; do
  echo "Another round of RuboCop fixes..."
done

echo "Running HAML Lint..."
bundle exec haml-lint .

echo "Running ESLint..."
npm run lint:js || npm run lint

echo "Running Stylelint..."
npm run lint:css || npm run lint

echo "Staging any new changes after all linters..."
git add .
