const common = require('./common');
const urljoin = require('url-join');

const indexSitemap = (locals, config) => {
  const get = filePaths => {
    const indexSitemapItems = filePaths
      .filter(v => v.isInIndexSitemap)
      .map(getIndexSitemapItem)

    filePaths.push({
      template: 'index-sitemap.ejs',
      filename: common.getIndexSitemapFilename(config),
      data: {
        items: indexSitemapItems
      }
    });
    return filePaths;
  };

  var getIndexSitemapItem = ({ filename, lastModification }) => ({
    url: urljoin(config.url, filename),
    lastModification: lastModification
  });

  return {
    get
  };
};

module.exports = indexSitemap;
