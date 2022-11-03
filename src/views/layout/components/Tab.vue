<template>
  <div class="tabs-container">
    <!-- 选项卡 -->
    <span
      v-show="showSide"
      class="left-side fa-solid fa-chevron-left"
      @click="translateLeftHandle"
    ></span>
    <div ref="tablistwrap" class="tab-list-wrapper">
      <div
        ref="tablist"
        class="tab-list"
        :style="{ transform: `translate(${offset}px)` }"
      >
        <template v-for="(item, index) in openedMenu" :key="item.path">
          <el-tag
            v-if="index === 0"
            class="mx-1 tab-item tab-item-first"
            :effect="item.effect"
            :closable="item.closeable"
            @close="tabClose(item)"
            @click="tabClick(item)"
            >{{ item.title }}</el-tag
          >
          <el-tag
            v-else
            class="mx-1 tab-item"
            :effect="item.effect"
            :closable="item.closeable"
            @close="tabClose(item)"
            @click="tabClick(item)"
            >{{ item.title }}</el-tag
          >
        </template>
      </div>
    </div>
    <span
      v-show="showSide"
      class="right-side fa-solid fa-chevron-right"
      @click="translateRightHandle"
    ></span>
  </div>
</template>

<script setup>
import { tabsOperation } from '../hooks/useTabs'
const { openedMenu, tabClose, tabClick } = tabsOperation()

const offset = ref(0)
const tablist = ref()
const tablistwrap = ref()
const showSide = ref(true)

// 左按钮（其实是向右移动，右按钮反之）
function translateLeftHandle() {
  const everyTimeOffset = 200

  // 如果偏移量为0，就不再点左端了
  if (offset.value < 0) {
    // 判断左偏移时大于0的情况
    if (offset.value + everyTimeOffset >= 0) {
      offset.value += Math.abs(offset.value)
    } else {
      offset.value += everyTimeOffset
    }
  }
}

function translateRightHandle() {
  const everyTimeOffset = 200

  // 计算出 tab-list 和 tab-list-wrapper 的差值，也就是右侧不可见的长度部分
  // 差值≤0：不移动，差值>0，移动
  let deltaWidth = tablist.value.offsetWidth - tablistwrap.value.offsetWidth

  // tab-list 中的宽度是由 tab 撑大的，如果超过了父元素的宽度就可以移动了
  if (deltaWidth > 0) {
    let remainWidth = deltaWidth - Math.abs(offset.value)

    // 剩余右侧不可见长度在100以上，继续用100减，在 100 以内则用remainWidth减去
    if (remainWidth >= everyTimeOffset) {
      offset.value -= everyTimeOffset
    } else if (remainWidth > 0 && remainWidth < everyTimeOffset) {
      offset.value -= remainWidth
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs-container {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .left-side {
    cursor: pointer;
    width: 41px;
    height: 41px;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    line-height: 41px;
  }

  .right-side {
    width: 41px;
    height: 41px;
    cursor: pointer;
    text-align: center;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    line-height: 41px;
  }
}
.tab-list-wrapper {
  width: 100%;
  overflow: hidden;

  .tab-list {
    margin-bottom: 0;
    white-space: nowrap;
    width: min-content;
    transition: transform 0.5s;
  }

  .tab-item {
    margin: 8px 8px 8px 0;
    cursor: pointer;
  }
  .tab-item-first {
    margin: 8px;
  }
  .table-item-last {
    margin-right: 0;
  }
}
</style>
