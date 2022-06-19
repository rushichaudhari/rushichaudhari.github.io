---
layout: post
title: "Apache Hadoop Stack: MapReduce, Pig, Spark, Hive"
date: 2022-06-19
author: rushi
# cover: ''
categories: ["python", "data-science"]
tags: ["hadoop", "spark", "hive", "pig"]
---

# Apache Hadoop Stack: MapReduce, Pig, Spark, Hive

### 1. HDFS CLI: load input data

#### list all directories
```
hadoop fs -ls
```

#### make a new directory to store movie data
```
hadoop fs -mkdir movieData
```

#### copy data file from local to hdfs
```
hadoop fs -copyFromLocal u.data movieData/u.data
```

### 2. MapReduce with Python: movies sorted by rating counts

#### script

```python

from mrjob.job import MRJob
from mrjob.step import MRStep

class RatingsBreakdown(MRJob):
    def steps(self):
        return [
            MRStep(mapper=self.mapper_get_movie,
                   combiner=self.combiner_count_ratings,
                   reducer=self.reducer_count_ratings),
            MRStep(reducer=self.reducer_sort_movie)
        ]

    def mapper_get_movie(self, _, line):
        (userID, movieID, rating, timestamp) = line.split('\t')
        yield movieID, 1
        
    def combiner_count_ratings(self, movie, counts):
        yield movie, sum(counts)
    
    
    def reducer_count_ratings(self, movie, counts):
        yield None, (sum(counts), movie)
        
    # define sorting task
    def reducer_sort_movie(self, _, movie_count_pairs):
        for count, movie in sorted(movie_count_pairs):
            yield ('%0d' % int(count), movie)

if __name__ == '__main__':
    RatingsBreakdown.run()
```


#### locally running with python
```
python3 MovieSort.py u.data
```

#### using hadoop
```
python3 MovieSort.py -r hadoop u.data
```

#### output
```
"1"	"1122"

"1"	"1130"


"508"	"100"

"509"	"258"

"584"	"50"
```

### 3. Analysis with Pig: low-rated movies

#### script

```
# load rating data
ratings = LOAD 'u.data' 
AS (userID: int, movieID: int, rating: int, ratingTime: int);

# load movie data
metadata = LOAD 'u.item' USING PigStorage('|') 
AS (movieID: int, movieTitle: chararray, releaseDate: chararray, videoRelease: chararray, imdbLink: chararray);

# group ratings by movieID
ratingsByMovie = GROUP ratings BY movieID;

# calculate average and count of ratings per movieID
ratingsAgg = FOREACH ratingsByMovie GENERATE group AS movieID, AVG(ratings.rating) AS avgRating, COUNT(ratings.rating) AS ratingCounts;

# filter low rated movies
lowRatings = FILTER ratingsAgg BY avgRating < 2.0;

# get these movies data
LowRatedWithData = JOIN lowRatings BY movieID, metadata by movieID;

# sort based on counts
sortedLowRatedWithData = ORDER LowRatedWithData BY lowRatings::ratingCounts;

DUMP sortedLowRatedWithData;
```

#### output

```

(743,1.9487179487179487,39,743,Crow: City of Angels, The (1996),30-Aug-1996,,http://us.imdb.com/M/title-exact?Crow%3A%20City%20of%20Angels%2C%20The%20%281996%29)

(890,1.9534883720930232,43,890,Mortal Kombat: Annihilation (1997),01-Jan-1997,,http://us.imdb.com/M/title-exact?Mortal+Kombat%3A+Annihilation+(1997))

(688,1.8409090909090908,44,688,Leave It to Beaver (1997),22-Aug-1997,,http://us.imdb.com/M/title-exact?Leave+It+To+Beaver+(1997))
```

### 4. Spark MLLib: validate RDD-based ALS recommender system


```python
# set up environment
conf = SparkConf().setAppName("restaurantRC")
sc = SparkContext.getOrCreate(conf=conf)
```


```python
def parseRating(line):
    # userID, (userID, placeID, rating)
    fields = line.strip().split(",")
    return str(fields[0])[1:], (str(fields[0])[1:], int(fields[1]), float(fields[2]))

# RDD of ratings
ratings = sc.textFile("resData/ratings.csv").map(parseRating)
```


