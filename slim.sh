#!/bin/bash

# Step 1: Build the normal image
docker compose build

# Step 2: Slim it
slim build --http-probe=false ikamustat-ustat:latest # must match your Docker image name

docker image rm ikamustat-ustat:latest

docker tag ikamustat-ustat.slim:latest ikamustat-ustat:latest
