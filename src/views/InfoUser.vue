<template>
  <div class="infoUser">
    <!-- <img :src="user.profile.avatarUrl" alt="" class="profileImg" /> -->
    <!-- <div class="user-name">{{ user.profile.nickname }}</div> -->
    {{userInfo}}
  </div>
</template>

<script>
import { mapState } from "vuex";  
export default {
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    console.log(this.user);
  },
};
</script>

<style lang="less" scoped>
.infoUser {
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
  .profileImg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .user-name {
    font-weight: 700;
    font-size: 0.4rem;
  }
}
</style>