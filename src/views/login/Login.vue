<template>
  <div class="login-pages">
    <bg />
    <div class="login-form">
      <h3>系统后台登录</h3>
      <!-- 登录表单 -->
      <el-form ref="ruleFormRef" :model="loginForm" :rules="formRules">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            placeholder="用户名"
          >
            <template #prefix>
              <el-icon class="fa-solid fa-circle-user"></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
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
            :loading="loading"
            class="login-btn"
            @click="login(ruleFormRef)"
            >登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import bg from './components/Background.vue'
import useLogin from './hooks/useLogin'

const { loginForm, login, ruleFormRef, formRules, loading } = useLogin()
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
