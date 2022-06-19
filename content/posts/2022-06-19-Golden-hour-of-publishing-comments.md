---
layout: post
title: "Golden Hour of Publishing Comments"
date: 2022-06-19
author: rushi
cover: '/img/2022-06-19-Golden-hour-of-publishing-comments/cover.png'
# categories: []
# tags: []
---

**Hacker News is a site similar to Reddit where user-submitted stories (known as "posts") are voted on and commented on.
In the tech and startup worlds, Hacker News is immensely popular, and pieces that reach the top of the site's listings can get hundreds of thousands of views.**

## We'll compare these two types of posts to determine the following:
### 1. Do 'Ask HN' or 'Show HN' posts receive more comments on average?
### 2. Which one receives more comments?


```python
import pandas as pd

# read input file
data = pd.read_csv('HN_posts_year_to_Sep_26_2016.csv')

# keep titles receiving comments, and randomly sample 20000 rows
sample = data[data['num_comments']>0].sample(20000)
sample
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>title</th>
      <th>url</th>
      <th>num_points</th>
      <th>num_comments</th>
      <th>author</th>
      <th>created_at</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>76795</th>
      <td>11902973</td>
      <td>Why Team Happiness Can Be the Wrong Thing to A...</td>
      <td>https://vimeo.com/143894732</td>
      <td>91</td>
      <td>44</td>
      <td>michaelfeathers</td>
      <td>6/14/2016 16:10</td>
    </tr>
    <tr>
      <th>9300</th>
      <td>12494791</td>
      <td>There's only one business worth starting</td>
      <td>https://medium.com/hi-my-name-is-jon/theres-on...</td>
      <td>3</td>
      <td>1</td>
      <td>hccampos</td>
      <td>9/14/2016 7:25</td>
    </tr>
    <tr>
      <th>79128</th>
      <td>11878535</td>
      <td>Video streaming for all</td>
      <td>http://getlawd.com/</td>
      <td>3</td>
      <td>7</td>
      <td>stoufa88</td>
      <td>6/10/2016 18:10</td>
    </tr>
    <tr>
      <th>275008</th>
      <td>10307145</td>
      <td>Google and Microsoft make patent peace</td>
      <td>http://www.zdnet.com/article/google-and-micros...</td>
      <td>89</td>
      <td>56</td>
      <td>tanglesome</td>
      <td>9/30/2015 21:02</td>
    </tr>
    <tr>
      <th>132643</th>
      <td>11423114</td>
      <td>What is your story of finding your cofounder, ...</td>
      <td>NaN</td>
      <td>2</td>
      <td>5</td>
      <td>PeterTMayer</td>
      <td>4/4/2016 16:24</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>174186</th>
      <td>11082832</td>
      <td>The Godfather of Digital Maps</td>
      <td>http://www.forbes.com/sites/miguelhelft/2016/0...</td>
      <td>30</td>
      <td>8</td>
      <td>dll</td>
      <td>2/11/2016 20:13</td>
    </tr>
    <tr>
      <th>117737</th>
      <td>11546882</td>
      <td>MongoDB Twitter Spam Campaign</td>
      <td>http://imgur.com/a/iY5C7</td>
      <td>1</td>
      <td>1</td>
      <td>snurk</td>
      <td>4/22/2016 3:29</td>
    </tr>
    <tr>
      <th>245098</th>
      <td>10523794</td>
      <td>The unmanned aerial drones of WW2</td>
      <td>https://en.wikipedia.org/wiki/Operation_Outward</td>
      <td>1</td>
      <td>2</td>
      <td>fivedogit</td>
      <td>11/7/2015 4:58</td>
    </tr>
    <tr>
      <th>230676</th>
      <td>10633042</td>
      <td>How Cereal Is Made</td>
      <td>http://luckypeach.com/how-cereal-is-made/</td>
      <td>23</td>
      <td>13</td>
      <td>zdw</td>
      <td>11/26/2015 14:14</td>
    </tr>
    <tr>
      <th>60515</th>
      <td>12045437</td>
      <td>Italian banking is the next shoe to drop</td>
      <td>http://marginalrevolution.com/marginalrevoluti...</td>
      <td>40</td>
      <td>6</td>
      <td>jseliger</td>
      <td>7/6/2016 19:56</td>
    </tr>
  </tbody>
</table>
<p>20000 rows × 7 columns</p>
</div>




```python
# keep only rows that contain 'ask hn'
sampleAsk = sample[['ask hn' in i.lower() for i in sample['title']]]
sampleAsk
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>title</th>
      <th>url</th>
      <th>num_points</th>
      <th>num_comments</th>
      <th>author</th>
      <th>created_at</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>188898</th>
      <td>10969705</td>
      <td>Ask HN: Are GMail's new features making spam e...</td>
      <td>NaN</td>
      <td>3</td>
      <td>2</td>
      <td>aleem</td>
      <td>1/25/2016 20:27</td>
    </tr>
    <tr>
      <th>66651</th>
      <td>11992582</td>
      <td>Ask HN: Why is academic language so redundant?</td>
      <td>NaN</td>
      <td>2</td>
      <td>4</td>
      <td>50CNT</td>
      <td>6/28/2016 10:14</td>
    </tr>
    <tr>
      <th>184006</th>
      <td>11006270</td>
      <td>Ask HN: What are some examples of great B2B la...</td>
      <td>NaN</td>
      <td>5</td>
      <td>3</td>
      <td>bossx</td>
      <td>1/31/2016 13:08</td>
    </tr>
    <tr>
      <th>242932</th>
      <td>10539626</td>
      <td>Ask HN: Accused of email hacking</td>
      <td>NaN</td>
      <td>1</td>
      <td>1</td>
      <td>dfraser992</td>
      <td>11/10/2015 14:56</td>
    </tr>
    <tr>
      <th>287609</th>
      <td>10215239</td>
      <td>Ask HN: Is it common knowledge that Yahoo bene...</td>
      <td>NaN</td>
      <td>1</td>
      <td>1</td>
      <td>superplussed</td>
      <td>9/14/2015 14:34</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>40330</th>
      <td>12219043</td>
      <td>Ask HN: Do you still play with VR actively?</td>
      <td>NaN</td>
      <td>105</td>
      <td>108</td>
      <td>billconan</td>
      <td>8/3/2016 16:14</td>
    </tr>
    <tr>
      <th>271208</th>
      <td>10335717</td>
      <td>Ask HN: Hackintosh vs Mac Mini</td>
      <td>NaN</td>
      <td>2</td>
      <td>6</td>
      <td>siquick</td>
      <td>10/5/2015 23:24</td>
    </tr>
    <tr>
      <th>228610</th>
      <td>10650345</td>
      <td>Ask HN: Learning path for React and Flux</td>
      <td>NaN</td>
      <td>3</td>
      <td>1</td>
      <td>rufus42</td>
      <td>11/30/2015 16:56</td>
    </tr>
    <tr>
      <th>120244</th>
      <td>11526536</td>
      <td>Ask HN: Is this a Python bug?</td>
      <td>NaN</td>
      <td>3</td>
      <td>4</td>
      <td>wslh</td>
      <td>4/19/2016 12:47</td>
    </tr>
    <tr>
      <th>149820</th>
      <td>11276960</td>
      <td>Ask HN: Am I getting old?</td>
      <td>NaN</td>
      <td>11</td>
      <td>5</td>
      <td>greenspot</td>
      <td>3/13/2016 9:24</td>
    </tr>
  </tbody>
