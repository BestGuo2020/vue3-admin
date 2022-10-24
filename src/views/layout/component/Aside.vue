<template>
  <el-aside :width="fold ? '64px' : '240px'">
    <el-scrollbar>
      <el-menu router :collapse="fold">
        <!-- 循环遍历其路由数据 -->
        <template v-for="item in generateRoutes" :key="item.name">
          <!-- 遍历子菜单项只有一个，子菜单只有一个的话，那么就直接取出子菜单项，不需要展开 -->
          <el-menu-item
            v-if="item.children && item.children.length === 1"
            :index="'/' + item.children[0].path"
          >
            <el-icon><DataBoard /></el-icon
            ><span>{{ item.children[0].name }}</span>
          </el-menu-item>
          <!-- 遍历菜单有多个时，遍历子菜单，同时要附带下拉框 -->
          <el-sub-menu
            v-else-if="item.children && item.children.length > 1"
            :index="item.path"
          >
            <template #title>
              <el-icon><setting /></el-icon><span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="subitem in item.children"
              :key="subitem.name"
              :index="item.path + '/' + subitem.path"
            >
              {{ subitem.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import generateRoutes from "@/router/routeGenerate";
import { watch } from "@vue/runtime-core";

const props = defineProps({
  fold: Boolean,
});
</script>

<style lang="scss">
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container .el-menu {
  border-right: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  :deep(.el-sub-menu__icon-arrow) {
    display: block;
  }
}

.el-menu-vertical {
  font-weight: bold;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  height: calc(100vh - 40px);
  z-index: 10;

  :deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}
</style>