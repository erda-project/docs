<template>
  <div class="theme-container blog-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <div class='blog-header-image' :style="{backgroundImage: `url(${this.headerImage})`}" alt="header-image">
    </div>
    <BlogNavbar v-if="shouldShowNavbar" />

    <!-- <Carousel class='top-imgs' autoplay autoplayHoverPause :perPage='1' :paginationSize='12'>
      <Slide v-bind:key="img" v-for="img in this.topImgs">
        <img :src="img" alt="">
      </Slide>
    </Carousel> -->
    <div class="blog-layout">
      <h1 class="blog-header-title">{{headerTitle}}</h1>

      <ClientOnly>
        <BlogTags v-if="$route.path ==='/blog/'" :tags="$frontmatterKey.list" />
        <BlogList v-else-if="$pagination" />
        <Post v-else />
      </ClientOnly>
    </div>

    <router-link v-if="$route.path !=='/blog/post/'" to="/blog/post/">
      <svg class="blog-go-to-home" width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="42" height="42" fill="white" fill-opacity="0.01" />
        <path d="M9 18V42H39V18L24 6L9 18Z" fill="none" />
        <path d="M9 42V18L4 22L24 6L44 22L39 18V42H9Z" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" />
        <path d="M19 29V42H29V29H19Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="miter" />
        <path d="M9 42H39" stroke="currentColor" stroke-width="4" stroke-linecap="butt" />
      </svg>
    </router-link>
  </div>
</template>

<script>
// import { Carousel, Slide } from "vue-carousel";

export default {
  name: "Blog-Layout",

  components: {
    // Carousel,
    // Slide,
  },

  data() {
    return {
      isSidebarOpen: false,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    headerTitle() {
      const { title } = this.$page.frontmatter;
      if (title === "Post") return "博客";
      const category = /^(\w+) Category$/.exec(title);
      if (category && this.$themeConfig.categoryMap[category[1]]) {
        return this.$themeConfig.categoryMap[category[1]];
      }
      return title;
    },

    headerImage() {
      return (
        this.$page.frontmatter.image ||
        "https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/501dbea9-7fd8-460b-978c-0f8fb954b5b5.png"
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
        },
        userPageClass,
      ];
    },
  },

  methods: {
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>

<style lang="stylus">
.blog-layout {
  font-family: pingfang SC, helvetica neue, arial, 'microsoft yahei ui', 'microsoft yahei', sans-serif;
  padding: 50px 15px 80px 15px;
  min-height: calc(100vh - 80px - 60px - 50px);
  max-width: 800px;
  margin: 360px auto 0;

  .search-box .suggestion a {
    color: $activeColor;
  }
}

.blog-header-image {
  width: 100%;
  height: 360px;
  position: absolute;
  top: 0;
  background-position: center;
  background-size: contain;
}

.blog-header-title {
  position: absolute;
  top: 120px;
  max-width: 800px;
  color: #eee;
  letter-spacing: 2px;
}

.blog-go-to-home {
  cursor: pointer;
  position: fixed;
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  padding: 0.5rem;
  background: #f8f8f8;
  bottom: 10rem;
  left: calc(50% - 520px);
  font-size: 24px;
  color: #777;
  z-index: 1;

  &:hover {
    color: $activeColor;
    background: #efefef;
  }
}

.blog-container + .global-ui {
  .go-to-top {
    height: 24px;
    width: 24px;
    bottom: 6rem;
    border-radius: 100%;
    padding: 12px;
    color: #777;
    background: #f8f8f8;
    left: calc(50% - 520px);

    &:hover {
      color: $activeColor;
      background: #efefef;
    }
  }
}
</style>
