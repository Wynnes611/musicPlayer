<template>
  <li
    v-if="item.song"
    class="song-list-item"
    @click="$emit('change-current-song', item)"
  >
    <div class="left">
      <div class="title">
        {{ item.name }}
        <span v-for="n in item.song.alias" :key="n">{{ n }}</span>
      </div>
      <div class="info">
        <em v-if="item.song.privilege.playMaxbr == 999000"> </em>
        <!-- <em></em> -->
        <i
          class="artist"
          v-for="artist in item.song.artists"
          :key="artist.id"
          >{{ artist.name }}</i
        >
        <b>{{ item.song.album.name }}</b>
      </div>
    </div>
    <div class="icon">
      <div
        class="play"
        :class="{ current: currentSongId === item.id, playing: playing }"
      >
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </li>

  <li
    v-else-if="item.artists"
    class="song-list-item"
    @click="$emit('change-current-song', item)"
  >
    <div class="left">
      <div class="title">
        {{ item.name }}
        <span v-for="n in item.alias" :key="n">{{ n }}</span>
      </div>
      <div class="info">
        <!-- <em v-if="item.exclusive"> </em> -->
        <em v-if="item.songs.privilege.maxbr == 999000"> </em>
        <i class="artist" v-for="artist in item.artists" :key="artist.id">{{
          artist.name
        }}</i>
        <b>{{ item.album.name }}</b>
      </div>
    </div>
    <div class="icon">
      <div
        class="play"
        :class="{ current: currentSongId === item.id, playing: playing }"
      >
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </li>

  <li v-else class="song-list-item" @click="$emit('change-current-song', item)">
    <div class="num"><slot></slot></div>
    <div class="left">
      <div class="title">
        {{ item.name }}<span v-for="n in item.alias" :key="n">{{ n }}</span>
      </div>
      <div class="info">
        <em > </em>
        <i class="artist" v-for="artist in item.ar" :key="artist.id">{{
          artist.name
        }}</i>
        <b>{{ item.al.name }}</b>
      </div>
    </div>
    <div class="icon">
      <div
        class="play"
        :class="{ current: currentSongId === item.id, playing: playing }"
      >
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  // methods: {
  //   isPrivileges: function (id) {
  //     for (let i = 0; i < this.privileges.length; i++) {
  //       if (id === this.privileges[i].id && this.privileges[i].maxbr == 999000) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   },
  // },
};
</script>

<style lang="less" scoped>
.song-list-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(175, 174, 174, 0.2);
  margin-left: 10px;
  padding: 8px 10px 1px 0;
  .num {
    padding-right: 10px;
  }
  &.lt3 {
    .num {
      color: #d43c33;
    }
  }
  .left {
    flex: 1;
    .title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #888;
        &::before {
          content: "(";
        }
        &::after {
          content: ")";
        }
      }
    }
    .info {
      line-height: 2;
      font-size: 10px;
      color: #888;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      em {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
        background-repeat: no-repeat;
        background-size: 166px auto;
      }
      i.artist {
        font-style: normal;
        &:after {
          content: "/";
          margin: 0 3px;
        }
        &:last-of-type {
          &::after {
            content: "-";
            margin: 0 5px;
          }
        }
      }
      b {
        font-weight: normal;
      }
    }
  }
  .icon {
    width: 22px;
    height: 22px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .play {
      background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
      background-repeat: no-repeat;
      background-size: 166px auto;
      background-position: -24px 0;
      width: 100%;
      height: 100%;
    }
    .current {
      width: 15px;
      height: 15px;
      display: flex;
      background: none;
      justify-content: space-evenly;
      i {
        width: 0.18rem;
        border-radius: 2px;
        height: 100%;
        background-color: #d43c33;
        transform-origin: bottom;
        animation: playing 2s linear 0s infinite alternate;
        animation-play-state: paused;
        &:nth-child(1) {
          animation-delay: -2s;
        }
        &:nth-child(2) {
          animation-delay: -1s;
        }
      }
    }
    .playing {
      i {
        animation-play-state: running;
      }
    }
  }
}

@keyframes playing {
  from {
    transform: scaleY(0.3);
  }
  to {
    transform: scaleY(1);
  }
}
</style>