---

layout: post
title:  "Setting up tigervncserver on arch linux (raspberry-pi)"
author: rushi
keywords: [vnc, tigervnc, arch]
image: "../img/fi_tigervnconarch.png"
featured: false
hidden: false

---

## Installing tigervnc 
```
sudo pacman -Ss tigervnc
```

## Editing the environment file
~/.vnc/xstartup functions like .xinitrc  and it's sourced by vncserver when being started. At a minimum, users should start a DE from this file. As an example, to start lxde, you'll modify the file to:

```
$nano ~/.vnc/xstartup

#!/bin/bash
exec lxde &>/dev/null
```
## The file should be executable:
```
$ chmod +x ~/.vnc/xstartup
```

## Adding vncserver options
```
$ nano ~/.vnc/config

desktop=sandbox
geometry=1920x1080
dpi=96
SecurityTypes=none
```

## Starting and stopping vncserver via systemd
To control vncserver with systemd, first, create systemd unit file for the user

```
$ cat /etc/systemd/system/vncserver@:1.service

[Unit]
Description=Remote desktop service (VNC)
After=syslog.target network.target

[Service]
Type=simple
User=pi
PAMName=login
PIDFile=/home/%u/.vnc/%H%i.pid
ExecStartPre=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'
ExecStart=/usr/bin/vncserver %i -geometry 1440x900 -alwaysshared -fg
ExecStop=/usr/bin/vncserver -kill %i

[Install]
WantedBy=multi-user.target
```

where :1 is the $DISPLAY environment variable. Replace **pi** with the desired username and **1440x900** with the resolution you want to set.

To start the service, run
```
$ sudo systemctl start vncserver@:1.service
```

## On tigervnc client
![sadsad](../img/tigervncclient.png)