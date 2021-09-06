<template>
  <li class="post-tag">
    <router-link :to="'/blog/tag/' + tag">
      <span>{{ tag }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'PostTag',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">
.post-tag
    height 26px

  &:not(:last-child)
    margin-right 10px

  a
    background-color #ededed
    border-radius 3px 0 0 3px
    padding 0 20px 0 23px
    position relative
    text-decoration none
    height 26px
    display inline-block

    span
      color $postTagColor
      transition color 0.2s

    &:before
      position absolute
      left 10px
      top 10px
      background #fff
      border-radius 50%
      box-shadow inset 0 1px rgba(0, 0, 0, 0.25)
      content ''
      height 6px
      width 6px

    &:after
      position absolute
      right 0
      top 0
      background #fff
      border-bottom 13px solid transparent
      border-left 10px solid #ededed
      border-top 13px solid transparent
      content ''

    &:hover
      background-color #b9b0f0

      &:after
        border-left-color #b9b0f0

      span
        color #fff
</style>
