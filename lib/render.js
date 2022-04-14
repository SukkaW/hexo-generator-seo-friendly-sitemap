const path = require('path');
const ejs = require('@sukka/ejs');
const common = require('./common');
const url = require('url');

const render = (locals, config) => {
  const viewPath = path.join(__dirname, '..', 'views');

  const getCompiledContent = ({data, filename}, templateFilePath, templateContent) => {
    const compiledTemplate = ejs.compile(templateContent, {
        filename: templateFilePath
      });

    let xml = compiledTemplate({
      config,
      data: data,
      url
    });

    return {
      path: filename,
      data: xml
    };
  };

  const renderSitemaps = sitemap => {
    const templateFilePath = path.join(viewPath, sitemap.template);
    return Promise.all([
      sitemap,
      templateFilePath,
      common.getFileContent(templateFilePath)
    ]).then(results => getCompiledContent(...results));
  };

  return renderSitemaps;
};

module.exports = render;
