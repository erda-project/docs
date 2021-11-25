const { fs, path } = require('@vuepress/shared-utils')
const { getVers, getContentByVer, enPrefix } = require('../util');

const full = {};

getVers().forEach(ver => {
  full[`${enPrefix}/${ver}/manual/`] = getContentByVer(`${ver}-en`);
})

console.log('english full path:', full);

module.exports = full;
