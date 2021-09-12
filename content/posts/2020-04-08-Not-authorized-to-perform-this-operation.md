---
layout: post
title: 'Not authorized to perform this operation'
author: rushi
categories: [i3wm, thunar, pcmanfm, debian]
cover: '/img/2020-04-08-Not-authorized-to-perform-this-operation/Thunar_window_failed_to_mount.png'
featured: false
hidden: false
---

Sometimes, when using i3wm I get this error when mounting a partition. But it works for other des like gnome/cinnamon.

Make sure polkit is installed.

Loosen the polkit permissions in your system to allow your normal user to mount devices by creating a file at /etc/polkit-1/localauthority/50-local.d/org.freedesktop.automount.plka (as root!) with the following content:

```
[Allow Unauthorized mounting/Unmounting]
Identity=unix-group:plugdev;cdrom
Action=org.freedesktop.udisks2.filesystem-*;org.freedesktop.udisks2.eject*
ResultAny=yes
ResultInactive=yes
ResultActive=yes
```

You can loosen the polkit permissions in your system to allow your normal user to mount devices by creating a file at /etc/polkit-1/localauthority/50-local.d/org.freedesktop.automount.plka (as root!) with the following content:

```
groups
```

If "plugdev" is not listed, then use:

```
# gpasswd -a USER plugdev
newgrp plugdev
```

[http://forums.debian.net/viewtopic.php?f=10&t=126872&start=30#](http://forums.debian.net/viewtopic.php?f=10&t=126872&start=30#)
