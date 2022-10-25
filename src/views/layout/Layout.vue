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
        <el-row class="tab-list">
          <el-tag
            class="mx-1 tab-item"
            v-for="item in openedMenu"
            :key="item.path"
            @close="handleClose(item)"
            @click="handleClick(item)"
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
import router from "@/router";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import V3Aside from "./component/Aside.vue";

// 定义并关闭左侧菜单折叠
const collapse = ref(false);
function handleCollapse() {
  collapse.value = !collapse.value;
}

// 定义已经打开的菜单
let openedMenu = ref([
  { path: '/dashboard', name: '仪表板', effect: 'dark', closeable: false }
]);
// 定义路由实例
const route = useRoute()
onMounted(() => {
  // console.log(route.path, route.name);
  // dom 挂载成功之后，判断当前的路由是否为 dashboard，不是则加载当前的路由数据到 tabs 中，并修改样式
  if(openedMenu.value[0].path !== route.path) {
    openedMenu.value[0].effect = 'plain';
    openedMenu.value.push({ path: route.path, name: route.name, effect: 'dark', closeable: true })
  }
})
// 监听路由变化
watch(route, (to, from) => {
  console.log('路由被触发', to);
  // 用户可能会从侧边栏打开新内容，判断新 tab 是否存在于 openedMenu 数组中
  openedMenu.value = openedMenu.value.map(item => {
    if(to.path !== item.path) {
      item.effect = 'plain'
    } else {
      item.effect = 'dark'
    }
    return item;
  });
  // 判断该选项卡是否打开
  let exist = openedMenu.value.some(item => item.path === to.path);
  if(!exist) {
    // 添加
    openedMenu.value.push({
      name: to.name,
      path: to.path,
      effect: 'dark',
      closeable: true
    });
  }
});

// 关闭选项卡操作
function handleClose(e) {
  // console.log("选项卡关闭", e);

  // 获取当前选项卡的位置
  let tabIndex = openedMenu.value.indexOf(e)
  // 若判断删除的选项卡是否为当前选中的
  if(e.effect === 'dark') {
    // 则将 tabIndex-1 项设置成选中的状态，并跳转
    openedMenu.value[tabIndex - 1].effect = 'dark';
    router.replace(openedMenu.value[tabIndex - 1].path);
  }
  // 过滤出除自己以外的选项卡
  openedMenu.value = openedMenu.value.filter(item => e !== item);
}
// 选项卡被点击
function handleClick(e) {
  console.log("选项卡被点击，路由跳转触发");
  // 修改 tab 样式
  openedMenu.value = openedMenu.value.map(item => {
    if(e.path === item.path) {
      item.effect = 'dark'
    } else {
      item.effect = 'plain'
    }
    return item;
  });
  router.push(e.path);
}
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
