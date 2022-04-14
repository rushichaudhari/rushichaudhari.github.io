---
layout: post
title: "My Pinephone Setup"
date: 2022-04-14
author: rushi
# cover: ''
categories: [docker, linux, pinephone]
tags: [docker, linux, pinephone, android]
---

![pinephone](/img/2022-04-13-My-Pinephone-Setup/pinephone.jpg)


The Pinephone<sup>[[1]](#links)</sup> is my first Linux smartphone. I've been waiting for this since 2018. I feel the more android is advancing the more it is getting IOS'ish. Android was not meant to be this way. The reason it became popular early was it being opensource, and developer friendly. That era allowed bootloader unlocking, developing custom and newer kernels, tweaking the UI. Newer android has become too much bloatish and restrictive.
For instance if we see miracast, android dropped miracast support for non samsung devices after android 8.0! i.e. even though the hardware had feature, for poor business reasons it was removed.
If we see older version of android, the devices used to run on on phones with 1-2GB of RAM, Now even 6GB feels incompetent. Another reason is many companies have been reported for planned obsolescence, where they try to forcefully kill their devices by forcing update which slows down the phones, restricting spare parts etc.
Google removing the apk support and instead enforcing android apps bundle<sup>[[2]](#links)</sup> is another example of android getting restrictive. The biggest reason why many people prefer Android over iOS is the ability to install anything on the device outside of the app store.

# Why Linux Phones excel:

1. Linux runs rock solid on low end devices. Did you know Apollo 11 mission landed on moon with 4KB of ram!<sup>[[3]](#links)</sup>
2. Complete control of your phone, can kill any service which you dont need
3. No chance of forceful updates to slow down your device
4. Open source! even the hardware!, Every spare part is available/ can be 3d printed
5. Can always be on latest kernel for security updates  

I've been daily driving the Pinephone Keyboard Case, with Arch Linux ARM (Danctnix)<sup>[[4]](#links)</sup> with the SXMO interface <sup>[[5]](#links)</sup>  for a few weeks, and I can say with confidence that it is a perfect setup. The keyboard enables using the phone without a convergence dock and its extra battery certainly helps.
Before we get to my list of software, let me explain why I prefer terminal-based applications to those having a GUI. It may appear to be a weird choice for a mobile device, but there are a few characteristics that make them my top choice. To begin with, they are far more dependable and have far fewer crashes than GUI apps.
Second, both the virtual keyboard and the keyboard case are lightning fast and simple to use.
Finally, unlike many traditional programs, TUI apps are significantly more cross-platform and only need a terminal to run.

<iframe 
  width="640" 
  height="480" 
  src="https://www.youtube.com/embed/fUt5tDfD93U" 
  title="Running 3D printer on pinephone" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

**cOTP**<sup>[[6]](#links)</sup> : A simple one-time-password generator written in rust and made for the terminal. Supports both HOTP and TOTP, and password protection is definitely a bonus. The database is encrypted with GPG and the TUI is easy to use. If you aren't already using multi-factor-authentication, get on that! Beware, it is written in Rust, so compiling on the Pinephone takes a while.

**keep**<sup>[[7]](#links)</sup>: A simple utility to save and run your frequently used commands. Supports sync to github gist.

**Ansiweather**<sup>[[8]](#links)</sup> : A weather-retriving script that fits in well with sxmo's whole "everything is scriptable" functionality. Displays weather in the terminal, no fancy UI needed. Ansiweather strikes the perfect balance beween being feature-packed and highly configurable, yet being so easy to use.

**Vis**<sup>[[9]](#links)</sup>: The standard text editor on SXMO, Vis is a fork of Vim that not only has an updated look and feel, but also a new-and-improved command language (borrowed from Sam).[14]

**When**<sup>[[10]](#links)</sup>: Simple CLI calendar, no fancy TUI needed. Works by editing a file listing your upcoming events, allowing you to use the text editor of your choice. Just type "when" into your terminal for a summary of your events the next two weeks. Works well for a basic schedule, but might be tough to manage for really, really busy people.

**ePDFview**<sup>[[11]](#links)</sup>: A X11/Wayland compatible tool for viewing PDFs

**imv**<sup>[[12]](#links)</sup>: This simple image viewer seems tailor-made for terminal use. Along the lines of mpv, nice features like slideshow presentations are supported.

**Newsboat**<sup>[[13]](#links)</sup>: Not only does Newsboat's TUI make keeping up on RSS feeds easy, but the built in podcast player works well on the Pinephone. Great for keeping up on Megi's Pinephone development log!

**Qutebrowser**<sup>[[14]](#links)</sup>: For someone accustomed to Vim's keybindings, this web browser is easy to use. A powerful command language and extensive configuration options give it a slight learning curve, but that only leads to greater productivity. Based on webkit, my only gripe is that the start-up time of Qute isn't as fast as my previous browser, Surf. I find line-based browsers difficult to manage for web content made for a GUI, like interactive content and pictures. Qute is the next most minimal thing.

**Libreoffice**<sup>[[15]](#links)</sup>: The powerful desktop office software comes to mobile Linux! Libreoffice is usable in landscape mode on the Pinephone, and while I prefer a text editor for basic functions like note taking, Libreoffice is perfect for schoolwork. By changing the UI settings to those made for "smaller screens", it makes using Libreoffice on the pinephone productive. Using the full desktop software rather than a watered-down web interface (looking at you, Google Docs) is priceless.

**Nextcloud Desktop**<sup>[[16]](#links)</sup>: If you use Nextcloud services, having the desktop app on your Pinephone is a must-have. With the convenient icon next to the clock in Sway, it's easy to check notifications and share files with just a tap. I automatically back up folders in my home directory, and set XDG-user-dirs to correspond to those folders. This automatically backs up my downloads, documents, music, and whatever else I want.

**SXMO userscripts**<sup>[[17]](#links)</sup>: A collection of custom userscripts for suckless X

**Mount Local Server at boot**: I use this script to mount a local 2TB storage connected to a raspberry pi to be accessible by pinephone and my laptop


```{bash}
# supports mounting of local hdd connected to pi, paste at /etc/fstab
# Static information about the filesystems.
# See fstab(5) for details.

# <file system> <dir> <type> <options> <dump> <pass>
UUID=25160289-ba3e-4ff2-9f4e-28300e30ad1d	/         	ext4      	rw,relatime	0 1
UUID=1B4E-0116      	/boot     	vfat      	rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro	0 2
pi@10.0.0.19:/mnt/hdd  /mnt/pi  fuse.sshfs x-systemd.automount,_netdev,user,idmap=user,transform_symlinks,identityfile=/home/alarm/.ssh/id_rsa,allow_other,default_permissions,uid=1000,gid=1000 0 0
```

# Wrapping up

My Pinephone setup is curated specifically for me, that's my favorite thing about Linux in general. Anyone can use whatever software stack they want, with open hardware and firmware making it all possible. You don't have to use these programs, but I encourage you to try them out. That's the beauty of FOSS, you have variety and free choice.


## Links

[1] [pine64.org/pinephone](pine64.org/pinephone)

[2] [indiatoday.in/technology/news/story/
google-is-killing-android-apk-in-play-store-developers-will-have-to-put-apps-in-app-bundles-1821687-2021-07-01](https://www.indiatoday.in/technology/news/story/google-is-killing-android-apk-in-play-store-developers-will-have-to-put-apps-in-app-bundles-1821687-2021-07-01)

[3] [sciencefocus.com/space/what-tech-would-the-apollo-11-mission-have-today/](sciencefocus.com/space/what-tech-would-the-apollo-11-mission-have-today/)

[4] [github.com/dreemurrs-embedded/Pine64-Arch](github.com/dreemurrs-embedded/Pine64-Arch)

[5] [sxmo.org](sxmo.org)

[6] [github.com/replydev/cotp](sxmo.org)

[7] [github.com/orkohunter/keep](github.com/orkohunter/keep)

[8] [github.com/fcambus/ansiweather](github.com/fcambus/ansiweather)

[9] [github.com/martanne/vis](github.com/martanne/vis)

[10] [lightandmatter.com/when/when.html](lightandmatter.com/when/when.html)

[11] [gihtub.com/JotaRandom/epdfview](gihtub.com/JotaRandom/epdfview)

[12] [sr.ht/~exec64/imv](sr.ht/~exec64/imv)

[13] [newsboat.org](newsboat.org)

[14] [qutebrowser.org](qutebrowser.org)

[15] [libreoffice.org](libreoffice.org)

[16] [nextcloud.com](nextcloud.com)

[17] [git.sr.ht/~anjan/sxmo-userscripts/](git.sr.ht/~anjan/sxmo-userscripts/)
 