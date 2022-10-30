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
</template>

<script setup>
import { tabsOperation } from '../hooks/useTabs'
const { openedMenu, tabClose, tabClick } = tabsOperation()
</script>
<style lang="scss" scoped>
.tab-list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 34px;
  margin-bottom: 0;
}
.tab-item {
  margin: 5px 0 5px 8px;
  cursor: pointer;
}
</style>
