<template>
  <el-scrollbar>
    <!-- 被路由控制的组件，必须要有一个根元素，切换动画才会生效 -->
    <div class="main-content">
      <el-config-provider :locale="zhCn">
        <router-view v-slot="{ Component }" style="height: 100%; width: 100%">
          <transition
            enter-active-class="animate__animated animate__fadeIn animate__faster animate__delay-1s"
            leave-active-class="animate__animated animate__fadeOut animate__faster"
          >
            <component :is="Component"></component>
          </transition>
        </router-view>
      </el-config-provider>
    </div>
  </el-scrollbar>
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
