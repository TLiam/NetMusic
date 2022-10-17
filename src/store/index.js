import {
  getPhoneLogin
} from '@/request/api/home'
import {
  getMusicLyric
} from '@/request/api/item.js'
import {
  createStore
} from 'vuex'
export default createStore({
  state: {
    playList: [{ // 播放列表
      al: {
        id: "",
        pic: "",
        picUrl: "https://img.599ku.com/element2/a338dc8ad7824e4c31b34b7c1a8f035f.jpg_w800",
        pic_str: "",
      },
      id: "",
      name: "暂无音乐播放",
      ar: [{
        name: ""
      }]
    }],
    playListIndex: 0, // 默认下标为0
    isBtnShow: true, // 暂停按钮的显示
    detailShow: false, // 歌曲详情页显示
    lyricList: {}, // 歌词
    currentTime: 0, // 当前时间
    duration: 0, // 歌曲总时长
    isLogin: false, // 用户是否登录
    isFooterMusic: true, // 判断底部组件是否需要显示
    token: "",
    user: {
    }, // 用户信息
  },
  getters: {},
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isBtnShow = value
    },
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },
    updatePlayList: function (state, value) {
      state.playList = value
      // console.log(state.playList);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
      // console.log(state.playListIndex);
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
      // console.log(state.detailShow);
    },
    updateLyricList: function (state, value) {
      state.lyricList = value
      // console.log(state.lyricList);
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value
      // console.log(state.currentTime);
    },
    updateDuration: function (state, value) {
      state.duration = value
      // console.log(state.duration);
    },
    updateIsLogin: function (state, value) {
      state.isLogin = true
    },
    updateToken: function (state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    updateUser: function (state, value) {
      state.user = value
      localStorage.setItem('user', JSON.stringify(state.user))
      console.log(state.user);
    },
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      // console.log(res);
      context.commit("updateLyricList", res.data.lrc)
    },
    getLogin: async function (context, value) {
      let res = await getPhoneLogin(value)
      // console.log(res);
      return res
    }
  },
  modules: {}
})