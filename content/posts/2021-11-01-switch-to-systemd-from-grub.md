---
layout: post
title: "Switch to Systemd From Grub"
date: 2021-11-01
author: rushi
cover: ''
categories: ['arch', 'linux']
tags: ['systemd', 'grub']
# draft: true
---


I have two efi partitions, p1 for windows and p4 for Arch

`sudo fdisk -l`

![dsd](/img/2021-11-01-switch-to-systemd-from-grub/2021-11-01-20-04-58.png)

Add the efi entry in `/etc/fstab`

get the UUID from `sudo blkid`

![](/img/2021-11-01-switch-to-systemd-from-grub/2021-11-01-20-07-12.png)


Mount the /efi

`sudo mount /efi && ls /efi`

The structure would look something like

![](/img/2021-11-01-switch-to-systemd-from-grub/2021-11-01-20-10-09.png)



Install ucode
for my amd machine it is

`sudo pacman -S amd-ucode`

Reinstall linux kernel

`sudo pacman -S linux linux-headers`

`mkinitcpio -P`

Add the following in

 `sudo nano /efi/loader/entries/arch.conf`
(for more details [https://wiki.archlinux.org/title/Systemd-boot#Loader_configuration](https://wiki.archlinux.org/title/Systemd-boot#Loader_configuration))

![](/img/2021-11-01-switch-to-systemd-from-grub/2021-11-01-20-16-30.png)

### Reboot!

