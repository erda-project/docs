const { getVers, enPrefix } = require('../util');

const verItems = getVers().map(ver => {
  return {
    text: `v${ver}`,
    link: `${enPrefix}/${ver}/manual/about/intro.html`,
    version: ver,
  }
})

module.exports = [
  {
    text: 'Official Site',
    link: `https://www.erda.cloud/`,
  },
  {
    text: 'Versions',
    ariaLabel: 'Versions',
    items: verItems,
  },
]
