#!/bin/bash

source .env

files=$(git diff --name-only ../SD)

for path in $files
do
    filename="${path#SD/}"
    git diff --stat "../$path"
    read -p "upload ${filename}? [y/N] " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Uploading $filename"
        curl -F "$filename=@../$path" "$IOTA_HOST/edit"
    fi
done

