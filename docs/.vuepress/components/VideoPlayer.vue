<template>
  <div class="player-container">
    <vue-core-video-player @loadedmetadata="loaded" @play="playFunc" @pause="pauseFunc" v-bind="$attrs"></vue-core-video-player>
  </div>
</template>

<script>
import Vue from "vue";
import CorePlayer from "vue-core-video-player";

Vue.use(CorePlayer, {
  lang: "zh-CN",
});

export default {
  name: "video-player",
  methods: {
    loaded() {
    },
    playFunc() {
      document.querySelector(".play-pause-layer").style.display = "none";
    },
    pauseFunc() {
      document.querySelector(".play-pause-layer").style.display = "none";
    },
  },
  mounted() {
    import("vue-core-video-player").then((module) => {
      Vue.use(module.default, {
        lang: "zh-CN",
      });
    });
  },
};
</script>
