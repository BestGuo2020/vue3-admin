<template>
  <div class="page-container">
    <el-row>
      <el-alert
        show-icon
        title="这里仅仅展示页面效果，较完整的权限系统正结合 Java 后端开发中"
        effect="dark"
        type="info"
      />
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="roleRef"
          row-key="id"
          :data="list"
          style="width: 100%"
          :border="true"
        >
          <el-table-column label="id" min-width="140">
            <template #default="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="菜单标识" min-width="120">
            <template #default="scope">{{ scope.row.sign }}</template>
          </el-table-column>
          <el-table-column label="菜单名" min-width="120">
            <template #default="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="路径" min-width="140">
            <template #default="scope">{{ scope.row.path }}</template>
          </el-table-column>
          <el-table-column label="完整路径" min-width="140">
            <template #default="scope">{{ scope.row.fullpath }}</template>
          </el-table-column>
          <el-table-column label="图标" min-width="140">
            <template #default="scope">
              <span :class="scope.row.icon"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { get, post } from '@/request/utils'
import { reactive, ref } from 'vue'

let list = ref([])
let count = ref(0)

let pageInfo = reactive({
  page: 1,
  pageSize: 5,
})

function getData() {
  get('/api/menu', {}).then(res => {
    list.value = res.data
    count.value = res.count
  })
}

// 用监听器监听页数的改变
watch(pageInfo, () => getData(), { immediate: true })
</script>

<style scoped></style>
