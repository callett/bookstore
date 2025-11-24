<template>
  <div>
    <div v-for="(category, index) in categories" :key="index" class="category-section">
      <!-- 分类标题 -->
      <h2 class="category-title">{{ category.category }}</h2>
      <!-- 商品列表 -->
      <el-row :gutter="30">
        <el-col v-for="(child, index) in category.children" :key="child.id" :sm="12" :lg="6" class="col-container">
          <el-card class="card-container">
            <!-- 图片 -->
            <div class="image-container">
              <img :src="child.picture" alt="商品图片" class="product-image" />
            </div>
            <!-- 商品名 -->
            <h3 class="product-name">{{ child.name }}</h3>
            <!-- 按钮 -->
            <el-button type="primary" size="small">立即购买</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import request from '../axios/request';
import { ref, onMounted } from "vue";

export default {
  setup() {
    const tableData = ref([]); // 原始商品数据
    const categories = ref([]); // 按分类分组的数据
    console.log('categories', categories)

    onMounted(() => {
      loadCategoryList();
    });

    // 加载数据
    const loadCategoryList = () => {
      request({
        url: "/good/category",
        method: "get",
      })
        .then((res) => {
          tableData.value = res.data.data;
          groupByCategories();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const groupByCategories = () => {
      const grouped = [];

      // 定义分类规则
      const siDaMingZhu = ["西游记", "三国演义", "水浒传", "红楼梦"];

      const siDaMingZhuItems = tableData.value.filter(
        (item) => siDaMingZhu.includes(item.name) && item.pid !== "0"
      );

      const otherItems = tableData.value.filter(
        (item) => !siDaMingZhu.includes(item.name) && item.pid !== "0"
      );

      // 构造分组数据
      grouped.push({
        category: "四大名著",
        children: siDaMingZhuItems,
      });
      grouped.push({
        category: "其他名著",
        children: otherItems,
      });

      categories.value = grouped;
    };

    return {
      categories, // 分类分组后的数据
    };
  },
};
</script>
<style scoped>
.category-section {
  margin-bottom: 40px;
}

h2 {
  height: 150px;
  margin: 0 0;
}

.category-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.col-container {
  height: 550px;
  display: flex;
  justify-content: center;
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
  margin-bottom: 20px;
  height: 20px;
  /* 限制名称的高度 */
}
</style>