```python
ratings.toDF().show()
```

    +----+-------------------+
    |  _1|                 _2|
    +----+-------------------+
    |1077|[1077, 135085, 2.0]|
    |1077|[1077, 135038, 2.0]|
    |1077|[1077, 132825, 2.0]|
    |1077|[1077, 135060, 1.0]|
    |1068|[1068, 135104, 1.0]|
    |1068|[1068, 132740, 0.0]|
    |1068|[1068, 132663, 1.0]|
    |1068|[1068, 132732, 0.0]|
    |1068|[1068, 132630, 1.0]|
    |1067|[1067, 132584, 2.0]|
    |1067|[1067, 132733, 1.0]|
    |1067|[1067, 132732, 1.0]|
    |1067|[1067, 132630, 1.0]|
    |1067|[1067, 135104, 0.0]|
    |1067|[1067, 132560, 1.0]|
    |1103|[1103, 132584, 1.0]|
    |1103|[1103, 132732, 0.0]|
    |1103|[1103, 132630, 1.0]|
    |1103|[1103, 132613, 2.0]|
    |1103|[1103, 132667, 1.0]|
    +----+-------------------+
    only showing top 20 rows
    



```python
def parsePlace(line):
    # userID, (userID, placeID, rating)
    fields = line.strip().split(",")
    return int(fields[0]), str(fields[4])

places = sc.textFile("resData/geoplaces.csv").map(parsePlace)
```


```python
places.toDF().show()
```

    +------+--------------------+
    |    _1|                  _2|
    +------+--------------------+
    |134999|     Kiku Cuernavaca|
    |132825|     puesto de tacos|
    |135106|El Rinc�n de San ...|
    |132667|little pizza Emil...|
    |132613|       carnitas_mata|
    |135040|Restaurant los Co...|
    |132732|  Taqueria EL amigo |
    |132875|           shi ro ie|
    |132609|Pollo_Frito_Bueno...|
    |135082|la Estrella de Dimas|
    |135070|      Restaurante 75|
    |135069|Abondance Restaur...|
    |135065|El angel Restaurante|
    |135076|Restaurante Puebl...|
    |135086|Mcdonalds Parque ...|
    |132870|Tortas y hamburgu...|
    |132854|             Sirlone|
    |132937|         rockabilly |
    |132856|       Unicols Pizza|
    |132668|      TACOS EL GUERO|
    +------+--------------------+
    only showing top 20 rows
    



```python
# stats of ratings and places
numRatings = ratings.count()
numUsers = ratings.values().map(lambda r: r[0]).distinct().count()
numPlaces = ratings.values().map(lambda r: r[1]).distinct().count()

print("Got %d ratings from %d users at %d places"\
      % (numRatings, numUsers, numPlaces))
```

    Got 1161 ratings from 138 users at 130 places



```python
numPartitions = 4
training = ratings.filter(lambda x: int(x[0][-1]) < 8)\
                  .values()\
                  .repartition(numPartitions)\
                  .cache()

test = ratings.filter(lambda x: int(x[0][-1]) >= 8).values().cache()
```


```python
training.toDF().show()
```

    +----+------+---+
    |  _1|    _2| _3|
    +----+------+---+
    |1103|132584|1.0|
    |1103|132732|0.0|
    |1103|132630|1.0|
    |1103|132613|2.0|
    |1103|132667|1.0|
    |1103|135104|1.0|
    |1103|132663|1.0|
    |1103|132733|2.0|
    |1107|132660|2.0|
    |1107|132584|2.0|
    |1123|132594|1.0|
    |1021|132740|2.0|
    |1026|132626|2.0|
    |1021|132668|2.0|
    |1021|132715|2.0|
    |1044|134987|0.0|
    |1083|135034|2.0|
    |1083|132723|1.0|
    |1083|135046|2.0|
    |1012|135001|1.0|
    +----+------+---+
    only showing top 20 rows
    



```python
def computeRmse(model, data):
    """
    Compute RMSE (Root Mean Squared Error).
    """
    testdata = data.map(lambda p: (p[0], p[1]))
    predictions = model.predictAll(testdata).map(lambda r: ((r[0], r[1]), r[2]))
    ratesAndPreds = data.map(lambda r: ((int(r[0]), int(r[1])), r[2])).join(predictions)
    MSE = ratesAndPreds.map(lambda r: (r[1][0] - r[1][1])**2).mean()
    
    return sqrt(MSE)
```


