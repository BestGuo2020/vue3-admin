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
          <AnimateNumber :value="1145" />
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
          <AnimateNumber :value="1419" />
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
          <AnimateNumber :value="1918" />
        </el-card>
      </el-col>
      <el-col :span="6" @click="update">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>用户数</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <AnimateNumber ref="animateNumber" :value="114514" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AnimateNumber from '@/components/AnimateNumber/Index'

const animateNumber = ref(null)

function update() {
  animateNumber.value.updateValue(67998)
}
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
