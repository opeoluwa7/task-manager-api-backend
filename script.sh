#!/bin/zsh


echo "deleting dist"

rm -rf dist

sleep 1

echo "Creating build"
npm run build

sleep 1

echo "git add"

git add .

sleep 1

echo "git commit test"

git commit -m "test"

sleep 1

echo "git push"

git push origin main
