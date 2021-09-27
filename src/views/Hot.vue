<template>
  <div class="about" @scroll="scroll">
    <section class="bg">
      <div class="hottime">更新时间：{{ time }}</div>
    </section>

    <ul v-if="detail">
      <songListItem
        v-for="(item, index) in hotLis"
        :key="index"
        :item="item"
        @change-current-song="
          $emit('change-current-song', item);
          $emit('change-current-play-list', hotLis);
        "
        :currentSongId="currentSongId"
        :playing="playing"
        :class="{ lt3: index < 3 }"
        >{{ index + 1 }}</songListItem
      >
    </ul>
    <ul v-if="loading">
      <li class="loading">
        <span
          style="
            margin-left: -30px;
            padding-right: 11px;
            vertical-align: middle;
          "
          >正在加载</span
        >
        <ul class="la-ball-newton-cradle">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import songListItem from "@/components/songListItem.vue";
export default {
  components: {
    songListItem,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  data: function () {
    return {
      detail: null,
      page: 0,
      time: "",
      hotLis: [],
      loading: false,
    };
  },
  methods: {
    scroll: function (event) {
      if (
        Math.ceil(event.target.offsetHeight + event.target.scrollTop) ===
          event.target.scrollHeight ||
        Math.floor(event.target.offsetHeight + event.target.scrollTop) ===
          event.target.scrollHeight
      ) {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          for (let i = 0; i < this.page * 10; i++) {
            this.hotLis.push(this.detail[i]);
          }
          console.log("触底");
        }, 1500);
        this.loading = false;
      }
    },

    getPlayListDetail: function (id) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.axios
          .get("/playlist/detail", {
            params: {
              id,
            },
          })
          .then((res) => {
            this.detail = res.data.playlist.tracks;
            this.page++;
            for (let i = 0; i < this.page * 10; i++) {
              this.hotLis.push(this.detail[i]);
            }
            var date = res.data.playlist.updateTime;
            var nowDateMilliSecond = Date.now();
            var now = new Date();
            var NMonth = now.getMonth() + 1;
            var NDate = now.getDate();
            var gap = nowDateMilliSecond - date;
            var gapDayCount = gap / 3600000 / 24;
            if (gapDayCount < 1) {
              this.time =
                NMonth.toString().padStart(2, "0") +
                "年" +
                NDate.toString().padStart(2, "0") +
                "日" +
                (gapDayCount.toFixed(1) * 10).toString().padStart(2, "0") +
                "小时前";
            } else if (gapDayCount > 1) {
              let gapday = gapDayCount.toFixed(0);
              this.time =
                NMonth.toString().padStart(2, "0") +
                "月" +
                (NDate - gapday).toString().padStart(2, "0") +
                "日" +
                (gapDayCount.toFixed(1) * 10).toString().padStart(2, "0") +
                "小时前 ";
            }
          });
      }, 1500);
    },
  },
  created: function () {
    this.getPlayListDetail(3778678);
  },
};
</script>

<style lang="less" scoped>
.about {
  margin-top: 11px;
  .bg {
    width: 100%;
    height: 162px;
    background: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_3x.jpg?2bfefd3ba37eaffbd66b7d108b9de26a=");
    background-size: cover;
    filter: saturate(0.9);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 20px;
    &::before {
      content: "";
      display: block;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat;
      background-size: 166px 97px;
      background-position: -24px -30px;
      width: 166px;
      height: 75px;
    }
    .hottime {
      color: #fff;
      font-size: 11.5px;
    }
  }
  .loading {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 50px;
    font-size: 0.8rem;
    font-family: monospace;
    font-weight: bolder;
    // background-color: #fec54f;
    .la-ball-newton-cradle,
    .la-ball-newton-cradle > li {
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    .la-ball-newton-cradle {
      display: block;
      font-size: 0;
      color: #d43c33;
      width: 28px;
      height: 10px;
      margin-top: 5px;
    }
    .la-ball-newton-cradle.la-dark {
      color: #333;
    }
    .la-ball-newton-cradle > li {
      display: inline-block;
      float: none;
      background-color: currentColor;
      border: 0 solid currentColor;
      width: 7px;
      height: 7px;
      border-radius: 100%;
    }
    .la-ball-newton-cradle > li:first-child {
      -webkit-transform: translateX(0%);
      -moz-transform: translateX(0%);
      -ms-transform: translateX(0%);
      -o-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-animation: ball-newton-cradle-left 1s 0s ease-out infinite;
      -moz-animation: ball-newton-cradle-left 1s 0s ease-out infinite;
      -o-animation: ball-newton-cradle-left 1s 0s ease-out infinite;
      animation: ball-newton-cradle-left 1s 0s ease-out infinite;
    }
    .la-ball-newton-cradle > li:last-child {
      -webkit-transform: translateX(0%);
      -moz-transform: translateX(0%);
      -ms-transform: translateX(0%);
      -o-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-animation: ball-newton-cradle-right 1s 0s ease-out infinite;
      -moz-animation: ball-newton-cradle-right 1s 0s ease-out infinite;
      -o-animation: ball-newton-cradle-right 1s 0s ease-out infinite;
      animation: ball-newton-cradle-right 1s 0s ease-out infinite;
    }
    @keyframes ball-newton-cradle-left {
      25% {
        -webkit-transform: translateX(-100%);
        -moz-transform: translateX(-100%);
        -o-transform: translateX(-100%);
        transform: translateX(-100%);
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
        -o-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }
      50% {
        -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -o-transform: translateX(0%);
        transform: translateX(0%);
      }
    }
    @keyframes ball-newton-cradle-right {
      50% {
        -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -o-transform: translateX(0%);
        transform: translateX(0%);
      }
      75% {
        -webkit-transform: translateX(100%);
        -moz-transform: translateX(100%);
        -o-transform: translateX(100%);
        transform: translateX(100%);
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
        -o-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }
      100% {
        -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -o-transform: translateX(0%);
        transform: translateX(0%);
      }
    }
  }
}
</style>