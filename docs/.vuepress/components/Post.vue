<template>
  <div>
    <article class="blog-content" itemscope itemtype="https://schema.org/BlogPosting">
      <header class="blog-content-title">
        <!-- <h1 class="post-title" itemprop="name headline">
          {{ $frontmatter.title }}
        </h1> -->
        <PostMeta :tags="$frontmatter.tags" :author="$frontmatter.author" :date="$frontmatter.date" :location="$frontmatter.location" :category="$frontmatter.category" />
      </header>
      <Content itemprop="articleBody" />
      <footer>
        <!-- <Newsletter v-if="$service.email.enabled" /> -->
        <hr />
        <Comment />
      </footer>
    </article>
    <!-- <Toc /> -->
  </div>
</template>

<script>
// import Toc from '@theme/components/Toc.vue'
import PostMeta from "./PostMeta.vue";
import { Comment } from "@vuepress/plugin-blog/lib/client/components";

export default {
  name: "Post",
  components: {
    // Toc,
    PostMeta,
    Comment,
    // Newsletter: () => import('@theme/components/Newsletter.vue'),
  },
};
</script>

<style lang="stylus">
.blog-content {
  margin: 0 auto;
  font-size: 16px;
  letter-spacing: 0px;
  color: $textColor;

  img {
    max-width: 100%;
  }

  p {
    line-height: 1.75;
    letter-spacing: 0.8px;
  }
}

.blog-content-title {
  border-bottom: 1px solid $borderColor;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
</style>
