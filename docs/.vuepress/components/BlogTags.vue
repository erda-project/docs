<template>
  <div class="blog-tags">
    <BlogTag v-for="tag in tags" :key="tag.name" :tag="tag" />
  </div>
</template>

<script>
import BlogTag from "./BlogTag.vue";

export default {
  components: { BlogTag },

  props: ["tags"],
};
</script>

<style lang="stylus">
.blog-tags {

  a {
    border: 1px solid $borderColor;
  }
}

</style>
