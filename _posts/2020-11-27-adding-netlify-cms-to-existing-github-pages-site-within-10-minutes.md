---
title: Adding Netlify CMS to Existing GitHub Pages Site Within 10 Minutes
date: 2020-11-27T20:23:48.714Z
---
<!--StartFragment-->

## Creating a Netlify Site

… Relax! We’re just creating one, without actually using it. In fact, if you want to deploy Jekyll site on Netlify, you [will need](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/) to include Jekyll (generator) in your git repo.

Go to [Netlify](https://app.netlify.com/account/sites) and create a new site from… *any* repo. We are not really using Netlify to host that, anyway.

After that, go to **Settings**, and copy your **Site name**. It should be something like `octopus-cat-123456`.

From the sidebar go to **Domain Management** and add your GitHub Pages domain (`you.github.io`) as a custom domain. Choose **Yes** when asked if you are `github.io`’s owner.

From the sidebar go to **Access control**, scroll down to **OAuth** and click **Install provider**.

Choose **GitHub** as provider, and enter the **Client ID** and **Client Secret** from GitHub OAuth app page mentioned above.

Then you can close the Netlify and GitHub webpages.

<!--EndFragment-->