</table>
<p>1693 rows × 7 columns</p>
</div>




```python
# keep only rows that contain 'show hn'
sampleShow = sample[['show hn' in i.lower() for i in sample['title']]]
sampleShow
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>title</th>
      <th>url</th>
      <th>num_points</th>
      <th>num_comments</th>
      <th>author</th>
      <th>created_at</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>288163</th>
      <td>10211892</td>
      <td>Show HN: Best places to work remotely by actua...</td>
      <td>https://workfrom.co</td>
      <td>17</td>
      <td>9</td>
      <td>darrenbuckner</td>
      <td>9/13/2015 16:33</td>
    </tr>
    <tr>
      <th>170868</th>
      <td>11109744</td>
      <td>Show HN: The fastest way to discover fashion o...</td>
      <td>http://frowse.fashion/home/3</td>
      <td>1</td>
      <td>2</td>
      <td>xShirase</td>
      <td>2/16/2016 13:50</td>
    </tr>
    <tr>
      <th>139946</th>
      <td>11360582</td>
      <td>SHOW HN: Left-Pad could be the next FizzBuzz s...</td>
      <td>https://www.educative.io/collection/page/10370...</td>
      <td>4</td>
      <td>1</td>
      <td>fahimulhaq</td>
      <td>3/25/2016 15:27</td>
    </tr>
    <tr>
      <th>261028</th>
      <td>10411041</td>
      <td>Show HN: Microphone  Self-Announcing .NET Serv...</td>
      <td>https://github.com/rogeralsing/Microphone</td>
      <td>54</td>
      <td>6</td>
      <td>RogerAlsing</td>
      <td>10/19/2015 4:02</td>
    </tr>
    <tr>
      <th>247565</th>
      <td>10506163</td>
      <td>Show HN: Vivilio  Discover books peers and inf...</td>
      <td>https://www.vivilio.com</td>
      <td>9</td>
      <td>4</td>
      <td>soumitrasg</td>
      <td>11/4/2015 13:05</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>143733</th>
      <td>11327679</td>
      <td>Show HN: Micro  a microservice toolkit</td>
      <td>https://blog.micro.mu/2016/03/20/micro.html</td>
      <td>101</td>
      <td>32</td>
      <td>chuhnk</td>
      <td>3/21/2016 12:52</td>
    </tr>
    <tr>
      <th>179074</th>
      <td>11043959</td>
      <td>Show HN: Swift and VR  Google Cardboard Ported...</td>
      <td>https://github.com/nzff/cardboard-swift</td>
      <td>64</td>
      <td>19</td>
      <td>nzff</td>
      <td>2/5/2016 19:31</td>
    </tr>
    <tr>
      <th>42857</th>
      <td>12197474</td>
      <td>Show HN: Trading platform for Pokemon Go</td>
      <td>https://medium.com/@deadlocked_d/pok%C3%A9mon-...</td>
      <td>1</td>
      <td>1</td>
      <td>liongate2</td>
      <td>7/31/2016 16:02</td>
    </tr>
    <tr>
      <th>126956</th>
      <td>11471060</td>
      <td>Show HN: Musicsaur  Multi-room audio synchroni...</td>
      <td>http://www.musicsaur.com/</td>
      <td>3</td>
      <td>2</td>
      <td>qrv3w</td>
      <td>4/11/2016 12:36</td>
    </tr>
    <tr>
      <th>77493</th>
      <td>11896000</td>
      <td>Show HN: Golf Tradr  fantasy golf with a stock...</td>
      <td>https://golftradr.com</td>
      <td>3</td>
      <td>1</td>
      <td>rob_zim</td>
      <td>6/13/2016 18:21</td>
    </tr>
  </tbody>
</table>
<p>1285 rows × 7 columns</p>
</div>



### 1. Question: Does 'Show HN' or 'Ask HN' posts receive more comments? 


```python
averageComAsk = sum(sampleAsk['num_comments'])/1692
averageComAsk
```




    12.789598108747045




```python
averageComShow = sum(sampleShow['num_comments'])/1284
averageComShow
```




    8.483644859813085



### 1. Answer: On average 'Ask HN' posts receive 12.78 comments, while 'Show HN' posts receive 8.48 comments. We then conclude that 'Ask HN' posts are more popular than 'Show HN' posts.

------

### 2. Question: Focus on 'Ask HN' (since it receives more comments), what are the amount of ask posts created per hour, along with the total amount of comments?


```python
import datetime as dt
hour = pd.DataFrame([dt.datetime.strftime(i, '%H') for i in [dt.datetime.strptime(i, "%m/%d/%Y %H:%M") for i in sampleAsk['created_at']]], columns=['hour'])
```


```python
# make a DataFrame of hour (of the post) and (its) num_comments
hourCom = pd.concat([hour, sampleAsk['num_comments'].reset_index()], axis=1, ignore_index=True)[[0, 2]].rename({0: 'hour', 2: 'num_comments'}, axis=1)
hourCom
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>hour</th>
      <th>num_comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>13</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>14</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>14</td>
      <td>1</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1688</th>
      <td>16</td>
      <td>108</td>
    </tr>
    <tr>
      <th>1689</th>
      <td>23</td>
      <td>6</td>
    </tr>
    <tr>
      <th>1690</th>
      <td>16</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1691</th>
      <td>12</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1692</th>
      <td>09</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<p>1693 rows × 2 columns</p>
