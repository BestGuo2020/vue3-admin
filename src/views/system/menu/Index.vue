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
        <el-button type="primary" @click="openDialogHandle('add')"
          >添加</el-button
        >
      </el-col>
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
          <el-table-column label="标识" min-width="120">
            <template #default="scope">{{ scope.row.sign }}</template>
          </el-table-column>
          <el-table-column label="路径名" min-width="120">
            <template #default="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="路径" min-width="140">
            <template #default="scope">{{ scope.row.path }}</template>
          </el-table-column>
          <el-table-column label="类别" min-width="140">
            <template #default="scope">
              {{ scope.row.type === 1 ? '路径' : '后端url' }}
            </template>
          </el-table-column>
          <el-table-column label="完整路径" min-width="140">
            <template #default="scope">{{ scope.row.fullpath }}</template>
          </el-table-column>
          <el-table-column label="图标" min-width="140">
            <template #default="scope">
              <span :class="scope.row.icon"></span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
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
                type="danger"
                size="small"
                @click="remove(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 对话框 -->
    <el-dialog
      v-model="modalStatus.dialogFormVisible"
      :title="modalStatus.titles[modalStatus.status]"
      @closed="closeDialogHandle"
    >
      <el-form :model="formData" label-width="80px" style="width: 97%">
        <el-form-item label="权限名">
          <el-input v-model="formData.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.sign" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父路径id">
          <el-input v-model="formData.parentId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="formData.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="完整路径">
          <el-input v-model="formData.fullpath" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类别">
          <el-radio-group v-model="formData.type">
            <el-radio label="">请选择</el-radio>
            <el-radio :label="1" size="large">路径</el-radio>
            <el-radio :label="2" size="large">后端url</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图标">
          <el-input
            v-model="formData.icon"
            autocomplete="off"
            placeholder="font-awesome css值"
          />
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

let list = ref([])
let count = ref(0)

function getData() {
  get('/api/menu', {}).then(res => {
    list.value = res.data
    count.value = res.count
  })
}

getData()

const formData = reactive({
  title: '',
  sign: '',
  path: '',
  fullpath: '',
  type: '',
  icon: '',
  enabled: true,
  parentId: '',
})

// 对话框数据
const modalStatus = reactive({
  dialogFormVisible: false,
  // 定义的对话框标题对象
  titles: {
    add: '添加权限信息',
    edit: '修改权限信息',
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
</script>

<style scoped></style>
