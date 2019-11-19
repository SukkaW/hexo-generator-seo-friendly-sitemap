const _ = require('lodash');
const urljoin = require('url-join');

const postInSitemap = ({sitemap, published}) => sitemap !== false && published;

const post = locals => {
  const get = () => {
    if (locals.posts.length === 0) {
      return;
    }
    const posts = _(locals.posts.toArray())
      .filter(postInSitemap)
      .orderBy('updated', 'desc')
      .value();

    const lastUpdatedPost = _.chain(posts)
      .first()
      .get('updated')
      .value();

    return {
      template: 'post-sitemap.ejs',
      filename: 'post-sitemap.xml',
      data: {
        items: posts,
        urljoin
      },
      lastModification: lastUpdatedPost,
      isInIndexSitemap: true
    };
  };

  return {
    get
  };
};

module.exports = post;
