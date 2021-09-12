---
layout: post
title: 'Adding wifi connection without GUI for enterprise wifi like at universities/ offices with PEAP'
author: rushi
categories: [linux, pinephone, wifi]
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
