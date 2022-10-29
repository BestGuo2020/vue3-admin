<template>
  <!-- 选项卡 -->
  <el-row class="tab-list">
    <el-tag
      v-for="item in openedMenu"
      :key="item.path"
      class="mx-1 tab-item"
      :effect="item.effect"
      :closable="item.closeable"
      @close="tabClose(item)"
      @click="tabClick(item)"
      >{{ item.title }}</el-tag
    >
  </el-row>
  <el-scrollbar class="scroll">
    <!-- 被路由控制的组件，必须要有一个根元素，切换动画才会生效 -->
    <div class="main-content">
      <el-config-provider :locale="zhCn">
        <router-view
          v-slot="{ Component }"
          style="position: absolute; height: 100%; width: 100%"
        >
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
import { tabsOperation } from '../hooks/useTabs'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { openedMenu, tabClose, tabClick } = tabsOperation()
</script>

<style>
.layout-container .el-main {
  padding: 0;
  overflow: hidden;
}
.tab-list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 34px;
  box-shadow: 0px -4px 8px;
}
.tab-item {
  margin: 5px 0 5px 8px;
  cursor: pointer;
}
.main-content {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
}
.scroll {
  margin: 20px 15px;
}
</style>
