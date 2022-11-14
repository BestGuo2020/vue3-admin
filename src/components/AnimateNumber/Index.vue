<template>
  <div ref="number" class="font-style"></div>
</template>

<script setup>
import { CountUp } from 'countup.js'
import { onMounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  decimalPlace: {
    type: Number,
    default: 0,
  },
})

const options = {
  decimalPlaces: props.decimalPlace,
}

const number = ref(null)

let countup
onMounted(() => {
  countup = new CountUp(number.value, props.value, options)
  countup.start()
})
// 模拟修改值
function updateValue(value) {
  countup.update(value)
}
// 给其它组件使用时本组件的方法时，直接暴露出来
defineExpose({ updateValue })
</script>
<style lang="scss" scoped>
.font-style {
  font-size: 1.6rem;
}
</style>
