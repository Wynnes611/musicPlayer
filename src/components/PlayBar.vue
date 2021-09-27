 
<template>
  <!-- <footer class="playbar" :class="{ playing: playing }"> -->
  <section
    class="playbar"
    :class="{ playing: playing }"
    @click="$emit('toggle-show-play-page', true)"
  >
    <img
      :src="`${
        currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
      }?imageView=1&type=webp&thumbnail=80x0`"
      alt=""
    />
    <h3>
      {{ currentSong.name }}
      <span>
        -
        {{
          currentSong.song
            ? currentSong.song.artists[0].name
            : currentSong.ar[0].name
        }}</span
      >
    </h3>
    <div class="progress" @click.stop="$emit('toggle-playing-state')">
      <i :class="[playing ? 'fa-pause' : 'fa-play', 'fas']"></i>
      <canvas width="40px" height="40px" ref="canvas"></canvas>
    </div>
    <i
      class="fas fa-list"
      @click.stop="$emit('toggle-show-play-list', true)"
    ></i>
  </section>
  <!-- </footer> -->
</template>
<script>
export default {
  props: {
    currentSong: Object,
    playing: Boolean,
    duration: Number,
    currentTime: Number,
    currentPlayList: Array,
  },
  computed: {
    percentage: function () {
      return this.currentTime / this.duration;
    },
  },
  watch: {
    percentage: function (n) {
      var context = this.$refs.canvas.getContext("2d");
      context.clearRect(0, 0, 40, 40);
      context.lineWidth = 1.5;

      context.beginPath();
      context.arc(
        20,
        20,
        15.3,
        (Math.PI / 180) * (0 - 90),
        (Math.PI / 180) * (360 - 90)
      );
      context.strokeStyle = "#ddd";

      context.stroke();

      context.beginPath();
      context.arc(
        20,
        20,
        15.3,
        (Math.PI / 180) * (0 - 90),
        (Math.PI / 180) * (360 * n - 90)
      );
      context.strokeStyle = "#d43c33";
      context.stroke();
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes slide {
  from {
    bottom: -20px;
  }
  to {
    bottom: 0px;
  }
}

.playbar {
  width: 100%;
  height: 47px;
  background: #fff;
  position: fixed;
  bottom: -1px;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0px -1px 15px rgba(114, 114, 114, 0.13);

  .progress {
    position: relative;
    width: 40px;
    height: 40px;
    .fas {
      position: absolute;
      left: calc(0px - 3px / 2 - 14px / 2);
      top: calc(20px - 14px / 2);
    }
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    animation: slide 1s ease-out;
  }
  h3 {
    padding: 0 8px;
    flex: 1;
    font-size: 14px;
    color: #000;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      color: rgb(122, 122, 122);
      font-size: 9px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    animation: rotate 10s linear infinite;
    animation-play-state: paused;
  }
  &.playing {
    img {
      animation-play-state: running;
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>