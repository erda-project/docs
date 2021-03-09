<template>
  <footer>
    <div class="col" v-for="group in list">
      <div class="group-header">
        <h3>{{group.title}}</h3>
      </div>
      <ul class="list-icons">
        <li v-for="item in group.children">
          <i aria-label="icon: doc" class="iconfont dice-doc"></i>
          <RouterLink :to="item.link">
            {{ item.text }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",

  data() {
    return {
      list: [
        {
          title: "分组1",
          children: [
            {
              text: "介绍",
              link: "/manual/production-intro"
            },
            {
              text: "文章2",
              link: "./1212"
            },
            {
              text: "文章3",
              link: "./1212"
            },
            {
              text: "文章4",
              link: "./1212"
            }
          ]
        },
        {
          title: "分组2",
          children: [
            {
              text: "文章6",
              link: "./1212"
            },
            {
              text: "文章6",
              link: "./1212"
            },
            {
              text: "文章6",
              link: "./1212"
            },
            {
              text: "文章6",
              link: "./1212"
            }
          ]
        },
        {
          title: "分组3",
          children: [
            {
              text: "文章6",
              link: "./1212"
            },
            {
              text: "文章6",
              link: "./1212"
            },
            {
              text: "文章6",
              link: "./1212"
            },
            {
              text: "文章6",
              link: "./1212"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="stylus">

// @media (max-width: $MQMobile) {
// }
</style>