```python
import itertools
from math import sqrt
from operator import add
from pyspark.mllib.recommendation import ALS

# train models and evaluate them on the validation set
ranks = [8, 12]
lambdas = [0.1, 10.0]
numIters = [10, 20]
bestModel = None
bestValidationRmse = float("inf")
bestRank = 0
bestLambda = -1.0
bestNumIter = -1

for rank, lmbda, numIter in itertools.product(ranks, lambdas, numIters):
    model = ALS.train(training, rank, numIter, lmbda)
    validationRmse = computeRmse(model, training)
    print("RMSE (validation) = " + str(validationRmse)
          + "\n rank = %d, lambda = %.1f, and numIter = %d."\
          % (rank, lmbda, numIter))
    
    # update vals
    if (validationRmse < bestValidationRmse):
        bestModel = model
        bestValidationRmse = validationRmse
        bestRank = rank
        bestLambda = lmbda
        bestNumIter = numIter
    
# evaluate the best model on the test set
print("The best model was trained with rank = %d and lambda = %.1f, "\
      % (bestRank, bestLambda)\
      + "and numIter = %d, and its best RMSE is %f."\
      % (bestNumIter, bestValidationRmse))

```
    RMSE (validation) = 0.2240530863073183
     rank = 8, lambda = 0.1, and numIter = 10.
    RMSE (validation) = 0.22187921315036943
     rank = 8, lambda = 0.1, and numIter = 20.
    RMSE (validation) = 1.463327585719048
     rank = 8, lambda = 10.0, and numIter = 10.
    RMSE (validation) = 1.463327585719048
     rank = 8, lambda = 10.0, and numIter = 20.
    RMSE (validation) = 0.21600147029394132
     rank = 12, lambda = 0.1, and numIter = 10.
    RMSE (validation) = 0.21570798198346153
     rank = 12, lambda = 0.1, and numIter = 20.
    RMSE (validation) = 1.463327585719048
     rank = 12, lambda = 10.0, and numIter = 10.
    RMSE (validation) = 1.463327585719048
     rank = 12, lambda = 10.0, and numIter = 20.
    The best model was trained with rank = 12 and lambda = 0.1, and numIter = 20, and its best RMSE is 0.215708.



```python
numTest = test.count()

# compare the best model with a naive baseline
# that always returns the mean rating
meanRating = training.map(lambda x: x[2]).mean()
baselineRmse = sqrt(test.map(lambda x: (meanRating - x[2]) ** 2).reduce(add)/numTest)
improvement = (baselineRmse - bestValidationRmse)/baselineRmse * 100

print("The best model improves the baseline by %.2f" % (improvement) + "%.")
```

    The best model improves the baseline by 73.64%.


### 5. HiveQL: the higest rated restaurant

#### script
```
# create restaurant database
CREATE DATABASE IF NOT EXISTS restaurant;

# use the database
USE restaurant;

# create ratings table
CREATE TABLE ratings (
    userID INT,
    placeID INT,
    rating INT)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE;

# load local input file
LOAD LOCAL DATA INPATH '/resData/ratings.csv'
OVERWRITE INTO TABLE ratings;

# create cuisine table
CREATE TABLE cuisine (
    placeID INT,
    type STRING)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE;

# load local input file
LOAD LOCAL DATA INPATH '/resData/chefmozcuisine.csv'
OVERWRITE INTO TABLE cuisine;

# create view of average and count of ratings
CREATE VIEW highestRated AS
SELECT placeID, avg(rating) as avgRating, count(rating) as countRating
FROM ratings
GROUP BY placeID
HAVING countRating >= 10;

# get the highest rated restaurant, with cuisine info
SELECT highestRated.placeID, highestRated.avgRating, cuisine.type
FROM highestRated JOIN cuisine on highestRated.placeID = cuisine.placeID
ORDER By highestRated.avgRating DESC;

# get the highest rated cuisine
SELECT avg(highestRated.avgRating) as cuisineRating, cuisine.type
FROM highestRated JOIN cuisine on highestRated.placeID = cuisine.placeID
GROUP BY cuisine.type
ORDER By cuisineRating DESC;
```

#### output of the highest rated restaurant

```
"135075","1.6923076923076923","Seafood"
"135025","1.6666666666666667","Mexican"
"132768","1.6","Family"
"135030","1.5833333333333333","Cafe-Coffee_Shop"
"135030","1.5833333333333333","Cafeteria"
"135028","1.5333333333333334","Mexican"
```

#### output of the highest rated cuisine

```
"1.6","Family"
"1.5833333333333333","Cafe-Coffee_Shop"
"1.3888888888888888","International"
"1.3656364468864468","Mexican"
"1.3218181818181818","Bar_Pub_Brewery"
"1.269667832167832","Seafood"
```