</div>




```python
# total of comments per hour
sumCom = hourCom.groupby('hour').sum()
sumCom.sort_values(['num_comments'], ascending=False).head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>num_comments</th>
    </tr>
    <tr>
      <th>hour</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>15</th>
      <td>4091</td>
    </tr>
    <tr>
      <th>17</th>
      <td>1286</td>
    </tr>
    <tr>
      <th>20</th>
      <td>1273</td>
    </tr>
    <tr>
      <th>13</th>
      <td>1149</td>
    </tr>
    <tr>
      <th>18</th>
      <td>1108</td>
    </tr>
  </tbody>
</table>
</div>



### 2. Answer: We see the top 5 golden hours where there are the most comments are 15, 17, 20, 13 and 18. However, this may not be accurate. We need to find out the rate of receiving comments/hour to verify this.


```python
# total of counts of posts per hour
countCom = hourCom.groupby('hour').count()
countCom
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>num_comments</th>
    </tr>
    <tr>
      <th>hour</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>00</th>
      <td>57</td>
    </tr>
    <tr>
      <th>01</th>
      <td>52</td>
    </tr>
    <tr>
      <th>02</th>
      <td>48</td>
    </tr>
    <tr>
      <th>03</th>
      <td>65</td>
    </tr>
    <tr>
      <th>04</th>
      <td>47</td>
    </tr>
    <tr>
      <th>05</th>
      <td>39</td>
    </tr>
    <tr>
      <th>06</th>
      <td>47</td>
    </tr>
    <tr>
      <th>07</th>
      <td>51</td>
    </tr>
    <tr>
      <th>08</th>
      <td>47</td>
    </tr>
    <tr>
      <th>09</th>
      <td>33</td>
    </tr>
    <tr>
      <th>10</th>
      <td>64</td>
    </tr>
    <tr>
      <th>11</th>
      <td>63</td>
    </tr>
    <tr>
      <th>12</th>
      <td>67</td>
    </tr>
    <tr>
      <th>13</th>
      <td>69</td>
    </tr>
    <tr>
      <th>14</th>
      <td>91</td>
    </tr>
    <tr>
      <th>15</th>
      <td>115</td>
    </tr>
    <tr>
      <th>16</th>
      <td>104</td>
    </tr>
    <tr>
      <th>17</th>
      <td>93</td>
    </tr>
    <tr>
      <th>18</th>
      <td>123</td>
    </tr>
    <tr>
      <th>19</th>
      <td>87</td>
    </tr>
    <tr>
      <th>20</th>
      <td>100</td>
    </tr>
    <tr>
      <th>21</th>
      <td>103</td>
    </tr>
    <tr>
      <th>22</th>
      <td>69</td>
    </tr>
    <tr>
      <th>23</th>
      <td>59</td>
    </tr>
  </tbody>
