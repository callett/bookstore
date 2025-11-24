<template>
  <div class="container">
    <el-card class="setting-card">
      <div class="avatar-container">
        <el-avatar :size="100" :src="avatarUrl" style="margin-right: 30px;" />
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" class="avatar-uploader">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" class="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item label="邮&nbsp;&nbsp;&nbsp;箱" prop="email">
          <el-input v-model="form.email" :disabled="!isEditing" />
        </el-form-item>
        <el-form-item label="职&nbsp;&nbsp;&nbsp;位">
          <el-input value="管理员" :disabled="true" />
        </el-form-item>
        <el-form-item style="margin-left: 20px;">
          <el-button v-if="!isEditing" type="primary" @click="startEditing">修改</el-button>
          <el-button v-else type="primary" @click="saveForm">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

const form = ref({
  username: 'admin',
  email: '12345678@qq.com',
  avatar: '/static/image/icon.jpg'
});
const isEditing = ref(false);
const formRef = ref(null);

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '用户名长度在 6 到 12 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ]
};

const startEditing = () => {
  isEditing.value = true;
};

const saveForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      localStorage.setItem('userInfo', JSON.stringify(form.value));
      isEditing.value = false;
      ElMessage.success('修改成功');
    } else {
      ElMessage.error('表单验证失败');
    }
  });
};

onMounted(() => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    form.value = JSON.parse(userInfo);
  }
});

const handleAvatarSuccess = (response, file) => {
  form.value.avatar = URL.createObjectURL(file.raw);
};

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
};

const avatarUrl = computed(() => {
  return form.value.avatar;
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.setting-card {
  width: 400px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #f5f7fa;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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