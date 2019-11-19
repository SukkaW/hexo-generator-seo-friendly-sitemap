const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const getPostUpdated = ({updated}) => updated.toDate();

const common = {
  setItemLastUpdate(item) {
    const posts = item.posts.toArray();
    item.updated = _.maxBy(posts, getPostUpdated).updated.toDate();
    return item;
  },
  getFileContent(filePath) {
    return fs.readFileAsync(filePath, {encoding: 'utf8'});
  },
  isDefined: _.negate(_.isUndefined),
  getIndexSitemapFilename({sitemap, root}) {
    if (sitemap && sitemap.path) {
      return sitemap.path;
    }
    return `${root}sitemap.xml`;
  }
};

module.exports = common;
