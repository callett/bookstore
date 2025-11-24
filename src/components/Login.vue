<script setup>
import useToken from '../store/token'
const { updateToken } = useToken()
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = reactive({
    username: '',
    password: '',
})
const submitForm = () => {
    updateToken(form.username, form.password)
    if (localStorage) {
        router.push('/home')
    }
}
const ruleFormRef = ref()
const reseForm = () => {
    ruleFormRef.value.resetFields()
}
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 12, message: '用户名长度为3~12个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 24, message: '密码长度为6~24个字符', trigger: 'blur' },
    ]
})
</script>
<template>
    <el-card class="box-card">
        <el-card class="box-form">
            <div class="card-header">
                <h3>书 店 后 台 管 理</h3>
            </div>
            <el-form ref="ruleFormRef" states-icon :model="form" :rules="rules" label-width="120px">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密&nbsp;&nbsp;&nbsp;码">
                    <el-input v-model="form.password" type="password" show-password placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="center">
                    <el-button class="button" @click="submitForm(ruleFormRef)" type="primary"
                        size="large">登录</el-button>
                    <el-button class="button" @click="reseForm" type="info" size="large">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-card>
</template>
<style scoped>
.box-card {
    height: 100%;
    background: url('./bj.jpg') center / cover no-repeat;
    min-height: 855px;
}

.box-card .box-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    max-width: 550px;
    transform: translate(-50%, -50%);
    border: 2px solid gray;
    border-radius: 10px;
}

.box-card .card-header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box-card .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.box-card .el-form-item {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    --el-form-label-font-size: 16px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.box-card .button {
    width: 90px;
}

.box-card .center {
    display: flex;
    justify-content: center;
}

h3 {
    font-size: 36px;
    font-weight: bold;
    margin: 25px 0;
}
</style>