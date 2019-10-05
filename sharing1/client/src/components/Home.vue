<template>
  <div>
    <p>这是主页想不想说点什么</p>
    <div>
      <span v-if="isLogin">
        github已登录
        <button @click="handelLogout">点击退出</button>
      </span>
      <span v-if="!isLogin">
        github未登录
        <button @click="handelLogin">点击登陆</button>
      </span>
    </div>
    <div>
      <img :src="imgUrl" alt />
      <textarea style="width:500px;height:100px;" v-model="content"></textarea>
      <button @click="handelSubmit">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      content: "七月的风 八月的雨 卑微的我 喜欢遥远的你",
      isLogin: false,
      imgUrl: require("../assets/github_logo.png")
    };
  },
  methods: {
    handelSubmit() {
      if (!this.isLogin) {
        window.alert("请登录后再发言");
      }
    }
  }
};
</script>

<style>
</style>