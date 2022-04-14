const common = require('./common');

const sortBy = (key) => {
  return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
};

const mentionedInPosts = ({posts}) => posts.length > 0;

const tag = (locals, {sitemap}) => {
  const get = () => {
    if (sitemap && sitemap.tag === false) {
      return;
    }
    if (locals.tags.length === 0) {
      return;
    }

    const tags = locals.tags.toArray()
      .filter(mentionedInPosts)
      .map(common.setItemLastUpdate)
      .sort(sortBy('updated'))
      .reverse();

    const lastUpdatedTag = [].concat(tags).shift().updated || undefined;

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
