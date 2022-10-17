<template>
  <div class="search">
    <div class="search-Top">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        @keydown.enter="enterKey"
        v-model="searchKey"
        @click.self="searchKey = ''"
      />
    </div>
    <div class="search-history" @click.self="searchWord">
      <span class="search-history-title">历史</span>
      <span
        v-for="item in keyWordList"
        :key="item"
        class="search-history-key"
        @click="searchHistory(item)"
      >
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-icon"></use>
      </svg>
    </div>
    <div class="search-List">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftspan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">
              /{{ item1.name }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="item.mvid != 0">
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
import { getSearchWord } from "@/request/api/home.js";
import { getSearchMusic } from "@/request/api/home.js";
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList"))
      ? JSON.parse(localStorage.getItem("keyWordList"))
      : [];
    this.searchWord();
  },
  methods: {
    searchWord: async function () {
      let res = await getSearchWord();

      // console.log(res.data.data.realkeyword);
      this.searchKey = res.data.data.realkeyword;
    },
    enterKey: async function () {
      if (this.searchKey != "") {
        this.keyWordList.unshift(this.searchKey);
        // 去重
        this.keyWordList = [...new Set(this.keyWordList)];
        // console.log([...new Set(this.keyWordList)]);

        if (this.keyWordList.length > 10) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1);
        }
        localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        // console.log(this.keyWordList);
        let res = await getSearchMusic(this.searchKey);
        // console.log(res);
        this.searchList = res.data.result.songs;
        // console.log(this.searchList);
        this.searchKey = "";
      }
    },
    delHistory: function () {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    searchHistory: async function (item) {
      let res = await getSearchMusic(item);
      console.log(res);
      this.searchList = res.data.result.songs;
      // console.log(this.searchList);
    },
    updateIndex:function(item){
        item.al = item.album
        item.al.picUrl = item.album.artist.img1v1Url
        this.$store.commit("pushPlayList",item)
        this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        
    }
  },
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 100%;
  .search-Top {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0 0.2rem;
    align-items: center;
    input {
      width: 75%;
      height: 50%;
      border: none;
      margin-left: 0.3rem;
      border-bottom: 0.02rem solid gray;
      padding-left: 0.1rem;
    }
  }
  .search-history {
    position: relative;
    width: 100%;
    padding: 0 0.2rem;
    .search-history-title {
      font-size: 0.36rem;
      font-weight: 900;
      margin-right: 0.1rem;
    }
    .search-history-key {
      font-size: 0.25rem;
      padding: 0.1rem 0.2rem;
      background: rgb(212, 201, 201);
      border-radius: 0.4rem;
      margin: 0.1rem 0.1rem;
      display: inline-block;
      //   color: white;
    }
    .icon {
      position: absolute;
      right: 0.2rem;
      top: 0.13rem;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .search-List {
    width: 100%;
    .item {
      display: flex;
      width: 100%;
      height: 1.4rem;
      padding-top: 0.3rem;
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