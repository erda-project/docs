const { fs, path } = require('@vuepress/shared-utils')
const { getVers, getContentByVer } = require('../get-ver');

// const officialPlugins = fs
//   .readdirSync(path.resolve(__dirname, '../../plugin/official'))
//   .map(filename => 'official/' + filename.slice(0, -3))
//   .sort()


// const context = requireContext(path.resolve(__dirname, './vers'), false, /\.js$/);
// const versLimit = 3;
// const getLast3Vers = () => {
//   return context.keys()
//     .map(a => Math.floor(100 * a.slice(0, -'.js'.length)))
//     .sort((a, b) => b - a)
//     .slice(0, versLimit)
//     .map(v => v / 100);
// }

const full = {};

getVers().forEach(ver => {
  console.log('include version:', ver);
  full[`/${ver}/manual/`] = getContentByVer(ver);
})

console.log('full:', full);

module.exports = full;
