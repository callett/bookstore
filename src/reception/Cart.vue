<template>
  <h2>购物车</h2>
  <!-- 购物车列表 -->
  <div class="cart-container">
    <el-table :data="cartItems" border style="width: 100%; table-layout: fixed;">
      <el-table-column prop="name" label="商品名称" align="center" header-align="center" />
      <el-table-column label="商品图片" align="center" header-align="center">
        <template #default="scope">
          <img :src="scope.row.picture" alt="商品图片" class="cart-image" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价 (元)" align="center" header-align="center" />
      <el-table-column label="数量" align="center" header-align="center">
        <template #default="scope">
          <el-input-number v-model="scope.row.quantity" :min="1" @change="updateTotal" />
        </template>
      </el-table-column>
      <el-table-column label="小计 (元)" align="center" header-align="center">
        <template #default="scope">
          {{ (scope.row.price * scope.row.quantity).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template #default="scope">
          <el-button type="danger" size="small" @click="removeFromCart(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 总价 -->
    <div class="cart-total">
      <h3>总价：￥{{ totalPrice.toFixed(2) }}</h3>
      <el-button type="primary" size="large" @click="checkout">
        去结算
      </el-button>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    // 模拟购物车数据
    const cartItems = ref([
      {
        id: "1",
        name: "西游记",
        picture: "static/image/goods/xyj.jpg",
        price: 35.00,
        quantity: 2,
      },
      {
        id: "2",
        name: "三国演义",
        picture: "static/image/goods/sgyy.jpg",
        price: 45.00,
        quantity: 1,
      },
      {
        id: "3",
        name: "水浒传",
        picture: "static/image/goods/shz.jpg",
        price: 38.00,
        quantity: 1,
      },
    ]);

    // 计算总价
    const totalPrice = ref(0);

    const updateTotal = () => {
      totalPrice.value = cartItems.value.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    };

    // 删除商品
    const removeFromCart = (index) => {
      cartItems.value.splice(index, 1);
      updateTotal();
    };

    // 结算
    const checkout = () => {
      if (cartItems.value.length === 0) {
        return alert("购物车为空！");
      }
      alert("结算成功，总价：￥" + totalPrice.value.toFixed(2));
      // 清空购物车
      cartItems.value = [];
      totalPrice.value = 0;
    };

    // 初始化总价
    updateTotal();

    return {
      cartItems,
      totalPrice,
      updateTotal,
      removeFromCart,
      checkout,
    };
  },
};
</script>
<style scoped>
.cart-container {
  padding: 20px;
  /* 添加内边距 */
  margin: 0 auto;
  /* 居中 */
  max-width: 1200px;
  /* 最大宽度 */
  box-sizing: border-box;
  /* 确保 padding 不影响宽度计算 */
}

.cart-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  /* 保持图片比例 */
  display: block;
  margin: 0 auto;
  /* 图片居中 */
}

.cart-total {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-total h3 {
  /* margin: 0; */
  color: #333;
}

.el-table th {
  text-align: center;
  /* 表头水平居中 */
  vertical-align: middle;
  /* 表头垂直居中 */
  background-color: #f5f7fa;
  /* 表头背景色，可选 */
  padding: 10px 0;
  /* 表头上下间距 */
}

.el-table .el-table__cell {
  text-align: center;
  /* 单元格水平居中 */
  vertical-align: middle;
  /* 单元格垂直居中 */
}
</style>