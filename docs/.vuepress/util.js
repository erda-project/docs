const { path } = require('@vuepress/shared-utils')
const requireContext = require('require-context');


const context = requireContext(path.resolve(__dirname, './sidebar/vers'), false, /\.js$/);
const versLimit = 2;
const getVers = () => {
  return context.keys()
    .map(a => Math.floor(100 * a.slice(0, -'.js'.length)))
    .sort((a, b) => b - a)
    .slice(0, versLimit)
    .map(v => v / 100);
}
const getContentByVer = ver => context(`${ver}.js`);


module.exports = {
  getVers,
  getContentByVer,
  enPrefix: '/en',
};
