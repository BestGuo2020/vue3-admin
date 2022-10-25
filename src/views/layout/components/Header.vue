<template>
  <el-icon :size="20" class="icon-style">
    <Expand v-if="collapse" @click="handleCollapse" />
    <Fold v-if="!collapse" @click="handleCollapse" />
  </el-icon>
  <div class="toolbar">
    <div class="brief-info">
      <el-avatar class="brief-avater" :size="24" src="http://avatarurl">
        <img :src="avatar" />
      </el-avatar>
      <span>BestGuo2020</span>
    </div>
    <el-icon class="icon-style icon-settings"><setting /></el-icon>
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

// 默认头像
const avatar = "https://avatars.githubusercontent.com/u/45250038?v=4";

</script>

<style lang="scss">
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
  height: 100%;
  cursor: pointer;
}
.icon-settings {
  margin-top: 1px; 
  font-size: 20px;
  padding-left: 7px;
}
.brief-info {
  padding: 0 10px;
  font-size: 14px;
  display: inline-flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
}
.brief-info:hover {
  background-color: #f6f6f6;
}
.brief-avater {
  margin: 0 8px;
}
</style>