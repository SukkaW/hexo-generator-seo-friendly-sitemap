const common = require('./common');

const sortBy = (key) => {
  return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
};

const mentionedInPosts = ({posts}) => posts.length > 0;

const category = (locals, {sitemap}) => {
  const get = () => {
    if (sitemap && sitemap.category === false) {
      return;
    }
    if (locals.categories.length === 0) {
      return;
    }

    const categories = locals.categories.toArray()
      .filter(mentionedInPosts)
      .map(common.setItemLastUpdate)
      .sort(sortBy('updated'))
      .reverse();

    const lastUpdatedCategory = [].concat(categories).shift().updated || undefined;

    return {
      template: 'category-sitemap.ejs',
      filename: 'category-sitemap.xml',
      data: {
        items: categories
      },
      lastModification: lastUpdatedCategory,
      isInIndexSitemap: true
    };
  };

  return {
    get
  };
};

module.exports = category;
