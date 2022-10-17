<template>
  <div class="musicDetail">
    <img :src="musicList.al.picUrl" class="bgimg" />
    <div class="detailTop">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-fanhui1"></use>
        </svg>
        <div class="sing">
          <Vue3Marquee class="vue3-marquee-sing">
            <p>{{ musicList.name }}</p>
          </Vue3Marquee>
          <div class="singer">
            <Vue3Marquee class="vue3-marquee-singer">
              <div class="singerInfo" v-for="item in musicList.ar" :key="item">
                {{ item.name }}
              </div>
            </Vue3Marquee>
            <svg class="icon singerIcon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div
      class="detailContent"
      v-show="!isLyricShow"
      @click="isLyricShow = true"
    >
      <img
        src="@/assets/needle-ab.png"
        class="img_needle"
        :class="{ img_needle_active: !isBtnShow }"
      />
      <img src="@/assets/disc-plus.png" class="img_disc" />
      <img
        :src="musicList.al.picUrl"
        class="img_ar"
        :class="{ img_ar_active: !isBtnShow, img_ar_pause: isBtnShow }"
      />
    </div>
    <div
      class="lyric"
      ref="musicLyric"
      @click="isLyricShow = false"
      v-show="isLyricShow"
    >
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lyc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footer">
        <div class="footerTop">
          <div class="top">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinle"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-31xiaoxi"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao-"></use>
            </svg>
          </div>
        </div>
        <div class="footerContent">
          <!-- <span :v-model="lyricList.lyric.time"></span> -->
          <input
            type="range"
            class="range"
            min="0"
            max="duration"
            v-model="currentTime"
          />
        </div>
        <div class="footerBottom">
          <div class="bottom">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
              <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg
              class="icon active"
              aria-hidden="true"
              v-if="isBtnShow"
              @click="play"
            >
              <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon active" aria-hidden="true" v-else @click="play">
              <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
              <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zu"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lyc = item.slice(11);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lyc = item.slice(10);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          //   console.log(min, sec, mill, lyc);
          return { min, sec, mill, lyc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  methods: {
    backHome: function () {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  mounted() {
    // console.log(this.musicList);
    // console.log(this.lyricList.lyric);
    this.addDuration();
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      //   console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.upadtePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
      //   console.log([this.$ref.musicLyric]);
    },
  },
  props: ["musicList", "isBtnShow", "play", "addDuration"],
  components: {
    Vue3Marquee,
  },
};
</script>

<style lang="less" scoped>
.musicDetail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .bgimg {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(0.6rem);
  }
  .detailTop {
    padding: 0.35rem 0.2rem 0 0.2rem;
    display: flex;
    justify-content: space-between;
    .topLeft {
      display: flex;
      // flex-direction: column;
      justify-content: space-around;
      .icon {
        fill: white;
        width: 0.68rem;
        height: 0.68rem;
      }
      .sing {
        display: flex;
        flex-direction: column;
        margin-left: 0.28rem;
        .vue3-marquee-sing {
          width: 2rem;
        }
        p {
          color: white;
          display: inline-block;
          font-size: 0.34rem;
        }
        .singer {
          display: flex;
          .vue3-marquee-singer {
            width: 1rem;
            .singerInfo {
              color: rgba(54, 54, 54, 0.8);
              font-size: 0.28rem;
              font-weight: 700;
              margin-top: 0.04rem;
            }
          }
          .singerIcon {
            fill: rgba(54, 54, 54, 0.8);
            margin: 0.13rem 0 0 0.1rem;
            width: 0.25rem;
            height: 0.25rem;
          }
        }
      }
    }
    .topRight {
      .icon {
        fill: white;
        width: 0.68rem;
        height: 0.68rem;
      }
    }
  }
  .detailContent {
    position: relative;
    width: 100%;
    height: 11rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.2rem;
    .img_needle {
      position: absolute;
      left: 46%;
      width: 2.2rem;
      height: 3.2rem;
      transform-origin: 0 0;
      transform: rotate(-20deg);
      transition: all 2s;
    }
    .img_needle_active {
      position: absolute;
      left: 46%;
      width: 2.2rem;
      height: 3.2rem;
      transform-origin: 0 0;
      transform: rotate(-1deg);
      transition: all 2s;
    }
    .img_disc {
      z-index: -1;
      position: absolute;
      bottom: 3.8rem;
      width: 5.5rem;
      height: 5.5rem;
    }
    .img_ar {
      position: absolute;
      bottom: 4.8rem;
      left: calc(50% - 1.75rem);
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      animation: rotate_ar 10s linear infinite;
    }
    .img_ar_active {
      animation-play-state: running;
    }
    .img_ar_pause {
      animation-play-state: paused;
    }
    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .lyric {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 10rem;
    overflow: auto;
    margin-top: 0.4rem;
    p {
      color: rgb(163, 154, 154);
      margin-bottom: 0.4rem;
      font-size: 0.36rem;
      text-align: center;
      transition: all 0.2s;
    }
    .active {
      color: white;
      font-size: 0.5rem;
    }
  }
  .detailFooter {
    width: 100%;
    height: 4rem;
    .footer {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      .footerTop {
        width: 100%;
        bottom: 3.1rem;
        .top {
          display: flex;
          justify-content: space-around;
          .icon {
            fill: white;
            width: 0.7rem;
            height: 0.7rem;
          }
        }
      }
      .footerContent {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .range {
          width: 100%;
          height: 0.06rem;
        }
      }
      .footerBottom {
        width: 100%;
        .bottom {
          display: flex;
          width: 100%;
          justify-content: space-around;
          align-items: center;
          .icon {
            fill: white;
            width: 0.6rem;
            height: 0.6rem;
          }
          .active {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
</style>