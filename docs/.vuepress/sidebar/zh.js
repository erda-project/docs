const { fs, path } = require('@vuepress/shared-utils')
const { getVers, getContentByVer } = require('../util');

const full = {};

getVers().forEach(ver => {
  console.log('include version:', ver);
  full[`/${ver}/manual/`] = getContentByVer(ver);
})

console.log('full:', full);

module.exports = full;
