<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑可以切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isBtnShow">
        <use xlink:href="#icon-bofanganniu" @click="play"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else>
        <use xlink:href="#icon-zanting" @click="play"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlistMusic"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      :show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isBtnShow="isBtnShow"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "./MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isBtnShow", "detailShow"]),
  },
  mounted() {
    // console.log(this.$refs);
    // this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    play: function () {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); // 播放就调用函数 进行传值
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); // 暂停清除定时器
      }
    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    playListIndex: function () {
      // 监听如果下标发生改变，就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        // 如果是暂停状态，就改变图标
        this.updateIsbtnShow(false);
      }
    },
    playList: function () {
      if (this.isBtnShow) {
        // 如果 isBtnShow 为 true（暂停图标），就自动播放
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  components: { MusicDetail },
};
</script>

<style lang="less">
.footerMusic {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.4rem;
  background: white;
  border-top: 0.03rem solid gray;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    display: flex;
    justify-content: space;
    align-items: center;
    width: 65%;
    height: 100%;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 1.8rem;
      //   margin-right: 0.2rem;
    }
    div {
      margin-left: 0.2rem;
      p {
        width: 3.5rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        font-size: 0.26rem;
      }
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      //   fill: black;
    }
  }
}
</style>