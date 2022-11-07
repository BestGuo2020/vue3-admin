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
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>每时段用户流量趋势</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <V3Echarts ref="linechart"></V3Echarts>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>用户来源</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <V3Echarts ref="piechart" :custom-style="{ height: '350px' }">
          </V3Echarts>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>用户来源（柱状图）</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <V3Echarts ref="barchart" :custom-style="{ height: '350px' }">
          </V3Echarts>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>客户端版本</span>
              <el-tag>今日数据</el-tag>
            </div>
          </template>
          <V3Echarts ref="versiondata" :custom-style="{ height: '350px' }">
          </V3Echarts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import AnimateNumber from '@/components/AnimateNumber/Index'
import V3Echarts from '@/components/Echarts/Index'

import {
  useFlowData,
  usePieData,
  useVersionData,
  useBarData,
} from './hooks/useChart'

const animateNumber = ref(null)

const linechart = ref(null)
const piechart = ref(null)
const barchart = ref(null)
const versiondata = ref(null)

const { loadLineData } = useFlowData()
const { loadPieData } = usePieData()
const { loadBarData } = useBarData()
const { loadVersionData } = useVersionData()
onMounted(() => {
  loadLineData(linechart)
  loadPieData(piechart)
  loadBarData(barchart)
  loadVersionData(versiondata)
})

function update() {
  animateNumber.value.updateValue(67998)
}
</script>

<style scoped>
.el-row {
  margin-bottom: 0;
}
.el-col {
  background: transparent;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
