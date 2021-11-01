# run this file from root project dir
import glob, os
filelist= glob.glob("content/posts/*.md")
for i in filelist:
    if not os.path.exists('static/img/' + os.path.basename(i)):
        os.makedirs('static/img/' + os.path.basename(i)[:-3])