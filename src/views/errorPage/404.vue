<template>
  <div class="errorpPage-box">
    <h1>对不起！我们找不到你需要的页面。</h1>
    <h2>This is not the web page youare looking for.</h2>
    <p>请联系系统管理员进行处理，我们会尽快修复。您可以：</p>
    <div class="errorpPage-operate">
      <a class="operateBtn" title="返回首页" @click="back">返回</a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.back()
}
</script>
<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  font-family: '微软雅黑';
  font-size: 16px;
}

a {
  text-decoration: none;
  color: #1064a0;
  cursor: pointer;
}

h1,
h2 {
  margin: 0;
  font-weight: normal;
  font-family: '微软雅黑';
}

.errorpPage-box h1 {
  font-size: 44px;
  color: #0188de;
  padding: 20px 0px 10px;
}

.errorpPage-box h2 {
  color: #0188de;
  font-size: 16px;
  padding: 10px 0px 40px;
}

.errorpPage-box p {
  color: #666;
}

.errorpPage-box {
  width: 910px;
  padding: 20px 20px 40px;
  margin-top: 80px;
  border-style: dashed;
  border-color: #e4e4e4;
  line-height: 30px;
  margin-left: auto;
  margin-right: auto;
}

.errorpPage-operate .operateBtn {
  width: 180px;
  height: 28px;
  margin-left: 0px;
  margin-top: 10px;
  background: #009cff;
  border-bottom: 4px solid #0188de;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  color: #fff;
}

.errorpPage-operate .operateBtn:hover {
  background: #5bbfff;
}
</style>
