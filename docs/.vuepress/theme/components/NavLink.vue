<template>
  <RouterLink v-if="isInternal" class="nav-link inter" :to="link" :exact="exact" @focusout.native="focusoutAction">
    {{ item.text }}
  </RouterLink>
  <a v-else :href="link" class="nav-link external" :target="target" :rel="rel" @focusout="focusoutAction">
    {{ item.text }}
    <!-- 外部跳转链接图标，为保持导航栏一致，暂时注释 -->
    <!-- <OutboundLink v-if="isBlankTarget" /> -->
  </a>
</template>

<script>
import {
  isExternal,
  isMailto,
  isTel,
  ensureExt,
  replaceVersion,
  versionRE,
} from "../util";

let patched = false;

export default {
  name: "NavLink",

  props: {
    item: {
      required: true,
    },
  },

  data() {
    return {
      pathname: this.$localePath,
    };
  },

  mounted() {
    if (!patched) {
      patched = true;
      var pushState = history.pushState;
      history.pushState = (...args) => {
        pushState.call(history, ...args);
        this.pathname = args[2];
      };
    }
    this.pathname = window && window.location.pathname.replace('/en', '');
  },

  computed: {
    link() {
      const link = ensureExt(this.item.link);
      // 替换为当前版本的链接前缀
      if (link.includes("{version}")) {
        const [empty, first] = this.pathname.split("/");
        const vers = this.$themeConfig.nav.find(
          (nav) => nav.text === "版本"
        ).items.filter(v => v.version && !v.version.includes('next'));
        // 如果当前链接不以版本开头，使用第一个版本
        const _ver = versionRE.test(this.pathname) ? first : vers[0].version;
        return link.replace("{version}", _ver);
      }
      // 某些版本内部文档地址不一致，切换时强制跳到该版本首页
      // if (this.item.forceToIndex) {
        // return this.item.link;
      // }
      // 替换为要替换版本的链接前缀
      // if (this.item.version) {
      //   return replaceVersion(this.pathname, this.item.version, this.item.link);
      // }
      return link;
    },

    exact() {
      if (this.item.version) {
        return false;
      }
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          (rootLink) => rootLink === this.link
        );
      }
      return this.link === "/";
    },

    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link);
    },

    isBlankTarget() {
      return this.target === "_blank";
    },

    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget;
    },

    target() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.item.target) {
        return this.item.target;
      }
      return isExternal(this.link) ? "_blank" : "";
    },

    rel() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.item.rel) {
        return this.item.rel;
      }
      return this.isBlankTarget ? "noopener noreferrer" : "";
    },
  },

  methods: {
    focusoutAction() {
      this.$emit("focusout");
    },
  },
};
</script>
