<template>
  <div class="itemMusic">
    <ItemMusicTop :playlist="state.playlist" />
    <ItemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
import { getItemList } from "@/request/api/item.js";

export default {
  setup() {
    const state = reactive({
      playlist: {}, // 歌单详情页的数据
      itemlist: []  // 歌单的歌曲数据
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      // console.log(useRoute());
      //   console.log(id);

      // 获取歌单详情页
      let res = await getMusicItemList(id);
      //   console.log(res);
      state.playlist = res.data.playlist;

      // 获取歌单的歌曲
      let result = await getItemList(id);
      // console.log(result);
      state.itemlist = result.data.songs
      // 防止页面刷新 造成数据丢失，将数据保存到 sessionStorage
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
};
</script>