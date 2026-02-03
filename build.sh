#!/usr/bin/env bash

if ! which redocly
then
    echo "Error: redocly not installed. Try: npm i -g @redocly/cli@latest"
    exit 1
fi

redocly bundle b2u.yaml -o b2u-combined.yaml

if [ "$?" -ne "0" ]; then
    echo "Failed to bundle documentation"
    exit 1
fi

redocly lint --skip-rule operation-4xx-response b2u-combined.yaml

if [ "$?" -ne "0" ]; then
    echo "Validation failed for documentation"
    failed=1
    exit 1
fi

echo "Documentation successfully built"
