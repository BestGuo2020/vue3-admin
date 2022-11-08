<template>
  <el-dropdown>
    <div class="brief-info">
      <el-avatar class="brief-avater" :size="34" :src="userinfo.avatar">
        <img src="@/assets/avatar.png" />
      </el-avatar>
      <span>BestGuo2020</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userdrawer = true">
          <i class="fa-solid fa-user-gear"></i>
          <span>用户设置</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-drawer
    v-model="userdrawer"
    :show-close="false"
    :with-header="false"
    direction="rtl"
  >
    <div class="drawer-title">用户设置</div>
    <el-row>
      <el-col :span="24" style="height: 172px">
        <el-avatar
          v-if="userinfo.avatar"
          class="settings-avatar"
          :size="150"
          :src="userinfo.avatar"
        >
          {{ userinfo.username }}
        </el-avatar>
        <el-upload
          class="upload-btn"
          :show-file-list="false"
          :limit="1"
          action="http://www.asdfgh.com"
        >
          <el-button circle>
            <i class="fa-solid fa-circle-arrow-up" title="头像"></i>
          </el-button>
        </el-upload>
      </el-col>
      <el-col :span="24">
        <el-divider>角色切换</el-divider>
        <el-form label-width="80px" label-position="left">
          <el-form-item label="当前角色">
            <el-select v-model="userinfo.role">
              <el-option
                v-for="item in userinfo.roles"
                :key="item"
                :label="item"
                :value="item"
                >{{ item }}</el-option
              >
            </el-select>
            <el-tooltip
              content="角色切换后将立即刷新页面"
              placement="top-start"
              effect="dark"
            >
              <el-button style="margin-left: 10px" type="primary"
                >切换</el-button
              >
            </el-tooltip>
          </el-form-item>
        </el-form>
        <el-divider>用户信息</el-divider>
        <el-form label-position="top" label-width="80px" :model="userinfo">
          <el-form-item label="用户名">
            <el-input v-model="userinfo.username" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input value="24" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-drawer>
</template>
<script setup>
import { useMainStore } from '@/store'

const userdrawer = ref(false)

const mainStore = useMainStore()

// 获取用户信息
const userinfo = mainStore.userInfo
console.log(userinfo)

function onSubmit() {
  console.log('数据保存')
}
</script>
<style lang="scss" scoped>
.brief-info {
  padding-right: 15px;
  font-size: 14px;
  display: inline-flex;
  height: 57px;
  align-items: center;
  cursor: pointer;
}
.brief-avater {
  margin: 0 8px 0 15px;
}
.settings-avatar {
  display: block;
  position: relative;
  left: 50%;
  border: 1px solid #d0d7de;
  box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.15);
  transform: translateX(-50%);
}
.drawer-title {
  padding-bottom: 16px;
  font-size: 16px;
}
.upload-btn {
  position: relative;
  left: 50%;
  transform: translate(100%, -100%);
  width: fit-content;
}
</style>
