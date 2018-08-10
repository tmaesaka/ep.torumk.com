---
title: Fastly で画像を配信するようにした
titlesuffix: true
permalink: /images-through-fastly
tags: fastly
published: true
---

当ウェブサイトの画像を [Fastly](/t/fastly) で配信するようにしました。

![chicken-and-waffles]({{ site.object_store}}/ep/13fd7008.jpg)

最近は [Historical Stats](https://docs.fastly.com/api/stats) の開発を担当しているので、都合の良い検証データを得るために導入しました。
Origin には [Google Cloud Storage](https://cloud.google.com/storage/) (GCS) を選びました。
セットアップは Fastly の[公式ドキュメント](https://docs.fastly.com/guides/integrations/google-cloud-storage)を参考にしました。
ついでに [Synthetic Response](https://docs.fastly.com/guides/basic-configuration/responses-tutorial) をつかった[テクニック](https://docs.fastly.com/guides/basic-configuration/creating-error-pages-with-custom-responses)で 403 エラーの見た目をよくしました。
結果、良い検証データが得られるようになりました。
満足。