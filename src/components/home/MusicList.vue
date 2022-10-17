<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-play"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
import { reactive, onMounted } from "vue";

export default {
  // Vue2 写法
  //   data() {
  //     return {
  //       musicList: [],
  //     };
  //   },
  //   methods: {
  //     async getGedan() {
  //       let res = await getMusicList();
  //       console.log(res);
  //       this.musicList = res.data.result;
  //       console.log(res.data.result);
  //     },
  //     changeCount: function (num) {
  //       if (num >= 100000000) {
  //         return (num / 100000000).toFixed(1) + "亿";
  //       } else if (num >= 10000) {
  //         return (num / 10000).toFixed(1) + "万";
  //       }
  //     },
  //   },
  //   mounted() {
  //     this.getGedan();
  //   },

  // Vue3 写法
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else if (num >= 0) {
        return num;
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      // console.log(res);
      state.musicList = res.data.result;
      // console.log(res.data.result);
    });
    return { state, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 0.02rem solid rgba(0, 0, 0, 0.4);
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.35rem;
    .my-swipe {
      height: 100%;
      img {
        width: 100%;
        height: 2.5rem;
        border-radius: 0.4rem;
      }
      .van-swipe-item {
        position: relative;
        padding: 0 0.1rem;
        text-align: center;
        .playCount {
          position: absolute;
          right: 0.25rem;
          top: 0.1rem;
          color: white;
          background: rgba(54, 54, 54, 0.5);
          text-align: center;
          padding: 0 0.1rem;
          border-radius: 0.4rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
          .icon {
            width: 0.3rem;
            height: 0.3rem;
            padding-top: 0.1rem;
          }
        }
      }
      .name {
        text-align: left;
        font-size: 0.28rem;
        display: inline-block;
        // white-space:wrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
      }
    }
  }
}
</style>