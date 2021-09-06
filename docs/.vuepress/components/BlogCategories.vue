<template>
  <ul class="blog-category-list">
    <li v-for="category in categoryList" :key="category.key" v-bind:class="[{ active: current === category.key }, 'blog-category-item']">
      <router-link :to="category.path">
        <span>{{categoryMap[category.key] || category.key}}</span>
        <!-- <span class="category-count">{{ category.pages.length }}</span> -->
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["categoryList"],

  computed: {
    current() {
      return this.$route.meta.id;
    },
    categoryMap() {
      return this.$themeConfig.categoryMap;
    },
  },
};
</script>

<style lang="stylus">
.blog-category-list {
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: 18px;
}

.blog-category-item {
  display: inline-block;
  margin-left: 3rem;

  a {
    display: inline-block;
    color: $textColor;
    border-bottom: 2px solid transparent;
  }

  &:first-child {
    margin-left: 0;
  }

  &.active a {
    padding: 4px 0;
    color: $activeColor;
    border-bottom: 2px solid $activeColor;
  }

  &:hover a {
    color: $activeColor;
  }
}

.category-count {
  display: inline-block;
  position: relative;
  top: -3px;
  padding: 0px 6px;
  font-size: 12px;
  background-color: #efefef;
  color: #333;
  border-radius: 100%;
}
</style>
