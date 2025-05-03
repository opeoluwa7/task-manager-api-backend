#!/bin/zsh

rm -rf dist

echo "deleting dist"

sleep 3

npm run build

echo "creating build"

sleep 3

git add .

sleep 3

git commit -m "test"

sleep 3

git push origin main
