const _ = require('lodash');
const common = require('./common');

const mentionedInPosts = ({posts}) => posts.length > 0;

const category = (locals, {sitemap}) => {
  const get = () => {
    if (sitemap && sitemap.category === false) {
      return;
    }
    if (locals.categories.length === 0) {
      return;
    }

    const categories = _(locals.categories.toArray())
      .filter(mentionedInPosts)
      .map(common.setItemLastUpdate)
      .sortBy('updated').reverse()
      .value();

    const lastUpdatedCategory = _.chain(categories)
      .first()
      .get('updated')
      .value();

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
