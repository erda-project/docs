<template>
  <div class="post-meta">
    <div
      v-if="author"
      class="post-meta-author"
      itemprop="publisher author"
      itemtype="http://schema.org/Person"
      itemscope
    >
      <iconpark-icon name="user"></iconpark-icon>
      <span itemprop="name">{{ author }}</span>
      <!-- <span v-if="location" itemprop="address"> &nbsp; in {{ location }}</span> -->
    </div>
    <div v-if="date" class="post-meta-date">
      <iconpark-icon name="time"></iconpark-icon>
      <time pubdate itemprop="datePublished" :datetime="date">
        {{ resolvedDate }}
      </time>
    </div>
    <div v-if="category">
      <PostCategory :category="category" />
    </div>
    <!-- <ul v-if="tags" class="post-meta-tags" itemprop="keywords">
      <PostTag v-for="tag in resolvedTags" :key="tag" :tag="tag" />
    </ul> -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'
// import PostTag from './PostTag.vue'
import PostCategory from './PostCategory.vue'

dayjs.extend(dayjsPluginUTC)

export default {
  name: 'PostMeta',
  components: {  PostCategory },
  props: {
    tags: {
      type: [Array, String],
    },
    author: {
      type: String,
    },
    date: {
      type: String,
    },
    location: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  computed: {
    resolvedDate() {
      return dayjs
        .utc(this.date)
        .format(this.$themeConfig.dateFormat || 'YYYY-MM-DD')
    },
    resolvedTags() {
      if (!this.tags || Array.isArray(this.tags)) return this.tags
      return [this.tags]
    },
  },
}
</script>

<style lang="stylus">
.post-meta
  &-tags
    display flex
    flex-wrap wrap
    list-style none
    overflow hidden
    padding 0
    margin 20px 0

    > li
      margin-bottom 10px

  > div
    display inline-flex
    line-height 14px
    font-size 14px
    margin-right 20px

  svg
    margin-right 5px
    width 14px
    height 14px
</style>
