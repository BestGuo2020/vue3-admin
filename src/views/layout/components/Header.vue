<template>
  <el-icon :size="20" class="icon-style">
    <Expand v-if="collapse" @click="handleCollapse" />
    <Fold v-if="!collapse" @click="handleCollapse" />
  </el-icon>
  <div class="toolbar">
    <el-dropdown>
      <el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>Tom</span>
  </div>
</template>

<script setup>
import emitter from "@/utils/bus";

// 定义并关闭左侧菜单折叠
const collapse = ref(false);
function handleCollapse() {
  collapse.value = !collapse.value;
  emitter.emit("collapse", collapse.value);
}
</script>

<style>
.layout-container .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
  font-size: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  --el-header-height: 59px;
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