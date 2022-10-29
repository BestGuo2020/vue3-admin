<template>
  <div>
    <el-table
      ref="userRef"
      :data="list"
      style="width: 100%"
      :border="true"
      empty-text="无数据"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="id" min-width="120">
        <template #default="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="用户名" min-width="120">
        <template #default="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="性别" min-width="120">
        <template #default="scope">
          {{ scope.row.gender === 1 ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="120">
        <template #default="scope">
          {{ scope.row.enabled ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 10px">
      <el-pagination
        v-model:current-page="pageInfo.page"
        v-model:page-size="pageInfo.pageSize"
        v-model:total="count"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script setup>
import { get } from '@/request/utils'

let list = ref([])
let count = ref(0)

let pageInfo = reactive({
  page: 1,
  pageSize: 5,
})

function handleChange() {
  get('/api/user/find', {
    page: pageInfo.page,
    pageSize: pageInfo.pageSize,
  }).then((res) => {
    list.value = res.data
    count.value = res.count
  })
}

// 用监听器监听页数的改变
watch(pageInfo, () => handleChange(), { immediate: true })
</script>

<style></style>
