import { get } from '@/request/utils'

// 加载折线图
export function useFlowData() {
  const lineData = reactive({
    xAxis: {
      type: 'category',
      data: [],
    },
    series: [],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人次',
      },
      axisPointer: {
        snap: true,
      },
    },
    grid: {
      x: 70,
      y: 50,
      x2: 40,
      y2: 55,
    },
  })

  function loadData(chart) {
    get('/api/getflowdata').then(res => {
      lineData.xAxis.data = res.xdata
      lineData.series = res.series

      chart.value.setOption(lineData)
    })
  }

  return { loadData }
}
