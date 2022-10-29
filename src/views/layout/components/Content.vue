<template>
  <!-- 被路由控制的组件，必须要有一个根元素，切换动画才会生效 -->
  <div class="main-content">
    <el-scrollbar>
      <el-config-provider :locale="zhCn">
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="animate__animated animate__fadeIn animate__faster animate__delay-1s"
            leave-active-class="animate__animated animate__fadeOut animate__faster"
          >
            <component :is="Component"></component>
          </transition>
        </router-view>
      </el-config-provider>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style>
.layout-container .el-main {
  padding: 0;
  overflow: hidden;
}
.main-content {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
}
</style>
