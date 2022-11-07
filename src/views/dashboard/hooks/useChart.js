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

  function loadLineData(chart) {
    get('/api/getflowdata').then(res => {
      lineData.xAxis.data = res.xdata
      lineData.series = res.series

      chart.value.setOption(lineData)
    })
  }

  return { loadLineData }
}

// 加载饼图（用户来源）
export function usePieData() {
  const pieData = reactive({
    tooltip: {
      trigger: 'item',
    },
    series: [],
    grid: {
      x: 70,
      y: 50,
      x2: 40,
      y2: 55,
    },
  })

  function loadPieData(chart) {
    pieData.series = [
      {
        name: '用户来源',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '朋友推荐' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ]
    chart.value.setOption(pieData)
  }

  return { loadPieData }
}

// 加载条形图（用户来源）
export function useBarData() {
  const pieData = reactive({
    tooltip: {
      trigger: 'item',
    },
    xAxis: [
      {
        type: 'category',
        data: ['搜索引擎', '直接访问', '朋友推荐', '联盟广告', '视频广告'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [],
  })

  function loadBarData(chart) {
    pieData.series = [
      {
        name: '用户来源',
        type: 'bar',
        barWidth: '60%',
        data: [1048, 735, 580, 484, 300],
      },
    ]
    chart.value.setOption(pieData)
  }

  return { loadBarData }
}

// 加载客户端版本数据
export function useVersionData() {
  const pieData = reactive({
    tooltip: {
      trigger: 'item',
    },
    series: [],
    grid: {
      x: 10,
      y: 10,
      x2: 10,
      y2: 15,
    },
  })

  function loadVersionData(chart) {
    pieData.series = [
      {
        name: '版本来源',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 123, name: '1.x' },
          { value: 345, name: '2.x' },
          { value: 656, name: '3.x' },
          { value: 980, name: '4.x' },
          { value: 1320, name: '5.x' },
          { value: 995, name: '6.x' },
          { value: 654, name: '7.x' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ]
    chart.value.setOption(pieData)
  }

  return { loadVersionData }
}
