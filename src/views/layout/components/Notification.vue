<template>
  <el-icon class="icon-style icon-notice" @click="drawer = true">
    <el-badge :is-dot="count !== 0">
      <i class="fa-regular fa-bell"></i>
    </el-badge>
  </el-icon>

  <!-- 通知实体 -->
  <el-drawer v-model="drawer" :with-header="false">
    <!-- 标题 -->
    <div class="drawer-title">{{ title }}</div>
    <!-- 操作按钮 -->
    <el-button-group>
      <el-button type="success" @click="handleReadAll">全部已读</el-button>
      <el-button type="danger" @click="handleDeleteAll">全部删除</el-button>
    </el-button-group>
    <!-- 消息内容 -->
    <el-scrollbar style="margin: 10px 0">
      <el-empty
        v-if="notificationData.length === 0"
        description="还没有消息呢"
      />
      <el-card
        v-for="notification in notificationData"
        :key="notification.id"
        class="box-card"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <div style="line-height: 24px; display: flex">
              <span>{{ notification.time }}</span>
              <el-tag v-if="!notification.read" class="tag-style" size="small"
                >未读</el-tag
              >
              <el-tag v-else class="tag-style" type="success" size="small"
                >已读</el-tag
              >
            </div>
            <div>
              <el-button-group>
                <el-button
                  type="success"
                  size="small"
                  title="标记为已读"
                  @click="handleReadMessage(notification)"
                >
                  <i class="fa-regular fa-circle-check"></i>
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  title="删除"
                  @click="handleDeleteMessage(notification)"
                >
                  <i class="fa-regular fa-trash-can"></i>
                </el-button>
              </el-button-group>
            </div>
          </div>
        </template>
        <div style="line-height: 1.5em">{{ notification.content }}</div>
      </el-card>
      <el-button
        v-if="notificationData.length !== 0"
        type="primary"
        style="width: 100%; margin-top: 10px; margin-bottom: 10px"
        @click="loadMessage"
        >加载更多</el-button
      >
    </el-scrollbar>
  </el-drawer>
</template>

<script setup>
import { warningConfirm } from '@/utils/messageBox'
// 消息通知数据
const notificationData = ref([
  {
    id: '11',
    time: '2022-10-23 15:30:12',
    title: '标题1',
    content:
      'vue3-admin 登录页实现完毕，Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。',
    read: false,
  },
])

// 模拟后台加载数据
function loadMessage() {
  let length = notificationData.value.length
  notificationData.value.push({
    id: `${length + 1}`,
    time: '2022-10-23',
    title: `标题${length + 1}`,
    content: 'vue3-admin 项目启动',
    type: 'info',
    read: false,
  })
}

// 弹出层打开
let drawer = ref(false)
// 消息标题
let title = ref(`消息`)
// 未读消息个数
let count = ref(0)

// 监听未读消息个数
watch(
  notificationData,
  () => {
    count.value = notificationData.value.filter((item) => !item.read).length
    title.value = count.value === 0 ? `消息` : `消息（${count.value}）`
  },
  { immediate: true, deep: true }
)

// 改变已读消息的状态
function handleReadMessage(item) {
  let refRead = toRef(item, 'read')
  refRead.value = true
}
// 改变所有
function handleReadAll() {
  notificationData.value = notificationData.value.map((item) => {
    if (!item.read) {
      item.read = true
    }
    return item
  })
}

// 删除消息
function handleDeleteMessage(item) {
  warningConfirm('确定删除该条通知？')
    .then(() => {
      notificationData.value = notificationData.value.filter(
        (elem) => elem !== item
      )
    })
    .catch(() => {})
}
// 删除所有
function handleDeleteAll() {
  warningConfirm('确定全部删除？')
    .then(() => {
      notificationData.value = []
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
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
.drawer-title {
  padding-bottom: 16px;
  font-size: 16px;
}
:deep(.el-card__header) {
  padding: 4px 10px;
}
.el-scrollbar {
  height: 87.0991249%;
}
.tag-style {
  margin-top: 2px;
  margin-left: 5px;
  line-height: 17px;
}
</style>
