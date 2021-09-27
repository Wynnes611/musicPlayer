<template>
  <footer class="play" :class="{ playing: playing }">
    <transition
      v-if="showPlayPage"
      name="custom-transition"
      enter-active-class="animate_animated animate__slideInUp"
      leave-active-class="animate_animated animate__slideOutDown"
    >
      <keep-alive>
        <PlayPage
          :currentSong="currentSong"
          :playing="playing"
          :duration="duration"
          :currentTime="currentTime"
          @toggle-show-play-page="showPlayPage = $event"
          @toggle-show-play-list="showPlayList = $event"
          @toggle-playing-state="$emit('toggle-playing-state')"
          @next-song="$emit('next-song')"
          @prev-song="$emit('prev-song')"
          @toggle-play-mode="$emit('toggle-play-mode')"
          @current-time-change="$emit('current-time-change', $event)"
        />
      </keep-alive>
    </transition>
    <transition
      name="custom-transition"
      enter-active-class="animate_animated animate__slideInUp"
      leave-active-class="animate_animated animate__slideOutDown"
    >
      <PlayBar
        v-show="!showPlayPage"
        :currentSong="currentSong"
        :playing="playing"
        :duration="duration"
        :currentTime="currentTime"
        :currentPlayList="currentPlayList"
        @toggle-playing-state="$emit('toggle-playing-state')"
        @toggle-show-play-list="showPlayList = $event"
        @toggle-show-play-page="showPlayPage = $event"
      />
    </transition>

    <PlayList
      v-if="showPlayList"
      :currentPlayList="currentPlayList"
      :currentSong="currentSong"
      @change-current-song="
        $emit('change-current-song', $event);
        $emit('change-current-play-list', $event);
        "
      :playing="playing"
      @toggle-show-play-list="showPlayList = $event"
    />
  </footer>
</template>

<script>
import PlayBar from "@/components/PlayBar.vue";
import PlayPage from "@/components/PlayPage.vue";
import PlayList from "@/components/PlayList.vue";
export default {
  components: {
    PlayBar,
    PlayPage,
    PlayList,
  },
  props: {
    currentSong: Object,
    playing: Boolean,
    duration: Number,
    currentTime: Number,
    currentPlayList: Array,
  },
  data: function () {
    return { showPlayList: false, showPlayPage: false };
  },
};
</script>

<style lang="less" scoped>
</style>