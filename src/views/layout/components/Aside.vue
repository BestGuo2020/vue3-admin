<template>
  <el-scrollbar>
    <!-- 开启路由模式，使每个菜单中的 index 属性变成 url -->
    <el-menu router :collapse="fold">
      <!-- 循环遍历其路由数据 -->
      <template v-for="item in generateRoutes" :key="item.meta.title">
        <!-- 遍历子菜单项只有一个，子菜单只有一个的话，那么就直接取出子菜单项，不需要展开 -->
        <el-menu-item
          v-if="item.children && item.children.length === 1"
          :index="'/' + item.children[0].path"
        >
          <el-icon :class="[item.meta.icon, 'icon-size']"></el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </el-menu-item>
        <!-- 子菜单有多个时，遍历子菜单，同时要附带下拉图标，没有子菜单项的就不展示 -->
        <el-sub-menu
          v-else-if="item.children && item.children.length > 1"
          :index="item.path"
        >
          <template #title>
            <el-icon :class="[item.meta.icon, 'icon-size']"></el-icon
            ><span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.meta.title"
            :index="item.path + '/' + subitem.path"
          >
            <el-icon :class="[subitem.meta.icon, 'icon-size']"></el-icon
            ><span>{{ subitem.meta.title }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import router from '@/router'
import { onMounted, watch } from 'vue'

import emitter from '@/utils/bus'

let fold = ref(false)

emitter.on('collapse', val => {
  fold.value = val
  console.log(val)
})

let generateRoutes = router.getRoutes()
</script>

<style lang="scss">
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container .el-menu {
  border-right: none;
}
.el-menu--inline {
  background: transparent;
}
/* 处理菜单折叠时字体和图标不消失的问题，以及菜单默认宽 */
.el-menu--vertical:not(.el-menu--collapse) {
  width: 200px;
  :deep(.el-sub-menu__icon-arrow) {
    display: block;
  }
}
.el-menu--vertical {
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  height: 100vh;
  background: rgb(41, 118, 204);
  background-size: 150% 150%;

  :deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}
/* 处理侧边菜单字体，点击状态等 */
.el-menu-item.is-active {
  color: #fff !important;
  opacity: 1;
  background: hsla(0, 0%, 100%, 0.23);
}
.el-menu-item,
.el-sub-menu__title {
  color: #fff;
  height: 60px;
}
.el-menu-item:hover,
.el-sub-menu__title:hover {
  color: #fff;
  opacity: 1;
  background: hsla(0, 0%, 100%, 0.23);
}
.is-opened {
  opacity: 1;
  background: hsla(0, 0%, 100%, 0.05);
}
.icon-size {
  font-size: 14px !important;
}
</style>
