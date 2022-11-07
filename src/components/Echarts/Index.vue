<template>
  <div ref="chartdom" :style="customStyle"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted } from 'vue'
import { theme } from './theme'

const chartdom = ref()

const props = defineProps({
  customStyle: {
    type: Object,
    default: () => {
      return {
        height: '350px',
        background: 'white',
      }
    },
  },
})

// 注册主题
echarts.registerTheme('vintage', theme)
const resizeChart = () => {
  myChart.resize()
}

let myChart = null
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(chartdom.value, 'vintage')
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  // 卸载大小重置事件
  window.removeEventListener('resize', resizeChart)
})

function setOption(option) {
  myChart.setOption(option)
}

defineExpose({ setOption })
</script>
<style lang="scss" scoped></style>
