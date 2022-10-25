import router from "@/router";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export function tabsOperation() {
  // 定义已经打开的菜单
  let openedMenu = ref([
    { path: "/dashboard", name: "仪表板", effect: "dark", closeable: false },
  ]);

  // 定义路由实例
  const route = useRoute();
  onMounted(() => {
    // console.log(route.path, route.name);
    // dom 挂载成功之后，判断当前的路由是否为 dashboard，不是则加载当前的路由数据到 tabs 中，并修改样式
    if (openedMenu.value[0].path !== route.path) {
      openedMenu.value[0].effect = "plain";
      openedMenu.value.push({
        path: route.path,
        name: route.name,
        effect: "dark",
        closeable: true,
      });
    }
  });
  // 监听路由变化
  watch(route, (to, from) => {
    console.log("路由被触发", to);
    // 用户可能会从侧边栏打开新内容，判断新 tab 是否存在于 openedMenu 数组中
    openedMenu.value = openedMenu.value.map((item) => {
      if (to.path !== item.path) {
        item.effect = "plain";
      } else {
        item.effect = "dark";
      }
      return item;
    });
    // 判断该选项卡是否打开
    let exist = openedMenu.value.some((item) => item.path === to.path);
    if (!exist) {
      // 添加
      openedMenu.value.push({
        name: to.name,
        path: to.path,
        effect: "dark",
        closeable: true,
      });
    }
  });

  // 关闭选项卡操作
  function tabClose(e) {
    // console.log("选项卡关闭", e);

    // 获取当前选项卡的位置
    let tabIndex = openedMenu.value.indexOf(e);
    // 若判断删除的选项卡是否为当前选中的
    if (e.effect === "dark") {
      // 则将 tabIndex-1 项设置成选中的状态，并跳转
      openedMenu.value[tabIndex - 1].effect = "dark";
      router.replace(openedMenu.value[tabIndex - 1].path);
    }
    // 过滤出除自己以外的选项卡
    openedMenu.value = openedMenu.value.filter((item) => e !== item);
  }
  // 选项卡被点击
  function tabClick(e) {
    console.log("选项卡被点击，路由跳转触发");
    // 修改 tab 样式
    openedMenu.value = openedMenu.value.map((item) => {
      if (e.path === item.path) {
        item.effect = "dark";
      } else {
        item.effect = "plain";
      }
      return item;
    });
    router.push(e.path);
  }

  return { openedMenu, tabClose, tabClick };
}
