<template>
  <div class="page-container">
    <el-row>
      <el-col :span="24">
        <el-alert
          show-icon
          title="富文本编辑器采用 wangEditor5，更多技巧请访问 https://www.wangeditor.com/"
          effect="dark"
          type="info"
        />
      </el-col>
      <el-col :span="24">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :default-config="toolbarConfig"
          :mode="mode"
        />
        <Editor
          v-model="valueHtml"
          style="height: 500px; overflow-y: hidden"
          :default-config="editorConfig"
          :mode="mode"
          @on-created="handleCreated"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor === null) return
  editor.destroy()
})

const handleCreated = editor => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
