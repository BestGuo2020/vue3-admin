<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <V3Aside :fold="collapse"></V3Aside>
    
    <el-container>
      <!-- 头部 -->
      <el-header style="display: flex; justify-content: space-between;">
        <el-icon :size="20" class="icon-style">
          <Expand v-if="collapse" @click="collapse = !collapse" />
          <Fold v-if="!collapse" @click="collapse = !collapse" />
        </el-icon>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main class="main">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import V3Aside from "./component/Aside.vue";

const collapse = ref(false)
</script>

<style type="scss" scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}
.layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  font-size: 12px;
}
.layout-container .el-main {
  padding: 0;
  overflow: hidden;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.icon-style {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
