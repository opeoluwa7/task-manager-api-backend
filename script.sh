#!/bin/zsh


echo "deleting dist"

rm -rf dist

sleep 3

echo "Creating build"
npm run build

sleep 3

echo "git add"

git add .

sleep 3

echo "git commit test"

git commit -m "test"

sleep 3

echo "git push"

git push origin main
