const common = require('./common');

const xsl = (locals, config) => {
  const get = () => ({
    template: 'sitemapXsl.ejs',
    filename: 'sitemap.xsl',

    data: {
      indexSitemapUrl: common.getIndexSitemapFilename(config)
    },

    isInIndexSitemap: false
  });

  return {
    get
  };
};

module.exports = xsl;
