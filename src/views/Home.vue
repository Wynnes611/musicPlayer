<template>
  <div class="home">
     <div class="searchDistrict">
      <input
        class="searchBox"
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        @focus="$router.push('/search')"
      />
    </div>
    <HomeTitle>编辑推荐</HomeTitle>
    <loading v-if="personalizeds.length == 0"></loading>
    <template v-else>
    <ul class="home-cardlist">
      <cardListItem v-for="item in personalizeds" :key="item.id" :item="item"  />
    </ul>
    </template>
    <!-- <ul>
      <li
        v-for="item in personalizeds"
        :key="item.id"
        @click="$router.push('/playlist?id=' + itemtem.name }}
      </li>
    </ul> -->
    <HomeTitle>最新音乐</HomeTitle>
    <loading v-if="newsongs.length == 0"></loading>
    <ul class="home-songlist" v-else>
      <songListItem
        v-for="item in newsongs"
        :key="item.id"
        :item="item"
        :currentSongId="currentSongId"
        @change-current-song="
          $emit('change-current-song', $event);
          $emit('change-current-play-list', newsongs);
        "
        :playing="playing"
      />
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTitle from "@/components/HomeTitle.vue";
import cardListItem from "@/components/cardListItem.vue";
import songListItem from "@/components/songListItem.vue";
export default {
  name: "Home",
  components: {
    HomeTitle,
    cardListItem,
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
      personalizeds: [],
      newsongs: [],
      cardIsClick:true,
      showPlayListView:false,
    };
  },
  created: function () {
    this.axios.get("/personalized?limit=6").then((res) => {
      this.personalizeds = res.data.result;
    });
    this.axios.get("/personalized/newsong").then((res) => {
      this.newsongs = res.data.result;
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  margin-top: 11px;
  padding-bottom: 50px;
}
.home-cardlist {
  display: flex;
  flex-wrap: wrap;
}
 .searchDistrict {
    position: relative;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
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
</style>