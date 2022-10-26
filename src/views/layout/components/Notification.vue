<template>
  <el-icon class="icon-style icon-notice" @click="drawer = true">
    <el-badge :is-dot="count !== 0">
      <i class="fa-regular fa-bell"></i>
    </el-badge>
  </el-icon>

  <!-- 消息实体 -->
  <el-drawer
    v-model="drawer"
    :title="title"
  >
    <el-button-group>
      <el-button type="success">全部已读</el-button>
      <el-button type="danger">全部删除</el-button>
    </el-button-group>
    <el-card class="box-card" shadow="never" v-for="notification in notificationData" :key="notification.id">
      <template #header>
        <div class="card-header">
          <div style="line-height: 24px;">发布时间：{{ notification.time }}</div>
          <div style="display: block;">
            <el-button-group>
              <el-button type="success" size="small" title="已读">
                <i class="fa-regular fa-circle-check"></i>
              </el-button>
              <el-button type="danger" size="small" title="删除">
                <i class="fa-regular fa-trash-can"></i>
              </el-button>
            </el-button-group>
          </div>
        </div>
      </template>
      <div style="line-height: 1.5em">{{ notification.content }}</div>
    </el-card>
  </el-drawer>
</template>

<script setup>

// 消息通知数据
const notificationData = ref([
  {
    id: '1',
    time: "2022-10-23 15:30:12",
    title: "标题1",
    content: "vue3-admin 登录页实现完毕，Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。",
    read: false,
  },
  {
    id: '2',
    time: "2022-10-23",
    title: "标题2",
    content: "vue3-admin 项目启动",
    type: "info",
    read: false,
  }
]);

// 弹出层打开
let drawer = ref(false);
// 消息标题
let title = ref(`消息`)
// 消息个数
let count = ref(2);

// 监听消息个数
watch(notificationData, () => {
  count.value = notificationData.value.length;
})

</script>

<style>
.box-card {
  margin-top: 10px;
}
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-header span {
  display: block;
}
.el-card__header {
  padding: 4px 10px;
}
.el-drawer__header {
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #dddddd;
}
</style>