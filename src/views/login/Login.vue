<template>
  <div class="login-pages">
    <bg />
    <div class="login-form">
      <h3>系统后台登录</h3>
      <!-- 登录表单 -->
      <el-form :model="loginForm" ref="ruleFormRef" :rules="formRules">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            placeholder="用户名"
          >
            <template #prefix>
              <el-icon class="fa-solid fa-circle-user"></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
          >
            <template #prefix>
              <el-icon class="fa-solid fa-lock"></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-item">
          <el-button
            type="primary"
            class="login-btn"
            @click="login(ruleFormRef)">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import bg from "./components/Background.vue";
import { post } from "@/request/utils";

// 登录表单中的数据
const loginForm = reactive({
  username: "admin",
  password: "111111",
});

const ruleFormRef = ref(); // 定义一个 ref 用于直接获取表单的信息

// 定义校验的规则
const formRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度必须在6-18之间", trigger: "blur" },
  ],
};

// 登录操作
async function login(formEl) {
  const { username, password } = loginForm;
  console.log(`用户名：${username}，密码：${password}`);

  if (!formEl) {
    return;
  }

  // 表单验证
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 登录
      post("/api/login", { username, password }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          ElMessage({
            type: "success",
            message: res.msg,
          });
        } else {
          ElMessage.error(res.msg);
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
}
</script>

<style lang="scss" scoped>
.login-pages {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.login-form {
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px 20px;
  background: rgba(255, 255, 255, 0.7);

  h3 {
    text-align: center;
    margin-top: 0;
  }

  .login-item {
    width: 100%;
    text-align: center;
  }
  .login-btn {
    width: 200px;
  }
}
</style>