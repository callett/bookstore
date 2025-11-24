<script setup>
import Header from './Home/Header.vue';
import Aside from './Home/Aside.vue';
</script>
<template>
    <div class="home">
        <!-- 头部导航组件 -->
        <Header></Header>
        <!-- 左侧导航组件 -->
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
    </div>
</template>
<style scoped>
.home {
    width: 100%;
    height: 100%;
}

.el-container .el-header {
    background: -webkit-gradient(linear, left top, right top, from(#1493fa), to(#01c6fa));
    text-align: center;
    line-height: 60px;
    color: #333;
}

.el-container .el-aside {
    width: 200px;
    height: 100%;
    color: #333;
    background: white
}

.el-container .el-main {
    height: 100vh;
    background-color: #e9eef3;
    color: #333;
}
</style>
