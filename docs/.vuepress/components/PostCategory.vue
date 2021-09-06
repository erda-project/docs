<template>
  <router-link class="post-category" :to="'/blog/' + category">
    <iconpark-icon name="folder-close"></iconpark-icon>
    <span>{{ categoryMap[category] || category }}</span>
  </router-link>
</template>

<script>
export default {
  name: "PostCategory",
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  computed: {
    categoryMap() {
      return this.$themeConfig.categoryMap;
    },
  },
};
</script>

<style scoped lang="stylus">
.post-category {
  display inline-flex
  align-items center
  color: unset;

  &:hover {
    color: $activeColor;
  }
}
</style>
