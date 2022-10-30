<template>
  <div class="page-container">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="用户名">
            <el-input v-model="listQuery.user" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="listQuery.gender">
              <el-option label="请选择" value="" />
              <el-option label="男" :value="0" />
              <el-option label="女" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="listQuery.enabled" label="启用" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleChange">查询</el-button>
            <el-button type="primary" @click="openHandle('add')"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button>删除</el-button>
      </el-col>
      <el-col :span="24">
        <el-table ref="userRef" :data="list" style="width: 100%" :border="true">
          <el-table-column type="selection" label="全选" width="55" />
          <el-table-column label="id" width="100">
            <template #default="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="用户名" width="120">
            <template #default="scope">{{ scope.row.username }}</template>
          </el-table-column>
          <el-table-column label="密码" width="70"> * </el-table-column>
          <el-table-column label="性别" width="70">
            <template #default="scope">
              {{ scope.row.gender === 1 ? '女' : '男' }}
            </template>
          </el-table-column>
          <el-table-column label="手机号" width="120">
            <template #default="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="住址" min-width="120">
            <template #default="scope">
              {{ scope.row.address }}
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
              <el-tag v-else type="denger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template #default="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140" cen>
            <template #default>
              <el-button type="primary" size="small" @click="openHandle('edit')"
                >编辑</el-button
              >
              <el-button type="primary" size="small" @click="remove"
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
    >
      <el-form :model="formData" label-width="80px" style="width: 97%">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.gender" autocomplete="off">
            <el-option label="请选择" value="" />
            <el-option label="男" :value="0" />
            <el-option label="女" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formData.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="formData.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="启用" :label-width="formLabelWidth">
          <el-switch v-model="formData.enabled" inline-prompt />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modalStatus.dialogFormVisible = false"
            >退出</el-button
          >
          <el-button type="primary" @click="dialogFormVisible = false">
            添加
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { get } from '@/request/utils'
import { reactive } from 'vue'

let list = ref([])
let count = ref(0)

let pageInfo = reactive({
  page: 1,
  pageSize: 5,
})

const listQuery = reactive({
  username: '',
  gender: '',
})

function handleChange() {
  get('/api/user/find', {
    page: pageInfo.page,
    pageSize: pageInfo.pageSize,
    user: listQuery.user,
    gender: listQuery.gender,
  }).then((res) => {
    list.value = res.data
    count.value = res.count
  })
}

const modalStatus = reactive({
  dialogFormVisible: false,
  // 定义的对话框标题对象
  titles: {
    add: '添加用户',
    edit: '修改用户',
  },
  status: '', // 对应的 key
})

const formData = reactive({
  username: '',
  password: '',
  gender: '',
  phone: '',
  address: '',
  enabled: true,
})

function openHandle(status) {
  modalStatus.status = status
  modalStatus.dialogFormVisible = true
}

function add() {}

// 用监听器监听页数的改变
watch(pageInfo, () => handleChange(), { immediate: true })
</script>

<style scoped></style>
