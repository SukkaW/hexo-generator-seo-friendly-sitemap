const seoFriendlySitemap = function (locals) {
  const { config } = this;
  const posts = require('./post')(locals, config);
  const pages = require('./page')(locals, config);
  const categories = require('./category')(locals, config);
  const tags = require('./tag')(locals, config);
  const xsl = require('./xsl')(locals, config);
  const indexSitemap = require('./indexSitemap')(locals, config);
  const render = require('./render')(locals, config);

  const sitemaps = [
    posts.get(),
    pages.get(),
    categories.get(),
    tags.get(),
    xsl.get()
  ];

  return Promise.all(sitemaps)
    .then(arr => arr.filter(Boolean))
    .then(indexSitemap.get)
    .then(results => Promise.all(results.map(render)))
};

module.exports = seoFriendlySitemap;
