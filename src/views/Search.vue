<template>
  <div class="search" @scroll="scroll">
    <div class="searchDistrict">
      <img
        src="../assets/cross.png"
        class="cross"
        v-if="value"
        @click="clearVal"
      />
      <input
        class="searchBox"
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model.trim="value"
        @keyup.enter="value && (searching = true)"
        @focus="inputing = true"
        @blur="inputing = false"
      />
    </div>
    <hr class="line" />
    <section class="hots" v-if="!value && !searching">
      <h5 class="searchTitle">热门搜索</h5>
      <ul class="hotContent">
        <li
          v-for="hot in hots"
          :key="hot.first"
          @click="
            value = hot.first;
            searching = true;
          "
        >
          {{ hot.first }}
        </li>
      </ul>
      <ol class="history">
        <li v-for="h in history" :key="h[0]" >
          <div class="clock">
            <img src="../assets/clock.png" alt="" />
          </div>
          <span class="content"  @click.prevent="
            searching = true;
            value = h[1];
          ">{{ h[1] }}</span>
          <div class="chaBg" @click.prevent="deleRecord">
            <img src="../assets/cha.png" alt=""  @click.prevent="selectedId = h[1];" />
          </div>
        </li>
      </ol>
    </section>
    <section class="suggests" v-if="value && !searching">
      <h5 class="searchTitle">搜索建议</h5>
      <ul>
        <li
          v-for="(item, index) in suggests"
          :key="index"
          @click="
            searching = true;
            value = item.keyword;
          "
        >
          {{ item.keyword }}
        </li>
      </ul>
    </section>
    <section class="results" v-if="value && searching">
      <h5 class="searchTitle">搜索结果</h5>
      <ul>
        <!-- <li v-for="(item, index) in searchResults" :key="index">
          {{ item.name }}
        </li> -->
        <songListItem
          v-for="(item,index) in searchResults"
          :key="index"
          :item="item"
          @change-current-song="
            $emit('change-current-song', $event);
            $emit('change-current-play-list', searchResults);
          "
          :currentSongId="currentSongId"
          :playing="playing"
        />
        <li class="loading" v-if="hasMore === false">
          <span
            style="
              margin-left: -30px;
              padding-right: 11px;
              vertical-align: middle;
            "
            >没有更多了</span
          >
        </li>

        <li class="loading" v-if="hasMore | (hasMore === null)">
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
    </section>
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
      hots: [],
      value: "",
      searchResults: [],
      suggests: [],
      searching: false,
      inputing: false,
      page: 0,
      hasMore: null,
      currentIndex: null,
      selectedId: " ",
      historyValue: [],
      songId: [],
      // time:Date.now(),
      history: JSON.parse(window.localStorage.getItem("history")) || [],
    };
  },
  methods: {
    scroll: function (event) {
      if (this.hasMore === null) {
        this.getSearch();
      }
      if (this.hasMore) {
        if (
          Math.ceil(event.target.offsetHeight + event.target.scrollTop) ===
            event.target.scrollHeight ||
          Math.floor(event.target.offsetHeight + event.target.scrollTop) ===
            event.target.scrollHeight
        ) {
          setTimeout(() => {
            this.getSearch();
            console.log("触底");
          }, 1500);
        }
      }
      if (this.hasMore === false) {
        console.log("没有更多了");
      }
    },
    selectedIdMethod: function (h) {
      this.selectedId = h;
      if (this.selectedId) {
        this.searching = false;
      }
    },
    deleRecord: function () {
      if (this.selectedId) {
        this.searching = false;
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i][1] === this.selectedId) {
            // console.log(this.history[i][1])
            window.localStorage.removeItem("history", `[${this.history[i]}]`);
            this.history.splice(i, 1);
          }
        }
        // const index = this.history.indexOf(this.selectedId);
      }
    },
    getSearch: function () {
      this.axios
        .get("/search", {
          params: {
            keywords: this.value,
            limit: 10,
            offset: this.page * 10,
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.result.songs.length; i++) {
            let songitem = res.data.result.songs[i].album.id;
            this.songId.push(songitem);
          }
          this.page++;
          this.hasMore = res.data.result.hasMore;
      if (this.songId.length != 0) {
        for (let i = 0; i < this.songId.length; i++) {
          this.axios.get("album?id=" + this.songId[i]).then((res) => {
            this.searchResults.push(...new Set(res.data.songs));
          });
        }
      }
        });
      // this.history.push(this.value);
      for (let i = 0; i < this.history.length; i++) {
        [...new Set("his", this.historyValue.push(this.history[i][1]))];
      }

      // console.log("historyValue",this.historyValue)
      if (this.historyValue.indexOf(this.value) === -1) {
        this.history = [...this.history, [Date.now(), this.value]];
        window.localStorage.setItem("history", JSON.stringify(this.history));
      }
    },
    clearVal: function () {
      this.value = "";
      this.searching = false;
    },
  },
  created: function () {
    this.axios.get("/search/hot").then((res) => {
      this.hots = res.data.result.hots;
    });
  },
  watch: {
    value: function (n) {
      if (this.inputing) {
        this.searching = false;
      }
      if (n && !this.searching) {
        this.axios
          .get("/search/suggest", {
            params: {
              keywords: n,
              type: "mobile",
            },
          })
          .then((res) => {
            this.suggests = res.data.result.allMatch;
          });
      } else {
        this.suggests = [];
      }
    },
    searching: function (n) {
      if (n && this.value) {
        this.songId = [];
        this.searchResults = [];
        this.getSearch();
      } else {
        this.searchResults = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  padding-right: 10px;
  padding-bottom: 50px;
  margin-top: 10px;
  overflow-x: hidden;
  width: 100vw;
  .searchTitle {
    font-size: 12px;
    margin: 5px 0;
    padding-left: 10px;
  }
  .suggests {
    ul {
      font-size: 14px;
      margin: 10px;
      color: #000;
      li {
        margin-bottom: 5px;
      }
    }
  }
  .searchDistrict {
    position: relative;
    width: 100%;
    padding-left: 10px;
    margin: 0 auto;
    .cross {
      position: absolute;
      top: 20px;
      right: 10px;
    }
    .searchBox {
      width: 100%;
      outline: none;
      height: 27px;
      border-radius: 20px;
      background-color: #ebecec;
      border: none;
      padding: 0 30px;
      margin: 15px 0;
      background-image: url(../assets/searchBtn.png);
      background-repeat: no-repeat;
      background-size: 15px;
      background-position: 10px center;
      &:placeholder-shown::placeholder {
        font-size: 12.5px;
        color: #bfc5cc;
      }
    }
  }
  .line {
    margin-left: -10%;
    width: 150%;
    border: none;
    height: 1px;
    box-shadow: 0 2px 1px #ebecec;
    margin-bottom: 15px;
  }
  .hots {
    .hotContent {
      margin-left: 10px;
    }
    .history {
      margin-left: 10px;
      list-style: none;
      width: 100%;
      margin-top: 18px;
      li {
        position: relative;
        .clock {
          width: 20px;
          height: 41px;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          left: 0;
          top: 1px;
          margin-left: -5px;
          background-color: #fff;
        }
        .content {
          flex: 1;
        }
        .chaBg {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
        }
        img {
          width: 15px;
        }
        color: #000;
        font-size: 13px;
        height: 30px;
        margin: 5px 0;
        vertical-align: top;
        display: flex;
        align-items: center;
        padding: 20px;
        box-shadow: 0 0.5px 1px #ebecec;
        margin-right: -10px;
      }
    }
    ul {
      li {
        float: left;
        // border: 1px solid #bfc5cc;
        box-shadow: 0 0 1px 0.2px #bfc5cc;
        padding: 5px 10px;
        margin: 4px 4px 4px 0;
        font-size: 13px;
        color: #000;
        border-radius: 0.9rem;
      }
      &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        clear: both;
        visibility: hidden;
      }
    }
  }
  .results {
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
}
</style>