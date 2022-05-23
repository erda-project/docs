export default {
  async processSuggestions(suggestions, queryString, queryTerms) {
    const isEn = window.location.pathname.split('/')[1] === 'en';
    const list = [];
    const map = {};
    suggestions.filter(a => {
      const curLocale = isEn ? a.path.startsWith('/en') : !a.path.startsWith('/en');
      const notInBlog = !a.path.startsWith('/blog/');
      return curLocale && notInBlog;
    }).forEach(item => {
      map[item.title] = (map[item.title] || []).concat(item);
    })
    function sortByVer(list) {
      const parentPageTitle = list[0].parentPageTitle;
      list[0].parentPageTitle = null;
      const nextVerItemIndex = list.findIndex(a => a.path.startsWith('/next/'));
      let nextVerItem;
      if (nextVerItemIndex !== -1) nextVerItem = list.splice(nextVerItemIndex, 1)[0];
      const newList = list.sort((s1, s2) => {
        let verA = +s1.path.split('/')[isEn ? 2 : 1];
        let verB = +s2.path.split('/')[isEn ? 2 : 1];
        return verB - verA;
      })
      newList[0].parentPageTitle = parentPageTitle;
      if (nextVerItem) {
        newList.push(nextVerItem);
      }
      return newList;
    }
    Object.keys(map).forEach(k => {
      list.push(...sortByVer(map[k]))
    })
    return list;
  },

  // async onGoToSuggestion(index, suggestion, queryString, queryTerms) {
  //   // e.g. create an analytics event

  //   // return true if you want to prevent default navigation
  //   return true
  // },
}
