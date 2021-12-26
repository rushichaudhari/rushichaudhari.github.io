# make sure you can run hugo in cli

from datetime import datetime
import subprocess
import os 

title = input('Enter the title: ')
postpath = f'posts/{datetime.now().strftime("%Y-%m-%d")}-{"-".join(title.split(" "))}'

if not postpath[-3:] == '.md':
    postpath += '.md'

out = subprocess.run(f'hugo new {postpath}', shell=True)

# create folder excluding posts/ and .md in the end at static/img
if not os.path.exists('static/img/' + postpath[6:-3]):
    os.makedirs('static/img/' + postpath[6:-3])

if not out.returncode:
    print("post created")
else:
    print("error creating post")