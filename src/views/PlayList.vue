<template >
  <div v-if="detail" class="play-listviews">
    <div class="backBtnBackground" @click="back()">
      <img src="../assets/back.png" class="backBtn" />
    </div>
    <div class="creator">
      <div class="bgContainer">
        <img :src="detail.coverImgUrl" alt="" class="creatorBg" />
      </div>
      <div class="creator-left">
        <img :src="detail.coverImgUrl" alt="" class="coverImg" />
      </div>
      <div class="creator-right">
        <p class="detail-name">{{ detail.name }}</p>
        <div class="creator-info">
          <img :src="detail.creator.avatarUrl" alt="" class="avatar" />
          <span class="nickname">{{ detail.creator.nickname }}</span>
        </div>
      </div>
    </div>
    <ul>
      <songListItem
        v-for="(item, index) in detail.tracks"
        :key="item.id"
        :item="item"
        @change-current-song="
          $emit('change-current-song', item);
          $emit('change-current-play-list', detail.tracks);
        "
        :currentSongId="currentSongId"
        :playing="playing"
        :class="{ lt3: index < 3 }"
        >{{ index + 1 }}</songListItem
      >
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
      bgImg: null,
    };
  },
  watch: {
    getPlayListDetail: function () {
      var creator = document.querySelector(".creator");
      console.log(12316546);
      console.log("creator", creator);
      creator.style.setProperty("--bgCreatorImg", this.bgImg);
    },
  },
  methods: {
    getPlayListDetail: function (id) {
      this.axios
        .get("/playlist/detail", {
          params: {
            id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.detail = res.data.playlist;
          this.bgImg = res.data.playlist.coverImgUrl;
        });
    },
    back() {
        this.$router.push({ path: "/" });
    },
  },
  created: function () {
    this.getPlayListDetail(this.$route.query.id);
  },
  // mounted:function() {
  //   console.log("this.bgImg", this.bgImg);
  //   var creator = document.querySelector(".creator");
  //   creator.setProperty("--bgCreatorImg", this.bgImg);
  // },
};
</script>

<style lang="less" scoped>
.play-listviews {
  margin-top: -31px;
  position: relative;
  padding-bottom: 60px;
  .creator {
    position: relative;
    height: 230px;
    // width: 200px;
    overflow: hidden;
    .bgContainer {
      position: absolute;
      height: 600px;
      width: 600px;
      top: 0;
      left: 0;
      z-index: -22;
      .creatorBg {
        position: absolute;
        top: -50%;
        filter: blur(12px) grayscale(20%);
        left: -20%;
        // width: 550px;
        transform: scale(1.1);
        // z-index: 2;
        // width: 150%;
        object-fit: cover;
      }
    }
    // background: url(var(--bgCreatorImg));
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    margin-top: -37px;
    padding: 37px 10px 10px;
    .creator-left {
      margin-right: 12px;
      background-color: rebeccapurple;
      width: 125px;
      height: 125px;
      margin-top: 30px;
      .coverImg {
        height: 125px;
        object-fit: contain;
      }
    }
    .creator-right {
      margin-top: 30px;
      height: 125px;
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      justify-content: space-between;
      .creator-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 32px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .nickname {
          color: #fff;
          font-size: 12px;
        }
      }
      .detail-name {
        margin: 0 3px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .backBtnBackground {
    display: flex;
    align-items: center;
    .backBtn {
      height: 25px;
      margin: 0px 12px;
      display: block;
      transform: rotate(90deg);
    }
    position: absolute;
    top: 1px;
    left: 0;
    z-index: 1;
    height: 37px;
    // margin-top: 2px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 3px 7px rgba(49, 49, 49, 0.281);
  }
}
</style>