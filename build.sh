#!/usr/bin/env bash

if ! which spectral
then
    echo "Warning: spectral not installed to validate schema. Try: npm install -g @stoplight/spectral-cli"
    echo "Skipping validation"
else
    spectral -F info lint b2u.yaml
    if [ "$?" -ne "0" ]; then
        echo "Aborting build as validation failed"
        exit 1;
    else
        # Successful spectral run is missing a newline
        echo
        echo "Validation successful"
    fi
fi

if ! which speccy
then
    echo "Error: speccy not installed. Try: npm install -g speccy"
    exit 1
fi

speccy resolve b2u.yaml -o b2u-combined.yaml

if [ "$?" -eq "0" ]; then
    echo "Success!"
fi