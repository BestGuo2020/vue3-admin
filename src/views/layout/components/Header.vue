<template>
  <div @click="handleCollapse">
    <el-icon :size="18" class="icon-style icon-collapse">
      <i
        v-if="collapse"
        class="fa fa-angle-double-right"
        aria-hidden="true"
      ></i>
      <i v-else class="fa fa-angle-double-left" aria-hidden="true"></i>
    </el-icon>
  </div>
  <div style="flex-shrink: 1"></div>
  <div class="toolbar">
    <el-icon
      :size="18"
      class="icon-style icon-fullsceen"
      @click="toggleFullscreen"
    >
      <i v-if="!fullScreen" class="fa fa-expand" aria-hidden="true"></i>
      <i v-else class="fa fa-compress" aria-hidden="true"></i>
    </el-icon>
    <Notification></Notification>
    <UserSettings></UserSettings>
  </div>
</template>

<script setup>
import emitter from '@/utils/bus'
import { ElDropdownItem } from 'element-plus'
import screenfull from 'screenfull'

import Notification from './Notification.vue'
import UserSettings from './UserSettings.vue'

// 定义并关闭左侧菜单折叠
const collapse = ref(false)
function handleCollapse() {
  collapse.value = !collapse.value
  emitter.emit('collapse', collapse.value)
}

// 全屏
let fullScreen = ref(false)
function toggleFullscreen() {
  if (screenfull.isEnabled) {
    if (!screenfull.isFullscreen) {
      screenfull.toggle()
    } else {
      screenfull.exit()
    }
    fullScreen.value = !fullScreen.value
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
  --el-header-height: 60px;
  --el-header-padding: 0;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.brief-info:hover,
.icon-collapse:hover,
.icon-fullsceen:hover,
.icon-notice:hover {
  background-color: #f6f6f6;
}
.icon-style {
  height: 100%;
  cursor: pointer;
}
.icon-notice {
  font-size: 20px;
  padding: 0 10px;
}
.icon-collapse {
  padding: 0 15px;
}
.icon-fullsceen {
  padding: 0 10px;
}
</style>
