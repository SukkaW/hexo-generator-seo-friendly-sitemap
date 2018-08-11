# hexo-generator-better-sitemap

Orignally: hexo-generator-seo-friendly-sitemap.

Generate SEO-friendly sitemap. Inspired by XML Sitemap in Yoast Wordpress SEO Plugin (https://yoast.com).

It will generate separated sitemap files for pages, posts, categories, tags and a XSL stylesheet.

## Install

``` bash
$ npm i hexo-generator-better-sitemap --save
```

## Options

You can configure this plugin in `_config.yml`.

```yaml
sitemap:
    path: sitemap.xml
```

You can exclude tag or category page from the sitemap by adding `tag: false` or `category: false` under the `sitemap` configuration.

```yaml
sitemap:
    path: sitemap.xml
    tag: false
    category: false
```

- **path** - Index sitemap path.

## Excluding pages or posts

You can exclude pages or posts from the sitemap by adding `sitemap: false` to the relevant front-matter.

## License

MIT
