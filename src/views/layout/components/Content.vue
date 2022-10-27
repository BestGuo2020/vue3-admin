<template>
  <!-- 选项卡 -->
  <el-row class="tab-list">
    <el-tag
      class="mx-1 tab-item"
      v-for="item in openedMenu"
      :key="item.path"
      @close="tabClose(item)"
      @click="tabClick(item)"
      :effect="item.effect"
      :closable="item.closeable"
      >{{ item.name }}</el-tag>
  </el-row>
  <el-scrollbar>
    <!-- 被路由控制的组件，必须要有一个根元素，切换动画才会生效 -->
    <div style="position: relative; height: 100%; width: 100%;">
      <router-view v-slot="{ Component }" style="position: absolute; height: 100%; width: 100%;">
        <transition 
          enter-active-class="animate__animated animate__fadeIn animate__faster animate__delay-1s"
          leave-active-class="animate__animated animate__fadeOut animate__faster">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { tabsOperation } from "../hooks/useTabs";

const { openedMenu, tabClose, tabClick } = tabsOperation();
</script>

<style>
.layout-container .el-main {
  padding: 0;
  overflow: hidden;
}
.tab-list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 34px;
}
.tab-item {
  margin: 5px 0 5px 8px;
  cursor: pointer;
}
</style>