<template>
    <el-row :gutter="30"> <!-- 设置列间距 -->
        <el-col v-for="(item, index) in goodsList" :key="item.id" :sm="12" :lg="6" class="col-container">
            <el-card class="card-container">
                <!-- 图片部分 -->
                <div class="image-container">
                    <img :src="item.picture" alt="商品图片" class="product-image" />
                </div>
                <!-- 名称 -->
                <h3 class="product-name">{{ item.name }}</h3>
                <!-- 价格 -->
                <p class="product-price">￥{{ item.price }}</p>
                <!-- 按钮 -->
                <el-button type="primary" size="small">立即购买</el-button>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import request from '../axios/request';

export default {
    setup() {
        const goodsList = ref([]);

        // 加载商品数据
        const loadGoodsList = () => {
            request({
                url: "/good/list",
                method: "get",
            })
                .then((res) => {
                    // 格式化数据
                    goodsList.value = res.data.data.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        picture: item.picture,
                    }));
                })
                .catch((err) => {
                    console.error("请求商品数据失败:", err);
                    ElMessage.error("加载商品数据失败，请稍后再试");
                });
        };

        // 点击事件
        const handleAction = (id) => {
            console.log("查看商品详情，商品 ID:", id);
            // 添加跳转或查看详情逻辑
        };

        // 页面加载时加载商品列表
        onMounted(() => {
            loadGoodsList();
        });

        return {
            goodsList,
            handleAction,
        };
    },
};
</script>
<style scoped>
.col-container {
    height: 550px;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}

/* 卡片样式 */
.card-container {
    display: flex;
    flex-direction: column;
    /* 垂直布局 */
    align-items: center;
    /* 内容水平居中 */
    padding: 20px;
    text-align: center;
    border: 1px solid #eaeaea;
    /* 可选：卡片边框 */
    border-radius: 8px;
    /* 圆角 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 卡片阴影 */
    background-color: #fff;
}

/* 图片容器样式 */
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    /* 固定宽度 */
    height: 300px;
    /* 固定高度 */
    overflow: hidden;
    /* 隐藏溢出的部分 */

    border-radius: 8px;
    /* 可选：圆角 */
    background-color: #f5f5f5;
    /* 可选：背景色 */
}

.product-image {
    max-width: 100%;
    /* 图片宽度自适应 */
    max-height: 100%;
    /* 图片高度自适应 */
    object-fit: cover;
    /* 图片按比例缩放 */
}

/* 名称样式 */
.product-name {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
    height: 20px;
    /* 限制名称的高度 */
}

/* 价格样式 */
.product-price {
    font-size: 16px;
    color: #ff4d4f;
    /* 设置价格的高亮颜色 */
    margin-bottom: 10px;
    height: 20px;
    /* 限制价格的高度 */
}
</style>