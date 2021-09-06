<template>
  <div class="blog-list">
    <BlogCategories :categoryList="categoryList" />
    <!-- <div v-if="categoryList" class="blog-tags">
      <BlogTag v-for="tag in tags" :key="tag.name" :tag="tag" />
    </div> -->
    <div class="post-list" itemscope>
      <article v-for="page in pages" :key="page.key" class="ui-post" itemprop="blogPost" itemscope itemtype="https://schema.org/BlogPosting">
        <meta itemprop="mainEntityOfPage" :content="page.path" />

        <header class="ui-post-title" itemprop="name headline">
          <CategoryLink :link="page.path">{{ page.title }}</CategoryLink>
        </header>

        <client-only v-if="page.excerpt">
          <!-- eslint-disable vue/no-v-html -->
          <p class="ui-post-summary" itemprop="description" v-html="page.excerpt" />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>
        <p v-else class="ui-post-summary" itemprop="description">
          {{ page.frontmatter.summary || page.summary }}
        </p>

        <footer>
          <div v-if="page.frontmatter.author" class="ui-post-meta ui-post-author" itemprop="publisher author" itemtype="http://schema.org/Person" itemscope>
            <iconpark-icon name="user"></iconpark-icon>
            <span itemprop="name">{{ page.frontmatter.author }}</span>
            <!-- <span v-if="page.frontmatter.location" itemprop="address">
              &nbsp; in {{ page.frontmatter.location }}
            </span> -->
          </div>

          <div v-if="page.frontmatter.date" class="ui-post-meta ui-post-date">
            <iconpark-icon name="time"></iconpark-icon>
            <time pubdate itemprop="datePublished" :datetime="page.frontmatter.date">
              {{ resolvePostDate(page.frontmatter.date) }}
            </time>
          </div>

          <div v-if="page.frontmatter.category" class="ui-post-meta ui-post-category">
            <PostCategory :category="page.frontmatter.category" />
          </div>

          <!-- <div v-if="page.frontmatter.tags" class="ui-post-meta ui-post-tag" itemprop="keywords">
            <iconpark-icon name="tag-one"></iconpark-icon>
            <router-link v-for="tag in resolvePostTags(page.frontmatter.tags)" :key="tag" :to="'/blog/tag/' + tag">
              {{ tag }}
            </router-link>
          </div> -->
        </footer>
      </article>
    </div>

    <component :is="paginationComponent" v-if="$pagination.length > 1 && paginationComponent"></component>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs/plugin/utc";
import {
  Pagination,
  SimplePagination,
} from "@vuepress/plugin-blog/lib/client/components";
import PostCategory from "./PostCategory.vue";
import CategoryLink from "./CategoryLink.vue";
import BlogCategories from "./BlogCategories.vue";

dayjs.extend(dayjsPluginUTC);

export default {
  components: {
    PostCategory,
    CategoryLink,
    BlogCategories,
  },

  data() {
    return {
      paginationComponent: null,
    };
  },

  computed: {
    pages() {
      return this.$pagination?.pages || [];
    },
    categoryList() {
      const categoryMap = this.$category?._metaMap;
      const all = {
        key: "post",
        name: "全部",
        path: "/blog/post/",
        scope: "category",
        pageKeys: [],
        pages: [],
      };
      const categoryList = (Object.keys(categoryMap) || []).map((k) => {
        const current = categoryMap[k];
        all.pageKeys.push(...current.pageKeys);
        all.pages.push(...current.pages);
        return {
          name: current.key,
          ...current,
          path: window.encodeURI(current.path),
        };
      });
      return [all, ...categoryList];
    },
  },

  created() {
    this.paginationComponent = this.getPaginationComponent();
  },

  methods: {
    getPaginationComponent() {
      const n = THEME_BLOG_PAGINATION_COMPONENT;
      if (n === "Pagination") {
        return Pagination;
      }

      if (n === "SimplePagination") {
        return SimplePagination;
      }

      return Vue.component(n) || Pagination;
    },

    resolvePostDate(date) {
      return dayjs
        .utc(date)
        .format(this.$themeConfig.dateFormat || "ddd YYYY-MM-DD");
    },

    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags;
      return [tags];
    },
  },
};
</script>

<style lang="stylus">
.post-list {
  margin-top: 4rem;
}

.ui-post {
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid $borderColor;

  &:last-child {
    border-bottom: 0px;
    margin-bottom: 0px;
  }
}

.ui-post-title {
  font-size: 28px;
  border-bottom: 0;

  a {
    cursor: pointer;
    color: $darkTextColor;
    transition: all 0.2s;
  }
}

.ui-post-summary {
  font-size: 14px;
  color: rgba($darkTextColor, 0.54);
  font-weight: 200;
}

.ui-post-meta {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  line-height: 14px;

  &:not(:last-child) {
    margin-bottom: 3px;
    margin-right: 20px;
  }

  svg {
    margin-right: 5px;
    width: 14px;
    height: 14px;
  }

  @media (max-width: $MQMobile) {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.ui-post-author {
  color: rgba($darkTextColor, 0.54);
  font-weight: 400;
}

.ui-post-date {
  color: rgba($darkTextColor, 0.54);
  font-weight: 200;
}

.ui-post-tag, .ui-post-category {
  color: rgba($darkTextColor, 0.54);
  font-weight: 200;

  a {
    color: inherit;
    font-weight: 200;
    text-decoration: none;
    margin-right: 5px;

    &:hover {
      color: $activeColor;
    }
  }
}
</style>
