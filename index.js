const path = require('path');

const config = hexo.config.sitemap = Object.assign({
  path: 'sitemap.xml'
}, hexo.config.sitemap);

if (!path.extname(config.path)) {
  config.path += '.xml';
}

hexo.extend.generator.register('sitemap', require('./lib/generator'));
