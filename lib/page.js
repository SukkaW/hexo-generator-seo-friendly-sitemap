const reject = (arr, predicate) => {
  const complement = (f) => (x) => !f(x);

  return arr.filter(complement(predicate));
};

const sortBy = (key) => {
  return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
};

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
    const pages = reject(locals.pages.toArray(), isExcluded)
      .concat()
      .sort(sortBy('updated'));

    const lastUpdatedPage = [].concat(pages).shift().updated || undefined;

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

  return { get };
};

module.exports = page;
