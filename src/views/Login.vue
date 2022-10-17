<template>
  <div class="login">
    <div class="login-top">
      <span>Login</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yonghu"></use>
      </svg>
    </div>
    <img src="@/assets/loginPic.png" alt="" />
    <div class="login-info">
      <p>Enter Your Email And Password</p>
      <input
        type="text"
        class="phone"
        v-model="phone"
        placeholder="请输入邮箱"
      />
      <input
        type="password"
        class="password"
        v-model="password"
        placeholder="请输入密码"
      />
      <span @click="Login">Login</span>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/request/api/home.js";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    Login: async function () {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      console.log(res);
      if (res.data.code === 200) {
        // 如果返回的code等于200，说明登录成功，就跳转到个人中心页面
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);
        let result = await getUserInfo(res.data.account.id);
        console.log(result.data);
        this.$store.commit("updateUser", result.data);
        this.$router.push("/infoUser");
      } else {
        alert("邮箱或密码错误");
        this.password = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: rgb(241, 234, 234);
  width: 100%;
  height: 13.34rem;
  border-radius: 0 0 0.6rem 0.6rem;
  .login-top {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0.2rem;
    margin-bottom: 0.5rem;
    span {
      font-size: 0.4rem;
      font-weight: 700;
      margin-right: 0.1rem;
    }
    .icon {
      width: 0.3rem;
      height: 0.3rem;
      font-weight: large;
    }
  }
  img {
    width: 100%;
    margin-bottom: 0.6rem;
  }
  .login-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      color: #f2796b;
      font-weight: 600;
      font-size: 0.32rem;
    }
    input {
      border: 0;
      border: 0.02rem solid white;
      width: 90%;
      height: 1rem;
      background: rgba(255, 255, 255);
      border-radius: 0.35rem;
      margin-top: 0.4rem;
      padding-left: 0.3rem;
    }
    span {
      width: 60%;
      height: 1rem;
      background: rgba(242, 121, 107);
      border-radius: 0.35rem;
      margin-top: 0.5rem;
      line-height: 1rem;
      text-align: center;
      color: white;
      font-size: 0.45rem;
    }
  }
}
</style>