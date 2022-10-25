<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <V3Aside :fold="collapse"></V3Aside>

    <el-container>
      <!-- 头部 -->
      <el-header style="display: flex; justify-content: space-between">
        <el-icon :size="20" class="icon-style">
          <Expand v-if="collapse" @click="handleCollapse" />
          <Fold v-if="!collapse" @click="handleCollapse" />
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
      <!-- 内容部分 -->
      <el-main class="main">
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
            >{{ item.name }}</el-tag
          >
        </el-row>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import V3Aside from "./component/Aside.vue";
import { tabsOperation } from './hooks/useTabs'

// 定义并关闭左侧菜单折叠
const collapse = ref(false);
function handleCollapse() {
  collapse.value = !collapse.value;
}

const { openedMenu, tabClose, tabClick } = tabsOperation();

</script>

<style type="scss" scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}
.layout-container .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
  font-size: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  --el-header-height: 59px;
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
.tab-list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 34px;
}
.tab-item {
  margin: 5px 0 5px 8px;
  cursor: pointer;
}
</style>
