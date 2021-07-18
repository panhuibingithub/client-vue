<!--  -->
<template>
  <div class="login">
    <div class="form-wrapper">
      STANDERD LOGIN 通用登录页面
      <el-button
        type="primary"
        style="width: 300px; margin-top: 30px"
        @click="login"
      >
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入登录名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    login() {
      sessionStorage.setItem("userName", "TEST STD");
      this.$router.push("/home");
    },
  },
};
</script>
<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  background: #cbd1d8;
  height: 100%;
  .form-wrapper {
    width: 400px;
    margin-top: 200px;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