</table>
</div>




```python
averageHour = []
for i in range(0, 24):
    averageHour.append(sumCom['num_comments'][i]/countCom['num_comments'][i])
averageCom = pd.concat([sumCom, countCom, pd.DataFrame(averageHour, index=sumCom.index)], axis=1)
averageCom.columns = ['sum_comments', 'count_comments', 'average_comments']
averageCom
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sum_comments</th>
      <th>count_comments</th>
      <th>average_comments</th>
    </tr>
    <tr>
      <th>hour</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>00</th>
      <td>493</td>
      <td>57</td>
      <td>8.649123</td>
    </tr>
    <tr>
      <th>01</th>
      <td>485</td>
      <td>52</td>
      <td>9.326923</td>
    </tr>
    <tr>
      <th>02</th>
      <td>333</td>
      <td>48</td>
      <td>6.937500</td>
    </tr>
    <tr>
      <th>03</th>
      <td>523</td>
      <td>65</td>
      <td>8.046154</td>
    </tr>
    <tr>
      <th>04</th>
      <td>402</td>
      <td>47</td>
      <td>8.553191</td>
    </tr>
    <tr>
      <th>05</th>
      <td>916</td>
      <td>39</td>
      <td>23.487179</td>
    </tr>
    <tr>
      <th>06</th>
      <td>644</td>
      <td>47</td>
      <td>13.702128</td>
    </tr>
    <tr>
      <th>07</th>
      <td>693</td>
      <td>51</td>
      <td>13.588235</td>
    </tr>
    <tr>
      <th>08</th>
      <td>692</td>
      <td>47</td>
      <td>14.723404</td>
    </tr>
    <tr>
      <th>09</th>
      <td>146</td>
      <td>33</td>
      <td>4.424242</td>
    </tr>
    <tr>
      <th>10</th>
      <td>763</td>
      <td>64</td>
      <td>11.921875</td>
    </tr>
    <tr>
      <th>11</th>
      <td>523</td>
      <td>63</td>
      <td>8.301587</td>
    </tr>
    <tr>
      <th>12</th>
      <td>806</td>
      <td>67</td>
      <td>12.029851</td>
    </tr>
    <tr>
      <th>13</th>
      <td>1149</td>
      <td>69</td>
      <td>16.652174</td>
    </tr>
    <tr>
      <th>14</th>
      <td>972</td>
      <td>91</td>
      <td>10.681319</td>
    </tr>
    <tr>
      <th>15</th>
      <td>4091</td>
      <td>115</td>
      <td>35.573913</td>
    </tr>
    <tr>
      <th>16</th>
      <td>1049</td>
      <td>104</td>
      <td>10.086538</td>
    </tr>
    <tr>
      <th>17</th>
      <td>1286</td>
      <td>93</td>
      <td>13.827957</td>
    </tr>
    <tr>
      <th>18</th>
      <td>1108</td>
      <td>123</td>
      <td>9.008130</td>
    </tr>
    <tr>
      <th>19</th>
      <td>558</td>
      <td>87</td>
      <td>6.413793</td>
    </tr>
    <tr>
      <th>20</th>
      <td>1273</td>
      <td>100</td>
      <td>12.730000</td>
    </tr>
    <tr>
      <th>21</th>
      <td>1088</td>
      <td>103</td>
      <td>10.563107</td>
    </tr>
    <tr>
      <th>22</th>
      <td>1021</td>
      <td>69</td>
      <td>14.797101</td>
    </tr>
    <tr>
      <th>23</th>
      <td>626</td>
      <td>59</td>
      <td>10.610169</td>
    </tr>
  </tbody>
</table>
</div>




```python
averageCom.sort_values(by=['average_comments'], ascending=False).head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sum_comments</th>
      <th>count_comments</th>
      <th>average_comments</th>
    </tr>
    <tr>
      <th>hour</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>15</th>
      <td>4091</td>
      <td>115</td>
      <td>35.573913</td>
    </tr>
    <tr>
      <th>05</th>
      <td>916</td>
      <td>39</td>
      <td>23.487179</td>
    </tr>
    <tr>
      <th>13</th>
      <td>1149</td>
      <td>69</td>
      <td>16.652174</td>
    </tr>
    <tr>
      <th>22</th>
      <td>1021</td>
      <td>69</td>
      <td>14.797101</td>
    </tr>
    <tr>
      <th>08</th>
      <td>692</td>
      <td>47</td>
      <td>14.723404</td>
    </tr>
  </tbody>
</table>
</div>



### 2. Answer: We see the top 5 golden hours where on average receing comments are not 15, 17, 20, 13 and 18. However, 15 still remains the top golder hour receiving the most comments. 

### Based on two calculation (sum of comments/hour) and (average of comment/hour), we conclude that 15 is the most popular time of the day 'Ask HN' posts generally receive their comments from site users.
