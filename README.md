### To test

```
hugo server -D
```


### To build

```
hugo
```

### Write a post
All of your posts must in the `content/posts` folder.

You can generate it by:

```
hugo new posts/articleTitle.md
```

By default, the new md file's template will contain:

```
---
title: {{ replace .TranslationBaseName "-" " " | title }}
date: {{ .Date }}
lastmod: {{ .Date }}
author: Author Name
# avatar: /img/author.jpg
# authorlink: https://author.site
cover: /img/cover.jpg
categories:
  - category1
tags:
  - tag1
  - tag2
draft: true
---

Cut out summary from your post content here.

<!--more-->

The remaining content of your post.
```