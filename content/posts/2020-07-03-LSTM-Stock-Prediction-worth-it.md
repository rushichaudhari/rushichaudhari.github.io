---

layout: post
title:  "LSTMS for stock price predictions, worth it ?"
author: rushi
categories: [python, requests, selenium, google, form]
cover: "/img/2020-07-03-LSTM-Stock-Prediction-worth-it/image-20200703211002786.png"
featured: false
hidden: false

---




<span style="font-size:50px;">T</span>he internet is now flooded with "predicting stock market prices using LSTM". I went through 9 articles which I found on websites like medium, KDnuggets, etc.
And I realized almost 6-7 out of them showed good results. But none of them showed their real-life use-case, The question is really helpful?

LSTMS predict T+1th term by previous k terms of time-series 
say k=2
So we need to have T and T-1 to predict T+2

so suppose my X for input is Open, High, Low, Close, Volume
and Y would be next day's Close

I need to have OHLCV values of the previous 2 days to predict the next day's Close.
This means If I need to know tomorrow's close, I need to wait till the current day ends to get its OHLCV values i.e. it predicts only 1 candlestick in the future.

One article was like using previous k days Close to predict next days Close. 
so for T+1, I would give it T's and (T-1)'s Close as inputs and 
for T+2; T's, and (predicted_T+1)'s close as input. 
This is again not useful because if there is an error in T+1; it gets propagated in the next sequence, and also logically we cannot predict movements based on only closing prices. OHLCV may work because it might detect few candlestick patterns like Doji, Harami, etc, and also consider volume.

LSTM's in those articles showed good predictions, because they predict only single value instead of a range of values. So are they worth for a single candlestick? Because even indicators like moving averages give a proper estimate for single candlestick.

I think there should be a different approach to use LSTMS, for which unfortunately I didn't find any article. Please comment down below if you find something.

I am not an expert in these fields — I am just putting forward the conclusions I got to after my explorations with this topic, 
so feel free to point out anything I missed. Thank you for your time.