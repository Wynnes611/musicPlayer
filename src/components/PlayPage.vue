<template>
  <section class="play-page">
    <div
      class="mask"
      :style="{
        backgroundImage: `url(${
          currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
        }?imageView=1&type=webp&thumbnail=246x0)`,
      }"
    ></div>
    <nav>
      <img
        src="../assets/back.png"
        @click="$emit('toggle-show-play-page', false)"
        class="backBtn"
      />
      <div class="text">
        <div class="h1Content">
          <div class="h1c" :title="currentSong.name">
            <h1>{{ currentSong.name }}</h1>
          </div>
        </div>
        <p v-if="currentSong.ar">
          <span v-for="(item, index) in currentSong.ar" :key="index">{{
            item.name + " "
          }}</span>
        </p>
        <p v-else-if="currentSong.song.artists">
          {{ currentSong.song.artists[0].name }}
        </p>
      </div>
    </nav>
    <div class="container">
      
      <section
        class="rotate"
        v-if="!showLyric"
        @click.prevent="showLyric = true"
      >
        <img
          class="needle"
          :class="{ pause: !playing }"
          src="https://s3.music.126.net/mobile-new/img/needle-ab.png"
          alt=""
        />
        <section class="record" :class="{ playing: playing }">
          <img
            class="thumb"
            :src="currentSong.song ? currentSong.picUrl : currentSong.al.picUrl"
            alt=""
          />
          <img
            class="disc"
            src="https://s3.music.126.net/mobile-new/img/disc.png"
            alt=""
          />
        </section>
      </section>
      <div
        class="lyricContainer"
        :class="{ opac: !showLyric }"
        @click.prevent="showLyric = false"
      >
        <section class="lyric">
          <ul
            class="lyricList"
            ref="lyricList"
            v-if="parsedLyric.length"
            :style="{ marginTop: -scrollHeight + 'px' }"
          >
            <li
              v-for="(l, i) in parsedLyric"
              :key="i"
              :class="{ active: currentLyricIndex === i }"
            >
              {{ l.text }}
            </li>
          </ul>
        </section>
      </div>
      <section class="progress">
        <span class="currentTime">{{ crt() }}</span>
        <span class="durationTime">{{ drt() }}</span>
        <input
          type="range"
          :max="duration"
          step="0.1"
          v-model="value"
          @change="progressChange"
          @input="progressInput"
        />
        <span
          class="bar"
          :style="{
            width: (value / duration) * 100 + '%',
          }"
        ></span>
      </section>

      <section class="controls">
        <img
          src="../assets/loop.png"
          @click="$emit('toggle-play-model')"
          alt=""
        />
        <img src="../assets/prevSong.png" @click="$emit('prev-song')" alt="" />
        <img
          src="../assets/pause.png"
          @click.stop="$emit('toggle-playing-state')"
          v-if="playing"
        />
        <img
          src="../assets/play.png"
          @click.stop="$emit('toggle-playing-state')"
          v-else
        />
        <img
          class="fanzhuan"
          src="../assets/prevSong.png"
          @click="$emit('next-song')"
        />
        <img
          class="fanzhuan"
          src="../assets/listBtn.png"
          @click.stop="$emit('toggle-show-play-list', true)"
          alt=""
        />
      </section>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currentSong: Object,
    playing: Boolean,
    duration: Number,
    currentTime: Number,
  },
  data: function () {
    return {
      value: this.currentTime,
      inputing: false,
      showLyric: false,
      lyric: null,
      lyricLiHeight: [],
      scrollHeight: 0,
      h1Width: 0,
      detail: [],
    };
  },
  watch: {
    currentTime: function (n) {
      if (!this.inputing) {
        this.value = n;
        // console.log('currentTime',this.currentTime)
      }
    },
    currentLyricIndex: function (index) {
      // console.log(index,this.$refs.lyricList);
      // var list = this.$refs.lyricList
      //   ? this.$refs.lyricList.querySelectorAll("li")
      //   : null;
      var prevTotalHeight = this.lyricLiHeight
        .slice(0, index)
        .reduce(function (total, item) {
          return total + item;
        }, 0);
      console.log(prevTotalHeight);
      prevTotalHeight = prevTotalHeight > 200 ? prevTotalHeight - 200 : 0;
      this.scrollHeight = prevTotalHeight;
    },
    parsedLyric: function () {
      this.$nextTick(() => {
        //  console.log('nextTick',this.$refs.lyricList);
        var list = this.$refs.lyricList.querySelectorAll("li");
        this.lyricLiHeight = [...list].map((item) => item.offsetHeight);
        var h1Dom = document.querySelector(".h1Content h1");
        h1Dom.style.MarginLeft = h1Dom.offsetWidth;
        // console.log("h1Dom", h1Dom.offsetWidth);
      });
    },
    "currentSong.id": function () {
      //   //   this.axios.get('/lyric',{
      //   //     params:{
      //   //       id:
      //   //     }
      //   // })
      this.$nextTick(() => {
        this.getTitleWidth();
      });
    },
  },
  created: function () {
    this.getLyric(this.currentSong.id);
  },
  updated: function () {
    this.$nextTick(() => {
      this.getTitleWidth();
    });
  },
  methods: {
    crt: function () {
      // var str = ((this.currentTime / 10).toFixed(1)).split(".").join(":");
      var crtstr = (this.currentTime / 60)
        .toFixed(1)
        .split(".");
       var crtstr2 = crtstr[0].padStart(2,"0")
       var crtstr3 = crtstr[1].padStart(2,"0")
      return crtstr2+":"+crtstr3;
      
    },
    drt: function () {
      // var str = ((this.currentTime / 10).toFixed(1)).split(".").join(":");
      var drtstr = (this.duration / 60)
        .toFixed(1)
        .split(".");
       var drtstr2 = drtstr[0].padStart(2,"0")
       var drtstr3 = drtstr[1].padStart(2,"0")
      return drtstr2+":"+drtstr3;
      
    },

    progressChange: function (event) {
      this.inputing = false;
      // console.log(event.target.value);
      this.$emit("current-time-change", event.target.value);
    },
    progressInput: function () {
      this.inputing = true;
    },
    getLyric: function (id) {
      this.axios
        .get("/lyric", {
          params: {
            id,
          },
        })
        .then((res) => (this.lyric = res.data.lrc.lyric));
    },
    getTitleWidth: function () {
      // if (this.currentSong.song.artists) {
      var h1Dom = document.querySelector(".h1Content .h1c h1");
      void h1Dom.offsetHeight;
      if (h1Dom.offsetWidth > 199) {
        h1Dom.classList.add("longText");
        // console.log("h1Dom.offsetWidth", h1Dom.offsetWidth);
        h1Dom.style.setProperty("--songName", -h1Dom.offsetWidth + "px");
      } else {
        h1Dom.classList.remove("longText");
        h1Dom.style.setProperty("--songName", h1Dom.offsetWidth + "px");
      }
      // }
    },
  },
  computed: {
    parsedLyric: function () {
      if (this.lyric) {
        return this.lyric
          .split("\n")
          .filter((s) => s)
          .map((s) => {
            var text = s.replace(/^\[\d{2}:\d{2}\.\d{2,3}\]/i, "");
            var timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
            var timeArr = timeStr.split(":").map((item) => Number(item));
            var time = timeArr[0] * 60 + timeArr[1];
            return { text, time };
          });
      } else {
        return [];
      }
    },
    currentLyricIndex: function () {
      var i = this.parsedLyric.findIndex(
        (item) => item.time > this.currentTime
      );

      var currentLyricIndex = i !== -1 ? i - 1 : this.parsedLyric.length - 1;
      return currentLyricIndex;
    },
  },
};
</script>

