import json
import requests
import frontmatter
import glob
import os
from time import sleep
import re


class HugoArticle(object):
    def assign_if_not_none(self, x, ind=None):
        if x is not None and ind is None:
            return x
        elif x is not None and ind is not None and ind in x:
            return self.assign_if_not_none(x[ind])
        else:
            return ""

    def __init__(self, article, published=False, series=None):
        # Get title, text and tags from hugo markdown files
        self.title = self.assign_if_not_none(article.metadata, "title")
        self.published = published

        body_markdown = self.assign_if_not_none(article.content)
        relative_image_paths = re.findall("\!\[(.*?)\]\(\/img\/(.*?)\)", body_markdown)
        for relative_image_path in relative_image_paths:
            image = os.path.join(
                "https://raw.githubusercontent.com/rushichaudhari/rushichaudhari.github.io/main/static/img",
                relative_image_path[1],
            )
            body_markdown = body_markdown.replace(relative_image_path[1], image)

        self.body_markdown = body_markdown
        self.tags = self.assign_if_not_none(article.metadata, "tags")

        # assign categories as tags if tags is none
        if self.tags is None:
            self.tags = self.assign_if_not_none(article.metadata, "categories")

        self.series = series


def get_article_from_file(filepath):
    with open(filepath, "r") as f:
        article = frontmatter.load(f)
        return HugoArticle(article)


if __name__ == "__main__":
    # execute only if run as a script
    print("Starting devpush")
    url = "https://dev.to/api/articles"
    files = glob.glob(os.environ["MARKDOWN_POSTS_PATH"])

    sleeptime = 5
    print('devtotkej', os.enviorn["DEVTO_TOKEN"])
    for file in files:
        sleep(int(sleeptime))
        hugo_article = get_article_from_file(file)
        this_dict = {"article": hugo_article.__dict__}
        data = json.dumps(this_dict)
        result = requests.post(
            url=url,
            json=json.loads(data),
            headers={"api_key": os.enviorn["DEVTO_TOKEN"]},
        )
        print(file)