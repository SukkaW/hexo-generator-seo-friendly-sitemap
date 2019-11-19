const _ = require('lodash');

const page = (locals, config) => {

  const isExcluded = ({sitemap, layout}) => {
    if (sitemap === false) {
      return true;
    }
    if (!layout || layout === 'false') {
      return true;
    }
    return false;
  };

  const get = () => {
    if (locals.pages.length === 0) {
      return;
    }
    const pages = _(locals.pages.toArray())
      .reject(isExcluded)
      .orderBy('updated', 'desc')
      .value();

    const lastUpdatedPage = _.chain(pages)
      .first()
      .get('updated')
      .value();

    return {
      template: 'page-sitemap.ejs',
      filename: 'page-sitemap.xml',
      data: {
        items: pages
      },
      lastModification: lastUpdatedPage,
      isInIndexSitemap: true
    };
  };

  return {
    get
  };
};

module.exports = page;
