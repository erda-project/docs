<template>
  <div class="homepage-links">
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
  </div>
</template>

<script>
export default {
  name: "HomeLink",

  mounted() {
    console.log("this.$site:", this.$site);
    const groupMap = {};
    this.$site.pages
      .filter(p => p.path.startsWith("/manual"))
      .map(p => {
        const [, , group, article] = p.path.split("/");
        groupMap[group] = groupMap[group] || [];
        groupMap[group].push(p);
      });
    const groups = Object.keys(groupMap).map(k => {
      return {
        title: groupMap[k][0].title,
        children: groupMap[k]
      };
    });
    console.log("groupMap:", groups);
  },

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
.homepage-links {
  padding: $navbarHeight 2rem 0;
  max-width: 880px;
  margin: 0px auto;
  display: flex;

  .col {
    flex: 1;
  }

  .group-header {
    border-bottom: 1px solid #dedede;
    padding-bottom: 1em;

    h3 {
      margin-top: 0;
      margin-bottom: 0;
      color: #444;
      font-size: 18px;
      font-weight: 700;
    }
  }

  ul {
    padding: 0 14px 0 0;

    li {
      width: 100%;
      font-size: 14px;
      margin: 0;
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .fake-link {
    color: #5d48df;
    cursor: pointer;
  }
}

@media (max-width: $MQMobile) {
  .homepage-links {
    flex-direction: column;
  }
}
</style>
