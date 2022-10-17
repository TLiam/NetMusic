<template>
  <div class="itemMusicTop">
    <div class="itemTop">
      <div class="topLeft">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
    </div>
    <div class="itemCenter">
      <div class="centerLeft">
        <img :src="playlist.coverImgUrl" alt="" />
        <span class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gl-play"></use>
          </svg>
          {{ changeCount(playlist.playCount) }}
        </span>
      </div>
      <div class="centerRight">
        <span class="name">{{ playlist.name }}</span>
        <div class="creator">
          <img :src="playlist.creator.backgroundUrl" alt="" />
          <span>{{ playlist.creator.nickname }} </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <span class="description">{{ playlist.description }}</span>
      </div>
    </div>
    <div class="itemBottom">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    // console.log(props);
    // 通过 props 进行传值，判断如果拿不到数据，就获取 sessionStorage 中的数据
    if ((props.playlist.creator = "")) {
      props.playlist.creator = sessionStorage.getItem();
    }
    // 对播放量的处理
    function changeCount(num) {
      //   if (num >= 100000000) {
      //     return (num / 100000000).toFixed(1) + "亿";
      //   } else if (num >= 10000) {
      //     return (num / 10000).toFixed(1) + "万";
      //   } else if (num >= 0) {
      //     return num;
      //   }
      return num;
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
    // height: 6.2rem;
  .itemTop {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .topLeft,
    .topRight {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.4rem;
        color: white;
      }
      .icon {
        fill: white; // 填充颜色
      }
    }
    .bgimg {
      z-index: -1;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 6rem;
      filter: blur(0.14rem);
    }
  }
  .itemCenter {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    margin: 0.2rem 0;
    .centerLeft {
      position: relative;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 0.4rem;
        margin: 0 0.2rem;
      }
      .playCount {
        position: absolute;
        right: 0.3rem;
        top: 0.12rem;
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
    .centerRight {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin: 0 0.2rem 0 0;
      .name {
        color: white;
        font-weight: 900;
      }
      .creator {
        display: flex;
        // justify-content: start;
        margin: 0.15rem 0;
        line-height: 0.6rem;
        color: rgba(255, 255, 255, 0.5);
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin: 0 0.1rem 0 0;
        }
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          margin: 0.12rem 0 0 0.05rem;
          fill: rgba(255, 255, 255, 0.5);
        }
      }
      .description {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .itemBottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0.4rem 0 0.3rem 0;
    div {
      display: flex;
      flex-direction: column;
      text-align: center;
      .icon {
        fill: white;
        font-weight: 600;
        display: inline-block;
        margin-left: 0.06rem;
      }
      span {
        margin-top: 0.15rem;
        color: white;
      }
    }
  }
}
</style>