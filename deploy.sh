#!/usr/bin/env sh

# abort on errors
set -e

env PUBLIC_URL=https://sarveshmayil.github.io/personal npm run build

cd build

git init
git add -A
git commit -m 'deploy'

# deploying to https://{USERNAME}.github.io/{REPO}
git push -f git@github.com:sarveshmayil/personal-website.git main:gh-pages