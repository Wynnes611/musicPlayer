<template>
  <section class="play-list">
    <div
      class="mask animate_animated animate__fadeIn"
      @click.stop="$emit('toggle-show-play-list',false)"
    ></div>
    <div class="swiper animate_animated animate__slideInUp">
      <div class="card">
        <ul class="list">
          <songListItem
            v-for="(item, index) in currentPlayList"
            :key="item.id"
            :item="item"
            :currentSongId="currentSong.id"
            :playing="playing"
            @change-current-song="$emit('change-current-song', $event)"
            >{{ (index + 1).toString().padStart(2, "0") }}</songListItem
          >
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import songListItem from "@/components/songListItem.vue";
export default {
  components: {
    songListItem,
  },
  props: {
    showPlayList: Boolean,
    currentPlayList: Array,
    currentSong:Object,
    playing:Boolean
  },
};
</script>

<style lang="less" scoped>
.play-list {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .mask {
    // z-index: 99999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
  }
  .swiper {
    width: 100vw;
    height: 60vh;
    position: absolute;
    left: 0;
    bottom: 20px;
    padding: 0 10px;
    .card {
      background: #fff;
      height: 100%;
      overflow-y: auto;
      border-radius: 15px;
      padding: 10px 0;
      ul.list {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>