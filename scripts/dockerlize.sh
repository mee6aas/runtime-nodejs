#!/usr/bin/env bash

workspace=$(dirname $0)/..
imageRef=mee6aas/runtime-nodejs:latest

cd $workspace

npm run build
docker build -t $imageRef .
