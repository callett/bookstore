<script setup>
import { HomeFilled, Setting, List } from '@element-plus/icons-vue'
import { ref } from 'vue'
const menuIndex ={
    'index': '1',
    'category': '2',
    'goods': '3',
    'setting': '4'
}
const active = ref('0')
</script>
<template>
    <el-row>
        <el-col :span="24">
            <el-menu active-text-color="#white" class="el-menu-vertical-demo"
            :default-active="active" text-color="#333">
            <router-link :to="{ name: 'index' }">
                <el-menu-item index="1">
                    <el-icon><HomeFilled /></el-icon><span>首页</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{ name: 'category' }">
                <el-menu-item index="2">
                    <el-icon><List /></el-icon><span>分类管理</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{ name: 'goods' }">
                <el-menu-item index="3">
                    <el-icon><List /></el-icon><span>商品管理</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{ name: 'setting' }">
                <el-menu-item index="4">
                    <el-icon><Setting /></el-icon><span>个人中心</span>
                </el-menu-item>
            </router-link>
        </el-menu>
        </el-col>
    </el-row>
</template>
<style scoped>
.el-container {
    height: 100%;
}

.el-container .el-header {
    background: -webkit-gradient(linear, left top, right top, from(#416b8d), to(#131414));
    text-align: center;
    line-height: 60px;
    color: #333;
}

.el-container .el-aside {
    width: 200px;
    height: calc(100vh - 60px);
    color: #333;
    background: white
}

.el-container .el-main {
    height: calc(100vh - 60px);
    background-color: #e9eef3;
    color: #333;
}
</style>
