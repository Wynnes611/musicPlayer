<template>
  <div class="home">
    <HomeTitle>编辑推荐</HomeTitle>
    <ul class="home-cardlist">
      <cardListItem v-for="item in personalizeds" :key="item.id" :item="item" />
    </ul>
    <!-- <ul>
      <li
        v-for="item in personalizeds"
        :key="item.id"
        @click="$router.push('/playlist?id=' + itemtem.name }}
      </li>
    </ul> -->
    <HomeTitle>最新音乐</HomeTitle>
    <ul class="home-songlist">
      <songListItem
        v-for="item in newsongs"
        :key="item.id"
        :item="item"
        :currentSongId="currentSongId"
        @change-current-song="
        $emit('change-current-song', $event);
        $emit('change-current-play-list', newsongs);
        "
        :playing ="playing"
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
  props:{
    currentSongId:{
      type:Number,
    },
    playing:Boolean,
  },
  data: function () {
    return {
      personalizeds: [],
      newsongs: [],
    };
  },
  created: function () {
    this.axios
      .get("/personalized?limit=6")
      .then((res) => {
        this.personalizeds = res.data.result;
      });
    this.axios
      .get("/personalized/newsong")
      .then((res) => {
        this.newsongs = res.data.result;
      });
  },
};
</script>
<style lang="less" scoped>
.home{
  overflow-x: hidden;
  width: 100vw;
  margin-top: 11px;
  padding-bottom: 50px;
}
.home-cardlist {
  display: flex;
  flex-wrap: wrap;
}
</style>