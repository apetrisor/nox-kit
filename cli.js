#!/usr/bin/env bash

if [ "$1" = "dev" ]; then
	echo "Starting dev environment..."
	env $(cat .env | xargs) ./node_modules/.bin/postcss ./src/assets/global.pcss -o ./static/css/global.css --config ./node_modules/@apetrisor/nox-kit
	env $(cat .env | xargs) ./node_modules/.bin/sapper dev
elif [ "$1" = "build" ]; then
	echo "Starting build..."
	env $(cat .env | xargs) NODE_ENV=production ./node_modules/.bin/postcss src/assets/global.pcss -o static/css/global.css --config ./node_modules/@apetrisor/nox-kit
	env $(cat .env | xargs) NODE_ENV=production ./node_modules/.bin/sapper build --legacy
elif [ "$1" = "start" ]; then
	env $(cat .env | xargs) node __sapper__/build
fi