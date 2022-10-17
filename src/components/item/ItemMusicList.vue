<template>
  <div class="itemMusicList">
    <div class="listTop">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div>
          播放全部<i>(共{{ itemlist.length }}首)</i>
        </div>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao1"></use>
        </svg>
        <div>收藏({{ changeCount(subscribedCount) }})</div>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemlist" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftspan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">
              /{{ item1.name }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {
    // console.log(props);
  },
  props: ["itemlist", "subscribedCount"],
  methods: {
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else if (num >= 0) {
        return num;
      }
    },
    playMusic: function (i) {
      this.updatePlayList(this.itemlist);
      this.updatePlayListIndex(i);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  background: white;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .listTop {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0 0.2rem 0;
    .topLeft {
      display: flex;
      margin: 0.15rem 0 0 0.2rem;
      div {
        font-weight: 900;
        margin: 0.02rem 0 0 0.12rem;
        i {
          color: gray;
          font-weight: normal;
        }
      }
    }
    .topRight {
      display: flex;
      background: red;
      width: 2.4rem;
      height: 0.8rem;
      border-radius: 0.7rem;
      line-height: 0.8rem;
      color: white;
      text-align: center;
      margin-right: 0.2rem;
      font-size: 0.3rem;
      .icon {
        fill: white;
        margin-left: 0.1rem;
        margin-top: 0.12rem;
        width: 0.4rem;
      }
      div {
        margin-left: 0.1rem;
      }
    }
  }
  .itemList {
    .item {
      display: flex;
      width: 100%;
      height: 1.4rem;
      .itemLeft {
        display: flex;
        width: 90%;
        .leftspan {
          line-height: 1.2rem;
          margin: 0 0.3rem 0 0.2rem;
        }
        div {
          padding-top: 0.1rem;
          p {
            padding-bottom: 0.05rem;
            font-size: 0.3rem;
            font-weight: 900;
          }
          span {
            font-size: 0.26rem;
          }
        }
      }
      .itemRight {
        display: flex;
        .icon {
          margin: 0.2rem 0.3rem 0 0;
        }
      }
    }
  }
}
</style>