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
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
// import _ from 'lodash'
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
      privileges:"",
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
          for (let i = this.page; i < this.page * 5; i++) {
            this.hotLis.push(this.detail[i]);
            // console.log(this.page);
          }
          console.log("触底");
          this.loading = false;
        }, 1500);
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
            this.privileges = res.data.privileges;
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
                "月" +
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
}
.loading{
            width: 150px;
            height: 15px;
            margin: 0 auto;
            margin-top:100px;
        }
        .loading span{
            display: inline-block;
            width: 15px;
            height: 100%;
            margin-right: 5px;
            background: lightgreen;
            -webkit-transform-origin: right bottom;
            -webkit-animation: load 1s ease infinite;
        }
        .loading span:last-child{
            margin-right: 0px; 
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
                -webkit-transform: scale(1);
            }
            100%{
                opacity: 0;
                -webkit-transform: rotate(90deg) scale(.3);
            }
        }
        .loading span:nth-child(1){
            -webkit-animation-delay:0.13s;
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.26s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.39s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.52s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:0.65s;
        }
</style>