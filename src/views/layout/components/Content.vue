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
    <router-view></router-view>
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