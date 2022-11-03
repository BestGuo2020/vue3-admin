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
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="角色名">
            <el-input v-model="listQuery.role" placeholder="角色名" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="listQuery.enabled" label="启用" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">查询</el-button>
            <el-button type="primary" @click="openDialogHandle('add')"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button
          style="margin-bottom: 10px"
          type="danger"
          @click="batchDelete"
          >删除</el-button
        >
        <el-table
          ref="roleRef"
          :data="list"
          style="width: 100%"
          :border="true"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" label="全选" width="55" />
          <el-table-column label="id" width="140">
            <template #default="scope">
              <span class="td-word">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色名" width="120">
            <template #default="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="角色描述" width="140">
            <template #default="scope">{{ scope.row.description }}</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.enable" type="success">启用</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="140">
            <template #default="scope">
              {{ formatDate(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" min-width="140">
            <template #default="scope">
              {{ formatDate(scope.row.updateTime) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="openDialogHandle('edit', scope.row)"
                >编辑</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="openAuthorizeHandle('edit', scope.row)"
                >授权</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="remove(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <el-pagination
          v-model:current-page="pageInfo.page"
          v-model:page-size="pageInfo.pageSize"
          v-model:total="count"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </el-col>
    </el-row>

    <!-- 对话框 -->
    <el-dialog
      v-model="modalStatus.dialogFormVisible"
      :title="modalStatus.titles[modalStatus.status]"
      @closed="closeDialogHandle"
    >
      <el-form :model="formData" label-width="80px" style="width: 97%">
        <el-form-item label="角色名">
          <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formData.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="formData.enabled" inline-prompt />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialogHandle">退出</el-button>
          <el-button type="primary" @click="handleOperate">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { get, post } from '@/request/utils'
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'

let list = ref([])
let count = ref(0)

let pageInfo = reactive({
  page: 1,
  pageSize: 5,
})

const listQuery = reactive({
  name: '',
})

function getData() {
  get('/api/role/find', {
    ...pageInfo,
    ...listQuery,
  }).then(res => {
    list.value = res.data
    count.value = res.count
  })
}
// 对话框数据
const modalStatus = reactive({
  dialogFormVisible: false,
  // 定义的对话框标题对象
  titles: {
    add: '添加用户信息',
    edit: '修改用户信息',
  },
  status: '', // 对应的 key
})
// 打开对话框操作
function openDialogHandle(status, row) {
  if (status === 'edit') {
    Object.keys(formData).map(key => {
      formData[key] = row[key]
    })
  }
  modalStatus.status = status
  modalStatus.dialogFormVisible = true
}
// 关闭对话框
function closeDialogHandle() {
  modalStatus.dialogFormVisible = false
  Object.keys(formData).map(key => {
    formData[key] = ''
  })
}

// 表单数据
let formData = reactive({
  id: '',
  name: '',
  description: '',
  enabled: true,
})
// 添加和修改
function handleOperate() {
  if (modalStatus.status === 'add') {
    ElMessage({
      message: '添加成功！',
      type: 'success',
    })
    getData()
    closeDialogHandle()
  }

  if (modalStatus.status === 'edit') {
    ElMessage({
      message: '编辑成功！',
      type: 'success',
    })
    getData()
    closeDialogHandle()
  }
}
// 删除
function remove(id) {
  ElMessageBox.confirm('确认删除？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        message: '删除成功！',
        type: 'success',
      })
    })
    .catch(() => {})
}
let multipleSelection = ref([])
// 选中项
function handleSelectionChange(val) {
  multipleSelection.value = val.map(item => item.id)
}
// 模拟批量删除
function batchDelete() {
  ElMessageBox.confirm('确认删除选中项？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        message: '批量删除成功！',
        type: 'success',
      })
    })
    .catch(() => {})
}
// 授权
function openAuthorizeHandle() {}
// 用监听器监听页数的改变
watch(pageInfo, () => getData(), { immediate: true })
// 日期格式化
const formatDate = computed({
  get: () => {
    return function (timestamp) {
      if (dayjs(timestamp).isValid()) {
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
      }
      return ''
    }
  },
})
</script>

<style scoped></style>
