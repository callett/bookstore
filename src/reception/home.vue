<script setup>
import Aside from './Aside.vue';
</script>
<template>
  <el-card class="box-card">
    <el-container>
      <el-header class="header">小小的书店</el-header>
      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
        <el-main>
          <el-card class="box-card">
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </el-card>
</template>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.header {
  width: 100%;
  height: 100px;
  background: #333333;
  align-items: center;
  padding-top: 15px;
  color: #FFFFE0;
  font-size: 48px;
  padding-left: 3%;
  float: left;
}
</style>