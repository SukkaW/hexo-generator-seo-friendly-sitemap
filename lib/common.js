const fs = require('fs/promises');

const getPostUpdated = ({ updated, date }) => updated?.toDate() ?? date?.toDate() ?? 0;

const common = {
  setItemLastUpdate(item) {
    const posts = item.posts.toArray();
    item.updated = posts.reduce((a, b) => { return getPostUpdated(a) >= getPostUpdated(b) ? a : b }, {}).updated.toDate()

    return item;
  },
  getFileContent(filePath) {
    return fs.readFile(filePath, { encoding: 'utf-8' });
  },
  getIndexSitemapFilename({ sitemap, root }) {
    if (sitemap && sitemap.path) {
      return sitemap.path;
    }
    return `${root}sitemap.xml`;
  }
};

module.exports = common;
