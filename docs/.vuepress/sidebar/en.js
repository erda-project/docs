const { fs, path } = require('@vuepress/shared-utils')
const { getVers, getContentByVer, enPrefix } = require('../util');

const full = {};

getVers().forEach(ver => {
  console.log('include version:', ver);
  full[`${enPrefix}/${ver}/manual/`] = getContentByVer(`${ver}-en`);
})


module.exports = full;
