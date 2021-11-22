const { getVers, enPrefix } = require('../util');

const verItems = getVers().map(ver => {
  if (ver <= 1.1) {
    return {
      text: `v${ver}`,
      link: `${enPrefix}/${ver}/manual/`,
      forceToIndex: true,
      version: ver,
    }
  }
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
