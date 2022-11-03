<template>
  <div class="tabs-container">
    <!-- 选项卡 -->
    <span class="left-side fa-solid fa-chevron-left"></span>
    <div class="tab-list">
      <template v-for="(item, index) in openedMenu" :key="item.path">
        <el-tag
          v-if="index === 0"
          class="mx-1 tab-item tab-item-first"
          :effect="item.effect"
          :closable="item.closeable"
          @close="tabClose(item)"
          @click="tabClick(item)"
          >{{ item.title }}</el-tag
        >
        <el-tag
          v-else
          class="mx-1 tab-item"
          :effect="item.effect"
          :closable="item.closeable"
          @close="tabClose(item)"
          @click="tabClick(item)"
          >{{ item.title }}</el-tag
        >
      </template>
    </div>
    <span class="right-side fa-solid fa-chevron-right"></span>
  </div>
</template>

<script setup>
import { tabsOperation } from '../hooks/useTabs'
const { openedMenu, tabClose, tabClick } = tabsOperation()
</script>
<style lang="scss" scoped>
.tabs-container {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.tab-list {
  margin-bottom: 0;
  white-space: nowrap;
  position: relative;
  width: 100%;
}
.tab-item {
  margin: 8px 8px 8px 0;
  cursor: pointer;
  transform: translateX(0);
}
.tab-item-first {
  margin: 8px;
}
.table-item-last {
  margin-right: 0;
}
.left-side {
  cursor: pointer;
  width: 41px;
  height: 41px;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 41px;
}
.right-side {
  width: 41px;
  height: 41px;
  cursor: pointer;
  text-align: center;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 41px;
}
</style>
