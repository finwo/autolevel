#!/usr/bin/env bash

# Save for later
OWD=$(realpath $(dirname $0));

echo "Updating .gitignore"
curl -s https://www.gitignore.io/api/osx,linux,windows,node > .gitignore
echo ".idea/" >> .gitignore
echo ".gtm/" >> .gitignore
echo "/data/" >> .gitignore

#echo "Updating modules"
#git submodule foreach --recursive git clean -xfd &>/dev/null
#git submodule update --init --recursive
