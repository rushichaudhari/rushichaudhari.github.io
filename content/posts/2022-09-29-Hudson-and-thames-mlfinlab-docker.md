---
layout: post
title: "Hudson and Thames mlfinlab stuff"
date: 2022-09-29
author: rushi
# cover: ''
categories: ["python", "docker"]
tags: ["python", "docker", "mlfinlab"]
---

# Dockerfile

```
FROM python:3.8-slim-buster

RUN apt update && apt install git -y
RUN apt install -y build-essential g++ libgl1-mesa-glx libx11-6 cmake protobuf-compiler -y
RUN python -m pip install jupyter cvxpy
RUN git clone https://github.com/rushic24/mlfinlab.git && cd mlfinlab && python setup.py install
RUN pip install pandas==1.5.2 tqdm statsmodels==0.13.5 numpy==1.23.5

EXPOSE 8890
ENTRYPOINT [ "jupyter", "notebook", "--no-browser", "--port=8890", "--ip=0.0.0.0", "--allow-root" ]
```

# Makefile
```
# Specify the name of the image
IMAGE_NAME = "mlfinlabstuf"

# Specify the path to the Dockerfile
DOCKERFILE_PATH = "."

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) $(DOCKERFILE_PATH)

# Run the Docker image
run:
	docker run --rm -it  -v ${PWD}:/work -p 8890:8890 $(IMAGE_NAME)
```


# To run
```
make build
make run
```