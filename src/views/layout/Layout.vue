<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <AsideContent />
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header style="display: flex; justify-content: space-between">
        <HeaderContent />
      </el-header>
      <!-- 内容部分 -->
      <el-main class="main">
        <MainContent />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AsideContent from './components/Aside.vue'
import HeaderContent from './components/Header.vue'
import MainContent from './components/Content.vue'
</script>

<style type="scss" scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}
/* 右侧内容样式 */
.el-container {
  display: flex;
}
</style>
