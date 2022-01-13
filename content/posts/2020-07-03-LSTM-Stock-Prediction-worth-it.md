---

layout: post
title:  "LSTMS for stock price predictions, worth it ?"
author: rushi
date: 2020-07-03
categories: [python, requests, selenium, google, form]
cover: "/img/2020-07-03-LSTM-Stock-Prediction-worth-it/image-20200703211002786.png"
featured: false
hidden: false

---




<span style="font-size:50px;">T</span>he internet is now flooded with “predicting stock market prices using LSTM”. I went through 9 articles that I found on websites like medium, KDnuggets, etc. And I realized almost 6-7 out of them showed promising results. But none of them showed their real-life use-case; the question is is it beneficial?

LSTMS predict T+1th term by previous k terms of time-series, say k=2, So we need to have T and T-1 to predict T+2
so suppose my X for input is Open, High, Low, Close, Volume, and Y would be the next day’s Close

=> I need to have OHLCV values of the previous two days to predict the next day’s Close

=> If I need to know tomorrow’s Close, I need to wait till the current day ends to get its OHLCV values, i.e. it predicts only one candlestick in the future.

=> One article was like using previous k days Close to predict next days Close. 

So for T+1, I would give it T’s and (T-1)’s Close as inputs and for T+2; T’s, and (predicted_T+1)’s Close as input. 

Again, this is not useful because if there is an error in T+1, it gets propagated in the following sequence 

Also, logically, we cannot predict movements based on only closing prices. OHLCV may work because it might detect a few candlestick patterns like Doji, Harami, etc., and consider volume.

LSTM’s in those articles showed good predictions because they predict only a single value instead of a range of values. So are they worth a single candlestick? Because even indicators like moving averages give a proper estimate for a single candlestick.

I think there should be a different approach to using LSTMS; I didn’t find any article. Please comment down below if you see something.
I am not an expert in these fields — I am just putting forward the conclusions I got to after my explorations with this topic, so feel free to point out anything I missed. Thank you for your time.