<template>
  <div ref="number"></div>
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

defineExpose({ updateValue })
</script>
<style lang="scss" scoped></style>
