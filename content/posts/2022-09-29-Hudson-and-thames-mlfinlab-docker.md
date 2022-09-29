---
layout: post
title: "Hudson and Thames mlfinlab stuff"
date: 2022-09-29
author: rushi
# cover: ''
categories: ["python", "docker"]
tags: ["python", "docker"]
---

# Dockerfile

```
FROM python:3.8.14-slim-buster
RUN apt update && apt install git -y
RUN git clone https://github.com/hudson-and-thames/mlfinlab.git && cd mlfinlab && python setup.py install
RUN pip install jupyter


COPY Untitled.ipynb /root/Untitled.ipynb
COPY start.sh /root/start.sh
WORKDIR /root

EXPOSE 8888

RUN chmod a+x /root/start.sh

ENTRYPOINT ["/root/start.sh"]

```

# start.sh
```
#!/bin/bash
python -m jupyter notebook --allow-root
```


# To run
```
docker run --rm -it --net=host $(docker build -q .)
```