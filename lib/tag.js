const _ = require('lodash');
const common = require('./common');

const mentionedInPosts = ({posts}) => posts.length > 0;

const tag = (locals, {sitemap}) => {
  const get = () => {
    if (sitemap && sitemap.tag === false) {
      return;
    }
    if (locals.tags.length === 0) {
      return;
    }

    const tags = _(locals.tags.toArray())
      .filter(mentionedInPosts)
      .map(common.setItemLastUpdate)
      .sortBy('updated').reverse()
      .value();

    const lastUpdatedTag = _.chain(tags)
      .first()
      .get('updated')
      .value();

    return {
      template: 'tag-sitemap.ejs',
      filename: 'tag-sitemap.xml',
      data: {
        items: tags
      },
      lastModification: lastUpdatedTag,
      isInIndexSitemap: true
    };
  };

  return {
    get
  };
};

module.exports = tag;
