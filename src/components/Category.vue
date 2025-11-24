<template>
  <div>
    <el-button type="primary" style="margin-bottom: 10px;float: left;" @click="openDialog">新增分类</el-button>
    <el-table :data="tableData" style="margin-bottom: 20px;" row-key="id" border default-expand-all>
      <el-table-column prop="name" label="分类名称" sortable />
      <el-table-column label="分类级别">
        <template #default="{ row }">
          <span :class="{ 'primary-category': row.pid == 0, 'secondary-category': row.pid != 0 }">
            {{ row.pid == 0 ? '一级分类' : '二级分类' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="分类编号" />
      <el-table-column label="分类图片">
        <template #default="{ row }">
          <el-image v-if="row.picture" :src="row.picture" fit="contain"
            style="display: flex; align-items: center; height: 80px;" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template #default="{ row }">
          <el-button type="warning" @click="editRow(row)">编辑</el-button>
          <el-button type="danger" @click="delRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑分类对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
      <el-form :model="currentCategory" label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="currentCategory.name" />
        </el-form-item>
        <el-form-item label="分类级别">
          <el-select v-model="currentCategory.pid" placeholder="请选择分类级别">
            <el-option label="一级分类" value="0" />
            <el-option label="二级分类" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类图片">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCategory">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import request from '../axios/request';

const tableData = ref([]);
const dialogVisible = ref(false);
const currentCategory = ref({
  id: '',
  name: '',
  pid: '',
  picture: ''
});
const dialogTitle = ref('新增分类');

onMounted(() => {
  loadCategoryList();
});

const loadCategoryList = () => {
  request({
    url: "/good/category",
    method: 'get',
  }).then(res => {
    tableData.value = res.data.data;
  }).catch(err => {
    console.log(err);
  });
};

const openDialog = () => {
  currentCategory.value = {
    id: (tableData.value.length + 1).toString(),
    name: '',
    pid: '0',
    picture: ''
  };
  dialogTitle.value = '新增分类';
  dialogVisible.value = true;
};

const editRow = (row) => {
  currentCategory.value = { ...row };
  dialogTitle.value = '编辑分类';
  dialogVisible.value = true;
};

const delRow = (row) => {
  const index = tableData.value.indexOf(row);
  if (index !== -1) {
    tableData.value.splice(index, 1);
    ElMessage.success('分类删除成功');
  }
};

const saveCategory = () => {
  if (dialogTitle.value === '新增分类') {
    tableData.value.push(currentCategory.value);
  } else {
    const index = tableData.value.findIndex(item => item.id === currentCategory.value.id);
    if (index !== -1) {
      tableData.value[index] = currentCategory.value;
    }
  }
  ElMessage.success('分类保存成功');
  dialogVisible.value = false;
};

const handleImageSuccess = (response, file) => {
  currentCategory.value.picture = URL.createObjectURL(file.raw);
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
.primary-category {
  color: #416b8d;
  /* 为一级分类设置蓝色文字 */
  font-weight: bold;
  /* 使文字加粗 */
}

.secondary-category {
  color: #67c23a;
  /* 为二级分类设置绿色文字 */
  font-weight: normal;
  /* 保持正常文字粗细 */
}

.dialog-footer {
  text-align: right;
}
</style>