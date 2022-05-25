---
layout: post
title: "Cool Stuff to Do With SSH"
date: 2022-02-05 
author: rushi
# cover: ''
categories: [SSH, Linux]
tags: [SSH, Linux]
---

## Watch Netflix from restricted regions

Use: Some Netflix shows are only available in India, Let us proxy through some Indian server to watch Netflix

```
# In terminal 1 
# 9050 is default port for proxychains socksproxy
# something@someIP should be some Indian server
ssh something@someIP -D 9050
```

```
# In terminal 2
proxychains firefox
# Check the IP using https://www.whatismyipaddress.com It should show the ip of the ssh server(India), Now you can watch Indian Netflix :D
```

## VNC over SSH tunnel
**Best alternative if Anydesk/ Teamviewer fails on linux**

```
# The first thing to do is create the tunnel that routes packets from localhost (at port 9000) to the remote host (at port 5901) through port 22

ssh -L 9000:localhost:5901 USER@REMOTE_IP
```
- Test localhost:9000 in vncviewer
- You can also use REMOTEIP:5901 in vncviewer without ssh tunneling, but ssh makes it more secure :D

## Transfer files over SSH 

```
tar -cvf somedir | ssh USER@REMOTEIP "tar -xf -"
```

## VNC over SSH tunnel over Tor (no public ip)

- Start vncserver on port 5901 on the server
- Binding 9000 of local machine with 5901 in remote, use the command below to bind
```
sudo proxychains ssh -L 9000:localhost:5901 root@ziuvhhwxme30i.onion
```

- Test localhost:9000 in vncviewer



