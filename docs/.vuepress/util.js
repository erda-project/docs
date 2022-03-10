const { path } = require('@vuepress/shared-utils')
const requireContext = require('require-context');


const context = requireContext(path.resolve(__dirname, './sidebar/vers'), false, /\.js$/);
const versLimit = 2;
const getVers = () => {
  return context.keys()
    .filter(a => !a.includes('-en'))
    .map(a => a.slice(0, 3))
    .sort((a, b) => b - a)
    .slice(0, versLimit);
}
const getContentByVer = ver => context(`${ver}.js`);


module.exports = {
  getVers,
  getContentByVer,
  enPrefix: '/en',
};
