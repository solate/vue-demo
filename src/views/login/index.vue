<template>
  <div>
    <h3>登录页</h3>
    <el-form :model="postData" :rules="theRules" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="postData.username"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="password"
          v-model="postData.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">
          提交
        </el-button>
        <el-button @click="resetForm('loginForm')"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/api"; //引入login
export default {
  name: "index",
  data: function () {
    return {
      postData: {
        password: "admin",
        username: "admin",
      },
      theRules: {},
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.postData)
            .then((res) => {
              //提交数据到vuex
              this.$store.commit("setToken", res);
              this.$message.success("登录成功");
              this.$router.push({
                path: "/home",
              });
            })
            .catch((err) => {
              this.$message("error", err.message);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
