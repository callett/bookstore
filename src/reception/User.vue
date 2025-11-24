<template>
  <div style="min-height: 635px;" class="container">
    <el-card class="setting-card">
      <div class="avatar-container">
        <el-avatar :size="100" :src="avatarUrl" class="avatar" />
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" class="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item label="性   &nbsp;&nbsp;别" prop="sex">
          <el-input v-model="form.sex" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item label="邮   &nbsp;&nbsp;箱" prop="email">
          <el-input v-model="form.email" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" :disabled="!isEditing" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const form = ref({
  username: 'admin',
  sex: '男',
  email: '12345678@qq.com',
  phone: '12345678910',
  avatar: '/static/image/icon.jpg' // 使用相对路径
});
const avatarUrl = computed(() => {
  return form.value.avatar;
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  min-height: 635px;
  /* 根据你的需求设置最小高度 */
  background-color: #f5f5f5;
  /* 可选，添加背景颜色 */
}

.setting-card {
  width: 400px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #f5f7fa;
  align-items: center;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  margin-right: 20px;
}

.avatar-uploader {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  background-color: #fff;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.el-form-item__label {
  font-weight: bold;
  color: #333;
}

.el-input__inner,
.el-select .el-input__inner {
  border-radius: 8px;
  border-color: #e6e6e6;
  padding: 12px;
  font-size: 16px;
}

.el-button {
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.el-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}
</style>