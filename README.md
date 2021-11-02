### To test

```
hugo server -D
```


### To build

```
hugo
```

### Generate folders for images
```
python generate_folders.py
```

### Markdown paste
save this path for image save dir in the Markdown Paste extension`${workspaceRoot}/img/${fileBasenameNoExtension}/`

### Write a post
All of your posts must in the `content/posts` folder.

You can generate it by:

```
hugo new posts/articleTitle.md
```

Use `archetypes/default.md` for setting the default template