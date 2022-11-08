<template>
  <el-dropdown>
    <div class="brief-info">
      <el-avatar class="brief-avater" :size="34" :src="avatar">
        <img src="@/assets/avatar.png" />
      </el-avatar>
      <span>BestGuo2020</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
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
</template>
<script setup>
// 模拟默认头像
const avatar = 'https://avatars.githubusercontent.com/u/45250038?v=4'
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
.brief-info:hover,
.icon-collapse:hover,
.icon-fullsceen:hover,
.icon-notice:hover {
  background-color: #f6f6f6;
}
.brief-avater {
  margin: 0 8px 0 15px;
}
</style>
