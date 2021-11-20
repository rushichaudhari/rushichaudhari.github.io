---
layout: post
title: 'Stop Colab From Disconnecting'
date: 2021-11-20
author: rushi
cover: ''
# categories: []
tags: [colab, google, colaboratory, python, disconnect]
draft: true
---

## Are you irritated by google colab automatically disconnecting after every 30mins ?

Open your Chrome DevTools and enter the following JavaScript snippet in your console:

```
function KeepClicking(){
console.log("Clicking");
document.querySelector("colab-connect-button").click()
}
setInterval(KeepClicking,60000)
```

This clicks the connect button every 60 seconds, there is no need to worry about colab being disconnected!

### This is different from the GPU time, colab can still disconnect you for long running background tasks on GPU.
