const path = require('path');
const Promise = require('bluebird');
const ejs = require('ejs');
const beautify = require('pretty-data').pd;
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

    if (config.sitemap.beautify) {
      xml = beautify.xml(xml);
    }

    return {
      path: filename,
      data: xml
    };
  };

  const renderSitemaps = sitemap => {
    const templateFilePath = path.join(viewPath, sitemap.template);
    return Promise.join(
      sitemap,
      templateFilePath,
      common.getFileContent(templateFilePath),
      getCompiledContent);
  };

  return renderSitemaps;
};

module.exports = render;
