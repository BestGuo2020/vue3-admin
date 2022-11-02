<template>
  <div class="page-container">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>访问次数</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <div ref="access">1111</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>充值数</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <div ref="recharge">1111</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>播放数</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <div ref="plays">1111</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>用户数</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <div ref="users">1111</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { CountUp } from 'countup.js'
import { onMounted } from 'vue'

const access = ref(null)
const recharge = ref(null)
const plays = ref(null)
const users = ref(null)

onMounted(() => {
  let accessCount = new CountUp(access.value, 7368)
  accessCount.start()

  let rechargeCount = new CountUp(recharge.value, 2341)
  rechargeCount.start()

  let playsCount = new CountUp(plays.value, 1145)
  playsCount.start()

  let usersCount = new CountUp(users.value, 1419)
  usersCount.start()
})
</script>

<style scoped>
.el-col {
  background: transparent;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
