<template>
  <el-icon :size="20" class="icon-style icon-collapse">
    <Expand v-if="collapse" @click="handleCollapse" />
    <Fold v-if="!collapse" @click="handleCollapse" />
  </el-icon>
  <div class="toolbar">
    <el-icon class="icon-style icon-fullsceen">
      <EnterFullScreen @click="toggleFullscreen" v-if="!fullScreen" />
      <ExitFullScreen @click="toggleFullscreen" v-else />
    </el-icon>
    <el-icon class="icon-style icon-notice">
      <el-badge is-dot>
        <Notification />
      </el-badge>
    </el-icon>
    <div class="brief-info">
      <el-avatar class="brief-avater" :size="34" src="http://avatarurl">
        <img :src="avatar" />
      </el-avatar>
      <span>BestGuo2020</span>
    </div>
  </div>
</template>

<script setup>
import emitter from "@/utils/bus";
import screenfull from 'screenfull'

import EnterFullScreen from '@/components/icons/EnterFullScreen.vue'
import ExitFullScreen from '@/components/icons/ExitFullScreen.vue'

// 定义并关闭左侧菜单折叠
const collapse = ref(true);
function handleCollapse() {
  collapse.value = !collapse.value;
  emitter.emit("collapse", collapse.value);
}

// 默认头像
const avatar = "https://avatars.githubusercontent.com/u/45250038?v=4";

// 全屏
let fullScreen = ref(false)
function toggleFullscreen() {
  if(screenfull.isEnabled) {
    if (!screenfull.isFullscreen) {
      screenfull.toggle()
    } else {
      screenfull.exit()
    }
    fullScreen.value = !fullScreen.value;
  }
}

</script>

<style lang="scss">
.layout-container .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
  font-size: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  --el-header-height: 59px;
  --el-header-padding: 0;
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
.icon-notice {
  margin-top: 4px; 
  font-size: 20px;
  padding: 0 10px;
}
.brief-info {
  padding-right: 15px;
  font-size: 14px;
  display: inline-flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
}
.brief-info:hover, .icon-collapse:hover, .icon-fullsceen:hover, .icon-notice:hover {
  background-color: #f6f6f6;
}
.brief-avater {
  margin: 0 8px 0 15px;
}
.icon-collapse {
  padding: 0 15px;
}
.icon-fullsceen {
  margin-top: 1px; 
  font-size: 20px;
  padding: 0 10px;
}
</style>