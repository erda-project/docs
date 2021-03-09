<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>这里空无一物</blockquote>

      <RouterLink :to="home">
        回到首页
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { versionRE } from "../util";

export default {
  data() {
    return {
      home: "/"
    };
  },

  mounted() {
    const [empty, ver] = window ? window.location.pathname.split("/") : [];
    const vers = this.$themeConfig.nav.find(nav => nav.text === "版本").items;
    this.home = versionRE.test(ver) ? ver : vers[0].link;
  },

};
</script>
