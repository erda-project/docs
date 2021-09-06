<template>
  <section :class="['side-anchor', hover ? '':'out']" @mouseover="hover = true" @mouseleave="hover = false">
    <ul v-show="list.length > 0">
      <li v-for="(item, index) in list" :key="index" :style="{ 'padding-left': item.prefix }">
        <a :href="item.href" :class="['side-anchor-link', { 'active': index === activeIndex }]">
          <span :style="{ 'font-weight': item.level>0 ? '400':'700' }">{{ item.content }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import debounce from "lodash.debounce";
import Vue from "vue";
export default {
  data() {
    return {
      title: "",
      activeIndex: 0,
      list: [],
      hover: true,
    };
  },

  methods: {
    getAnchorList() {
      if (this.$page.title === this.title && this.list.length > 0) return;
      this.title = this.$page.title;

      let dom_list = document.querySelectorAll(".header-anchor");
      if (dom_list.length === 0) {
        this.list = [];
        return;
      }

      let baseLine = Number(dom_list[0].parentNode.tagName.slice(1));
      let list = Array().map.call(dom_list, (value) => ({
        content: value.parentNode.innerText.slice(1),
        href: value.href,
        level: value.parentNode.tagName.slice(1) - baseLine,
        prefix: (value.parentNode.tagName.slice(1) - baseLine) * 0.7 + "rem",
        offsetTop: value.parentNode.offsetTop,
        active: false,
      }));

      this.list = list;
    },

    freshAnchor() {
      if (document.title !== this.title) this.getAnchorList();

      let scrollTop = window.pageYOffset;
      let innerhHeight = window.innerHeight;
      let scope = [scrollTop, scrollTop + innerhHeight / 3];
      let middleLine = scrollTop + innerhHeight / 2;
      let list = this.list;
      let nextActive = -1;
      list.forEach((value, index) => {
        if (
          nextActive === -1 &&
          value.offsetTop > scope[0] &&
          value.offsetTop < scope[1]
        )
          nextActive = index;
        if (nextActive === -1 && middleLine < value.offsetTop)
          nextActive = index - 1;
      });
      if (nextActive === -1 || this.activeIndex === nextActive) return;
      list.forEach((value) => (value.active = false));
      list[nextActive].active = true;
      this.activeIndex = nextActive;
    },
  },

  mounted() {
    this.title = this.$page.title;
    window.onload = this.getAnchorList;
    window.onscroll = debounce(this.freshAnchor);
    setTimeout(() => {
      this.hover = false;
    }, 2000);
  },

  watch: {
    "$page.path.title": {
      handler: function () {
        Vue.nextTick(this.getAnchorList);
      },
      deep: true,
    },
  },
};
</script>

<style lang="stylus">
.side-anchor {
  position: fixed;
  right: 2rem;
  top: 150px;
  z-index: 1;
  min-width: 13rem;
  max-width: 25rem;
  max-height: calc(100% - 190px);
  overflow: auto;
  border-left: 0.2rem $activeColor solid;
  font-size: 14px;
  font-weight: 500;
  transition: max-height 0.25s;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: opacity 0.3s ease-out;
  box-shadow: -2px 0px 10px 0px $borderColor;
}

.side-anchor.out {
  opacity: 0.3;
  transition: opacity 5s ease-out;
}

.side-anchor ul {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
}

.side-anchor ul li {
  padding: 2px 0;
}

ul .side-anchor-link {
  text-decoration: none;
  color: black;
}

ul .side-anchor-link:hover {
  color: $activeColor;
}

.side-anchor-link.active {
  color: $activeColor;
}

.side-anchor::-webkit-scrollbar {
  width: 0;
}
</style>
