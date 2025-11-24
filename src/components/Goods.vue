<template>
  <div>
    <el-button type="primary" style="margin-bottom: 10px;float: left;" @click="openDialog">新增商品</el-button>
    <el-table :data="goodsList" style="margin-bottom: 20px; width: 100%;" row-key="id" border default-expand-all>
      <el-table-column prop="id" label="商品编号" width="100" />
      <el-table-column prop="name" label="商品名称" width="160" />
      <el-table-column prop="price" label="商品价格" width="100" />
      <el-table-column prop="stock" label="商品库存" width="100" />
      <el-table-column prop="description" label="商品简介" />
      <el-table-column prop="picture" label="商品图片" width="120">
        <template #default="{ row }">
          <el-image v-if="row.picture" :src="row.picture" fit="contain"
            style="display: flex; align-items: center; height: 80px;" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="{ row }">
          <el-button type="warning" @click="editProduct(row)">编辑</el-button>
          <el-button type="danger" @click="deleteProduct(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑商品对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
      <el-form :model="currentProduct" label-width="120px">
        <el-form-item label="商品编号">
          <el-input v-model="currentProduct.id" :disabled="true" />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="currentProduct.name" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="currentProduct.price" />
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="currentProduct.stock" />
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input v-model="currentProduct.description" type="textarea" />
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProduct">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus';
import request from '../axios/request';

const goodsList = ref([]);
const dialogVisible = ref(false);
const currentProduct = ref({
  id: '',
  name: '',
  price: '',
  stock: '',
  description: '',
  picture: ''
});
const dialogTitle = ref('新增商品');

onBeforeMount(() => {
  loadGoodsList();
});

const loadGoodsList = () => {
  request({
    url: "/good/list",
    method: 'get',
  }).then(res => {
    goodsList.value = res.data.data;
  }).catch(err => {
    console.error('请求商品数据失败:', err);
    ElMessage.error('加载商品数据失败，请稍后再试');
  });
};

const openDialog = () => {
  const newId = (goodsList.value.length + 1).toString();
  currentProduct.value = {
    id: newId,
    name: '',
    price: '',
    stock: '',
    description: '',
    picture: ''
  };
  dialogTitle.value = '新增商品';
  dialogVisible.value = true;
};

const editProduct = (row) => {
  currentProduct.value = { ...row };
  dialogTitle.value = '编辑商品';
  dialogVisible.value = true;
};

const deleteProduct = (row) => {
  const index = goodsList.value.indexOf(row);
  if (index !== -1) {
    goodsList.value.splice(index, 1);
    ElMessage.success('商品删除成功');
  }
};

const saveProduct = () => {
  if (dialogTitle.value === '新增商品') {
    goodsList.value.push(currentProduct.value);
  } else {
    const index = goodsList.value.findIndex(item => item.id === currentProduct.value.id);
    if (index !== -1) {
      goodsList.value[index] = currentProduct.value;
    }
  }
  ElMessage.success('商品保存成功');
  dialogVisible.value = false;
};

const handleImageSuccess = (response, file) => {
  currentProduct.value.picture = URL.createObjectURL(file.raw);
};

const beforeImageUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>