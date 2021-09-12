---
layout: post
title: 'To what extent can I get Indian Veg Food in Boston'
author: rushi
categories: [linux, pinephone]
tags:
    - linux
    - pinephone
    - arch
---

```
# nmcli con add type wifi ifname wlan0 con-name CONNECTION_NAME ssid SSID
# nmcli con edit id CONNECTION_NAME
nmcli> set ipv4.method auto
nmcli> set 802-1x.eap peap
nmcli> set 802-1x.phase2-auth mschapv2
nmcli> set 802-1x.identity USERNAME
nmcli> set 802-1x.password PASSWORD
nmcli> set wifi-sec.key-mgmt wpa-eap
nmcli> save
nmcli> activate
```
