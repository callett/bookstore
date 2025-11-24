<script setup>
import useToken from '../../store/token';
import { reactive } from 'vue';
const { removeToken } = useToken()
const login_out = () => {
    removeToken()
}
const admin = reactive({
    username: '',
    avatar: '/static/image/icon.jpg'
})
</script>
<template>
    <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <div class="navbar">书 店 后 台 管 理</div>
        <el-sub-menu class="menu" index="1">
            <template #title>
                <el-avatar class="avatar" :src="admin.avatar">
                    {{ admin.username }}
                </el-avatar>
            </template>
            <router-link :to="{ name: 'setting' }">
                <el-menu-item index="5">个人中心</el-menu-item>
            </router-link>
            <el-menu-item index="6" @click="login_out">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
<style scoped>
.el-menu-demo {
    margin: 0;
    background: #333333;
    color: #333;
    line-height: 60px;
}

.navbar {
    font-size: 30px;
    margin-left: 25px;
    background: #333333;
    color: #FFFFE0;
}

.menu {
    margin-left: auto;
}
</style>