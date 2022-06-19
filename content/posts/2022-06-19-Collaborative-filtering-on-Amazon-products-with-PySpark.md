---
layout: post
title: "Collaborative Filtering on Amazon Products With PySpark"
date: 2022-06-19
author: rushi
# cover: ''
categories: ["python", "data-science"]
tags: ["python", "recommender"]
---

## Goals
### Recommend top 5 products for an user: RMSE = 1.22

## Data set description
- This is a list of over 34,000 consumer reviews for Amazon products like the Kindle, Fire TV Stick, and more provided by Datafiniti's Product Database. The dataset includes basic product information, rating, review text, and more for each product.
- Note that this is a sample of a large dataset. The full dataset is available through Datafiniti.



```python
from pyspark.sql import SparkSession, column
```


```python
spark = SparkSession.builder.appName('rs').getOrCreate()
```


```python
df = spark.read.csv('Amazon_Consumer_Reviews.csv', inferSchema=True, header=True)
```


```python
df.printSchema()
```

    root
     |-- id: string (nullable = true)
     |-- dateAdded: timestamp (nullable = true)
     |-- dateUpdated: timestamp (nullable = true)
     |-- name: string (nullable = true)
     |-- asins: string (nullable = true)
     |-- brand: string (nullable = true)
     |-- categories: string (nullable = true)
     |-- primaryCategories: string (nullable = true)
     |-- imageURLs: string (nullable = true)
     |-- keys: string (nullable = true)
     |-- manufacturer: string (nullable = true)
     |-- manufacturerNumber: string (nullable = true)
     |-- reviews.date: string (nullable = true)
     |-- reviews.dateSeen: string (nullable = true)
     |-- reviews.didPurchase: string (nullable = true)
     |-- reviews.doRecommend: boolean (nullable = true)
     |-- reviews.id: string (nullable = true)
     |-- reviews.numHelpful: integer (nullable = true)
     |-- reviews.rating: integer (nullable = true)
     |-- reviews.sourceURLs: string (nullable = true)
     |-- reviews.text: string (nullable = true)
     |-- reviews.title: string (nullable = true)
     |-- reviews.username: string (nullable = true)
     |-- sourceURLs: string (nullable = true)
    



```python
import re
from pyspark.sql.functions import col
```


```python
def rename_cols(df):
    for column in df.columns:
        new_column = column.replace('.','')
        df = df.withColumnRenamed(column, new_column)
    return df
```


```python
df_2 = rename_cols(df)
```


```python
df_2.columns
```

    ['id',
     'dateAdded',
     'dateUpdated',
     'name',
     'asins',
     'brand',
     'categories',
     'primaryCategories',
     'imageURLs',
     'keys',
     'manufacturer',
     'manufacturerNumber',
     'reviewsdate',
     'reviewsdateSeen',
     'reviewsdidPurchase',
     'reviewsdoRecommend',
     'reviewsid',
     'reviewsnumHelpful',
     'reviewsrating',
     'reviewssourceURLs',
     'reviewstext',
     'reviewstitle',
     'reviewsusername',
     'sourceURLs']




```python
df_3 = df_2.select('reviewsusername', 'id', 'reviewsrating')
```


```python
df_3.groupBy('reviewsusername').count().orderBy('count', ascending=False).show(10)
```

    +-----------------+-----+
    |  reviewsusername|count|
    +-----------------+-----+
    |ByAmazon Customer|  889|
    |             Mike|   62|
    |ByKindle Customer|   45|
    |             Dave|   44|
    |            Chris|   38|
    |             John|   30|
    |             Nana|   28|
    |        Anonymous|   27|
    |           ByMike|   26|
    |             Brad|   26|
    +-----------------+-----+
    only showing top 10 rows
    



```python
df_3.groupBy('reviewsrating').count().orderBy('count', ascending=False).show(10)
```

    +-------------+-----+
    |reviewsrating|count|
    +-------------+-----+
    |            5|19831|
    |            4| 5621|
    |            3| 1205|
    |            1|  965|
    |            2|  617|
    |            0|   91|
    |           16|    1|
    |           44|    1|
    +-------------+-----+
    



```python
df_4 = df_3.filter("reviewsrating != 44 AND reviewsrating != 16")
```


