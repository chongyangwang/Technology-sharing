<template>
  <div>
    <p>这是主页想不想说点什么</p>
    <div>
      <span v-if="isLogin">
        github已登录
        <!-- <button @click="handelLogout">点击退出</button> -->
      </span>
      <span v-if="!isLogin">
        github未登录
        <!-- <button @click="handelLogin">点击登陆</button> -->
        <a
          href="https://github.com/login/oauth/authorize?client_id=cb80c1f3a6af61b6f8f6&redirect_uri=http://localhost:8080/home"
        >点击登陆</a>
        <button @click="handelSend">予后端code</button>
      </span>
    </div>
    <div>
      <img :src="imgUrl" alt style="width:90px;height:90px;display:inline-block;" />
      <textarea style="width:500px;height:100px;" v-model="content"></textarea>
      <button @click="handelSubmit">提交</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      client_id: "cb80c1f3a6af61b6f8f6",
      client_secret: "3104a77de24456579449924d00547cbd40a9f34b",
      callback_Url: "http://localhost:8080/home",
      content: "七月的风 八月的雨 卑微的我 喜欢遥远的你",
      isLogin: false,
      imgUrl: require("../assets/github_logo.png")
    };
  },
  methods: {
    handelSubmit() {
      if (!this.isLogin) {
        window.alert("请登录后再发言");
      } else {
        window.alert("已登录可以留言");
      }
    },
    handelLogin() {
      this.$router.push(
        `https://github.com/login/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.callback_Url}`
      );
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    handelSend() {
      const code = this.GetQueryString("code");
      axios.get("/oauth/redirect", { params: { code: code } }).then(res => {
        console.log(res);
        const data = res.data;
        if (data.avatar_url !== "") {
          this.isLogin = true;
          this.imgUrl = data.avatar_url;
        }
      });
    }
  }
};
</script>

<style>
</style>