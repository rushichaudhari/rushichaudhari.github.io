---
layout: post
title: "Wayvnc Arch Linux (Pinephone)"
date: 2022-05-19
author: rushi
# cover: ''
categories: ['linux', 'pinephone']
tags: ['pinephone', 'linux', 'wayland']
---

Traditionally we have been using Xorg or X11 as the display server on linux. Wayland is a similar display server which aims to be a modern and more optimized. I'm not much used to wayland and this is a guide for using wayvnc, a vnc server for wayland. Any vnc client like tigervnc/ realvncviewer can be used. 

```
# Install wayvnc
sudo pacman -S wayvnc
```

Create a config with the authentication info and load it using the --config command line option or place it at the default location `$HOME/.config/wayvnc/config`.

```
address=0.0.0.0
enable_auth=true
username=luser
password=p455w0rd
private_key_file=/path/to/key.pem
certificate_file=/path/to/cert.pem
```

or without auth 

```
address=0.0.0.0
enable_auth=false
username=luser
password=p455w0rd
```


`WAYLAND_DISPLAY=wayland-1 wayvnc 0.0.0.0`