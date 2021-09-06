<template>
  <div class="homepage-links">
    <router-link class="home-link" to="/latest/manual/" exact>
      <div class="entry">使用手册</div>
    </router-link>
    <router-link class="home-link" to="/blog/post" exact>
      <div class="entry">博客</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomeLink",

  mounted() {
    const groupMap = {};
    this.$site.pages
      .filter((p) => p.path.startsWith("/manual"))
      .map((p) => {
        const [, , group, article] = p.path.split("/");
        groupMap[group] = groupMap[group] || [];
        groupMap[group].push(p);
      });
    const groups = Object.keys(groupMap).map((k) => {
      return {
        title: groupMap[k][0].title,
        children: groupMap[k],
      };
    });
  },

};
</script>

<style lang="stylus">
.homepage-links {
  padding: $navbarHeight 2rem 0;
  max-width: 880px;
  margin: 0px auto;
  display: flex;
  justify-content: space-around;
  font-family: PingFangSC-Regular, serif;

  .entry {
    width: 20rem;
    height: 12rem;
    border: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9687bb;
    font-size: 28px;
    cursor: pointer;
    transition: all 0.1s ease-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    &:hover {
      color: $activeColor;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }
  }
}
</style>
