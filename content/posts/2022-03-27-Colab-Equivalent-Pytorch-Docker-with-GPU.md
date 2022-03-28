---
layout: post
title: "2022 03 27 Colab Equivalent Pytorch Docker With GPU"
date: 2022-03-27
author: rushi
# cover: ''
categories: [docker, arch]
tags: [docker, arch]
---


## Dockerfile

```
FROM pytorch/pytorch:1.10.0-cuda11.3-cudnn8-devel
WORKDIR /root
RUN pip install jupyter jupyterlab
EXPOSE 8888
COPY . .
CMD jupyter notebook --port=8888 --no-browser --ip=0.0.0.0 --allow-root
```


## docker-compose.yml

```
version: "3"
services:
  main:
    build: .
    volumes:
      - .:/root
    ports:
      - 8888:8888
    network_mode: "host"
    privileged: true
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```


## Run

`docker-compose build`
`docker-compose run --rm main`



Reason?

Colab equivalent
Pytorch version 1.10.0
torchtext works
torchdata works