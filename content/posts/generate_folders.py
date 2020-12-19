import glob, os
filelist= glob.glob("*.md")
for i in filelist:
    if not os.path.exists('../img/'+i.split('.md')[0]):
        os.makedirs('../img/'+i.split('.md')[0])