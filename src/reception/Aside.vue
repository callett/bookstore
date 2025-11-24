<template>
    <el-row>
        <el-col :span="24">
            <el-menu active-text-color="#white" class="el-menu-vertical-demo" :default-active="active"
                text-color="#333">
                <router-link :to="{ name: 'exhibit' }">
                    <el-menu-item index="1">
                        <el-icon>
                            <HomeFilled />
                        </el-icon><span>首页</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{ name: 'sort' }">
                    <el-menu-item index="2">
                        <el-icon>
                            <List />
                        </el-icon><span>分类</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{ name: 'cart' }">
                    <el-menu-item index="3">
                        <el-icon>
                            <ShoppingCartFull />
                        </el-icon><span>购物车</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{ name: 'user' }">
                    <el-menu-item index="4">
                        <el-icon>
                            <UserFilled />
                        </el-icon><span>我的</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script setup>
import { HomeFilled, Setting, List, ShoppingCart, User, UserFilled, ShoppingCartFull } from '@element-plus/icons-vue'
import { ref } from 'vue'
const menuIndex = {
    'exhibit': '1',
    'sort': '2',
    'cart': '3',
    'user': '4'
}
const active = ref('0')
</script>
<style scoped>
.el-container {
    height: 100%;
}

.el-container .el-header {
    background: -webkit-gradient(linear, left top, right top, from(#416b8d), to(#131414));
    text-align: center;
    line-height: 80px;
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
