<template>
  <div id="echart" :style="customStyle"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { theme } from './theme'

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

let myChart = null
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(document.getElementById('echart', 'vintage'))
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})

function setOption(option) {
  myChart.setOption(option)
}

defineExpose({ setOption })
</script>
<style lang="scss" scoped></style>