```python
from pyspark.sql.functions import *
from pyspark.ml.feature import StringIndexer, IndexToString
```


```python
stringIndexer = StringIndexer(inputCol="id", outputCol="id_int")
model = stringIndexer.fit(df_4)
df_5 = model.transform(df_4)
```


```python
df_5.groupBy('id_int').count().orderBy('count', ascending=False).show(10)
```

    +------+-----+
    |id_int|count|
    +------+-----+
    |   0.0| 8343|
    |   1.0| 3728|
    |   2.0| 2443|
    |   3.0| 2370|
    |   4.0| 1676|
    |   5.0| 1425|
    |   6.0| 1212|
    |   7.0| 1024|
    |   8.0|  987|
    |   9.0|  883|
    +------+-----+
    only showing top 10 rows
    



```python
stringIndexer = StringIndexer(inputCol="reviewsusername", outputCol="userid")
model = stringIndexer.fit(df_5)
df_6 = model.transform(df_5)
```


```python
df_6.show(5)
```

    +----------------+--------------------+-------------+------+-------+
    | reviewsusername|                  id|reviewsrating|id_int| userid|
    +----------------+--------------------+-------------+------+-------+
    |      Byger yang|AVpgNzjwLJeJML43Kpxn|            3|   0.0|12659.0|
    |            ByMG|AVpgNzjwLJeJML43Kpxn|            4|   0.0|  153.0|
    |BySharon Lambert|AVpgNzjwLJeJML43Kpxn|            5|   0.0|11560.0|
    |   Bymark sexson|AVpgNzjwLJeJML43Kpxn|            5|   0.0|12926.0|
    |         Bylinda|AVpgNzjwLJeJML43Kpxn|            5|   0.0|  953.0|
    +----------------+--------------------+-------------+------+-------+
    only showing top 5 rows
    



```python
train, test = df_6.randomSplit([0.75,0.25])
```


```python
train.count()
```




    21251




```python
test.count()
```




    7079




```python
from pyspark.ml.recommendation import ALS
```


```python
rs = ALS(maxIter=10, regParam=0.01, userCol='userid', itemCol='id_int', ratingCol='reviewsrating', nonnegative=True, coldStartStrategy="drop")
rs = rs.fit(train)
```


```python
pred = rs.transform(test)
```

#### RMSE is roughly 1.22, which is quite satisfied for a small dataset of 21000 training rows. Lower RMSE can be achieved with a hybrid recommender system.


```python
from pyspark.ml.evaluation import RegressionEvaluator

evaluator = RegressionEvaluator(metricName='rmse', predictionCol='prediction', labelCol='reviewsrating')
rmse = evaluator.evaluate(pred)
print(rmse)
```

    1.2034306578134335


#### Top 5 recommend products userid 20


```python
# find out which products userid has used
total_prod = df_6.select('id_int').distinct()
used_prod = df_6.filter(df_6['userid'] == 20).select('id_int').distinct()
used_prod = used_prod.withColumnRenamed("id_int", "id_int_used")
joined = total_prod.join(used_prod, total_prod.id_int == used_prod.id_int_used, how='left')
```


```python
new_prod = joined.where(col('id_int_used').isNull()).select(col('id_int')).distinct()
new_prod = new_prod.withColumn("userid",lit(int(20)))
new_prod.show(5)
```

    +------+------+
    |id_int|userid|
    +------+------+
    |   8.0|    20|
    |   7.0|    20|
    |  49.0|    20|
    |  29.0|    20|
    |  64.0|    20|
    +------+------+
    only showing top 5 rows
    



```python
# run ALS model and pick top 5 products
rec = rs.transform(new_prod).orderBy('prediction', ascending=False)
rec.createTempView('rec')
rec_5 = spark.sql('SELECT id_int FROM rec LIMIT 5')
prod_id = rec_5.join(df_6, rec_5.id_int == df_6.id_int, how='left')
```


```python
prod_id.select('id').join(df_2, prod_id.id == df_2.id, how='left').select('name').distinct().show()
```

    +--------------------+
    |                name|
    +--------------------+
    |Amazon Fire TV Ga...|
    |AmazonBasics Vent...|
    |Amazon Echo Show ...|
    |AmazonBasics Nylo...|
    |All-New Kindle Oa...|
    +--------------------+
    