<style lang="less" scoped>
.pos-ab() {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.play-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  .container {
    width: 100%;
    height: 100%;
  }
  nav {
    position: relative;
    height: 40px;
    .text {
      margin: 9px auto;
      // overflow: hidden;
      .h1Content {
        .h1c {
          margin: 0 auto;
          width: 200px;
          overflow: hidden;
          position: relative;
          transform: translateX(-28px);
          height: 1.5em;
          h1 {
            width: auto;
            left: calc(50% - var(--songName) / 2);
            white-space: nowrap;
            font-size: 15px;
            font-weight: lighter;
            text-align: center;
            color: #fff;
            position: absolute;
            &.longText {
              animation: h1ContentAnimation 15s linear infinite;
              animation: name duration timing-function delay iteration-count
                direction fill-mode;
            }
          }
        }
      }
      p {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        text-align: center;
        margin-left: -56px;
        width: 100%;
        // display: inline-block;
      }
    }
    .backBtn {
      width: 26px;
      margin: 0px 15px;
      float: left;
    }
  }
  &::before {
    content: "";
    display: block;
    .pos-ab();
    z-index: -2;
    background-color: #222;
  }
  .mask {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all 0.5s;
    filter: blur(10px) brightness(0.75);
    z-index: -1;
    .pos-ab();
    transform: scale(1.4);
  }
  .rotate {
    position: relative;
    padding-top: 25vw;
    height: 60vh;
    img.needle {
      height: 35vw;
      position: absolute;
      top: 20px;
      left: 50%;
      z-index: 9;
      margin-left: -15px;
      transform-origin: 15px 15px;
      transition: transform 0.4s ease-out;
      transform: rotate(360deg);
      &.pause {
        transform: rotate(335deg);
      }
    }
    .record {
      position: relative;
      width: 80vw;
      height: 80vw;
      margin: 0 auto;
      animation: rotate 20s linear infinite;
      animation-play-state: paused;
      img {
        .pos-ab();
        border-radius: 50%;
        &.thumb {
          transform: scale(0.8);
        }
      }
      &.playing {
        animation-play-state: running;
      }
    }
  }
  .lyricContainer {
    width: 100%;
    height: 60vh;
    overflow: hidden;
    position: fixed;
    font-size: 15px;
    margin-top: 20px;
    .lyric {
      height: 60vh;
      color: transparent;
      text-align: center;
      -webkit-background-clip: text;
      background-clip: text;
      // clip-path: inset(10px 0px 30px 0px);
      background-image: linear-gradient(
        to bottom,
        transparent,
        #fff 5%,
        #fff 95%,
        transparent
      );
      overflow: hidden;
      ul {
        // margin-top: 10px;
        padding-top: 20px;
        transition: all 0.7s;
        width: 90%;
        margin: 10px auto 0;
        // position: absolute;
        // display: flex;
        // justify-content: center;
        li {
          min-height: 2.3em;
          // line-height: 2em;
          &.active {
            color: red;
          }
        }
      }
    }
  }
  .progress {
    width: 80vw;
    height: 3px;
    margin: 20px auto;
    background: rgba(255, 255, 255, 0.2);
    position: absolute;

    left: 50%-40vw;
    bottom: 35vw;
    // border-radius: 3px;
    input {
      width: 100%;
      height: 500%;
      position: absolute;
      opacity: 0;
      z-index: 1;
      top: -4px;
      left: -2px;
    }
    .bar {
      .pos-ab();
      z-index: 0;
      background: #fff;
      border-radius: inherit;
      &::before {
        content: "";
        background: #fff;
        width: 8px;
        height: 8px;
        display: block;
        position: absolute;
        margin-right: -4px;
        top: calc(-4px / 2);
        right: 0;
        border-radius: 50%;
      }
    }
    .currentTime {
      color: rgba(255, 255, 255, 0.4);
      position: absolute;
      left: 0;
      top: 8px;
      font-size: 12px;
    }
    .durationTime {
      color: rgba(255, 255, 255, 0.4);
      position: absolute;
      right: 0;
      top: 8px;
      font-size: 12px;
    }
  }
  .controls {
    margin: 40% 10% 10%;
    display: flex;
    position: fixed;
    bottom: 10vw;
    justify-content: space-around;
    width: 80vw;
    img {
      width: 2.1rem;
      &.fanzhuan {
        transform: rotate(180deg);
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
  @keyframes h1ContentAnimation {
    from {
      left: 20px;
    }
    to {
      left: calc(var(--songName) + 200px);
    }
  }
  .opac {
    opacity: 0;
    visibility: hidden;
  }
}
</style>