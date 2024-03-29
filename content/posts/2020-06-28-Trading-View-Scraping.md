---
draft: false
hidden: false
layout: post
lastmod: 2020-12-22T01:21:27.912Z
author: rushi
featured: true
title: Webscraping 1 minute stock data from tradingview
date: 2020-12-22T01:21:27.846Z
cover: https://lh3.googleusercontent.com/9aZ_ejWDwrPpD3Dof5fAZu6ziVcpjyLpPW3CaxY10bhqHHjH722-QjhJ1cWHgLfNjt5J
categories:
  - python
  - requests
  - selenium
  - google
  - form
---
# How I webscraped 1 minute stock data from tradingview

After a long die-hard trying I managed to get 1 minute stock data for free. My previous tries were using selenium and beautifulsoup modules in python. But the data is highly obfuscated  so I was not able to find the exact HTML element to scrape. If you manage to do this using selenium please comment below.

Probably the data is being loaded up as SVG which is why it isn't being seen in html inspect element. 

![image-20200702112353396](/img/2020-06-28-Trading-View-Scraping/image-20200702112353396.png)

But...

After a look into Network section I found something interesting.

![image-20200702112605039](/img/2020-06-28-Trading-View-Scraping/image-20200702112605039.png)

**websockets !!!**

After observing the Headers 

![image-20200702112714421](/img/2020-06-28-Trading-View-Scraping/image-20200702112714421.png)

And Messages

![image-20200702112933310](/img/2020-06-28-Trading-View-Scraping/image-20200702112933310.png)

I tried to send the same messages using websockets in python and it worked **:)** .  

Code at <https://github.com/rushic24/tradingview-scraper>.

## Limitations

We can only get previous 5000 ticks of data.