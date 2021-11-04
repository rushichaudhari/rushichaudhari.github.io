---
layout: post
title: 'Compiling fceux on Debian 10 buster'
author: rushi
categories: [emulator, snes, linux]
cover: 'https://em.lbbcdn.com/wp-content/uploads/2014/05/fceux-logo-transparent.png'
featured: false
hidden: false
---

I came across this wonderful video [https://www.youtube.com/watch?v=qv6UVOQ0F44]("https://www.youtube.com/watch?v=qv6UVOQ0F44"). It took me into searching for its code to implement that. And here are a few.

##### https://github.com/Mario-brows/Brows-Super-Mario

##### https://github.com/lopatin96/Lua-SNES-GenNeurNetwork

The main problem in them is they use [BizHawk Emulator](https://github.com/h31nr1ch/BizHawk), which I was not successful in compiling for my debian OS, Its stable only for windows machines. Then I found its alternative [fceux](http://www.fceux.com/web/download.html) Which can handle lua scripts too!.

The following steps are what I used to compile it successfully.

Download the FCEUX src. from their website

```
sudo apt-get install libsdl1.2-dev scons libgtk-3-dev liblua5.1-0-dev libgd-dev
tar xzvf fceux-2.2.3.src.tar.gz
cd fceux-2.2.3
```

Open SConstruct

```
vim SConstruct
```

Make sure gtk3 is used

```
BoolVariable('GTK', 'Enable GTK2 GUI (SDL only)', 0),
BoolVariable('GTK3', 'Enable GTK3 GUI (SDL only)', 1),
```

To compile

```
scons
```

This will take around 5-10mins. Onc done Install it.

```
sudo scons install
```

Adding fceux in application drawer.

```
sudo cp fceux.desktop /usr/share/applications
sudo cp fceux.png /usr/share/pixmaps
```

After reboot you can see fceux in application drawer, or type fceux in terminal to run without rebooting.
I will be uploading my experiences with that mario script soon once I configure :)
