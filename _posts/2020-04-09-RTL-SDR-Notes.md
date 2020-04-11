---
layout: post
title:  "RTL SDR notes"
author: rushi
categories: [rtl-sdr, hackrf]
image: "https://hackaday.com/wp-content/uploads/2017/09/dongle.png?w=800"
featured: false
hidden: false

---

## We Need
1. RTL SDR Dongle
2. RTL SDR Software
3. Computer
```
SDR works by receiving a analogue radio signal and then using an analog to digital converter to  digitalise the signal. The digitalised signal can then be worked in digital processing software.

We need
GQRX  -> osx/ linux

```
git clone https://github.com/csete/gqrx.git
cd gqrx
mkdir build
cd build
qmake ..
make
make install 
```

```
sudo apt-get update
sudo apt install git cmake libusb-1.0-0.dev build-essential
```

### Rtl2832u- osmocom driver
```
git clone https://github.com/osmocom/rtl-sdr
cd rtl-sdr
mkdir build cd build cmake ..
make
make install
```

## Examples of rtl_fm used
RTL_FM needs to be piped into an auto player that can play raw_audio such as sox or aplay
```
sudo apt install sox
rtl_fm -M wbfm -f 91.10M | play -r 32000 -t raw -e s -b 16 -c 1 -V1
```

## Calibrating RTL-SDR

rtl-sdr is mass chinese manufactured device with poor crystal tolerance.
crystal oscillator in rtl-sdr is its clock source (heartbeat of the circuit)

rtl-sdr uses 28.8 Mhz oscillator which may be out by a few khz. So few frequencies may not be where you expect them to be.

To calibrate it we can tune it to a known frequency and adjust the PPM Offset until signal is centered after dongle is running for a while. 

Kalibrate [https://github.com/steve-m/kalibrate-rtl](https://github.com/steve-m/kalibrate-rtl)
[https://github.com/steve-m/kalibrate-rtl/wiki/How-to-install](https://github.com/steve-m/kalibrate-rtl/wiki/How-to-install)
kalibrate is a linux tool to auto calibrate. It requires that there are local GSM Signals receivable by the antenna to do the calibration.

GSM signals are used because they transmit frequency correction data which calibrate can use to determine the clock offset.
Let us scan for gsm 900 bands with 50db gain
```
kal -s GSM900 -g 50 #using this you will get the offset range
```

| GENERAL FREQUENCIES | Mhz  |
| ------------- |:-------------:|
|Amateur Radio  | 0.535-1605    |
| Shortwave Radio      | 3-30      |
| walkie talkie | 40-49      |
| CV Radio | 26.965-27.405 |
| Analog TV | 55-88 |
| Radio Controlled Toys | 72-76 |
| Brodcast FM | 88-108 |
| Air Traffic Control | 108-136 |
| ATIS | 110-129 |
| Acars | 131.550 |
| VDL2 | 136.975 |
| NOA | 136-138 MHZ |
| VHF Amateur Radio (Band for HAM Radio)| 144-148 |
| Noa Weaather(Voice weather report) | 162.4 |
| Rail | 159-162 |
| Maritime | 156-162 |
|AIS (Track ships like radar)| 161.9175 & 162.025 |
|Pagers | 157|
|Analogue TV | 174-216|
|DAB|174-239|
|Trunking radio (commercial walkie talkie)| ~400|
|ISM Band| ~433|
|GSM| 850, 900, 1800, 1900|
|ADS-B used to track aircraft like radar | 1090|
|GPS| 1575|


## ACARS
In aviation, ACARS is a digital communication system for transmission of short messages between aircraft and ground stations. Messages you may hear on ACARS are oooi events. (out of the gate, off the ground, on the ground, and into the gate)

| Popular ACARS frequencies| Mhz           |
| ------------- |:-------------:|
|131.550  |  Primary Channel worldwide |
|129.125  |  Additional channel for USA & Canada|
|130.025  |  Secondary channel for USA and Canada|
|130.425  |  Additional channel for USA|
|130.450  |  Additional channel for USA & Canada|
|131.125  |  Additional channel for USA|
|131.450  |  Primary channel for Japan|
|131.475  |  Air Canada company channel|
|131.525  |  European secondary|
|131.725  |  Primary channel in Europe|
|136.700  |  Additional channel for USA|
|136.750  |  Additional channel for USA|
|136.800  |  Additional channel for USA|
|136.900  |  European secondary|
|136.850  |  SITA North American Frequency|
|136.750  |  New European frequency|
|131.850  |  New European frequency|