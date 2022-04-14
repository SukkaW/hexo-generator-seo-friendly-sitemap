const urljoin = require('url-join');

const sortBy = (key) => {
  return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
};

const postInSitemap = ({ sitemap, published }) => sitemap !== false && published;

const post = locals => {
  const get = () => {
    if (locals.posts.length === 0) {
      return;
    }
    const posts = locals.posts.toArray()
      .filter(postInSitemap)
      .concat()
      .sort(sortBy('updated'));

    const lastUpdatedPost = [].concat(posts).shift().updated || undefined;

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
