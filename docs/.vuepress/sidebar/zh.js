const { fs, path } = require('@vuepress/shared-utils')
const { getVers, getContentByVer } = require('../util');

const full = {};

getVers().forEach(ver => {
  full[`/${ver}/manual/`] = getContentByVer(ver);
})

console.log('full path:', full);

module.exports = full;
