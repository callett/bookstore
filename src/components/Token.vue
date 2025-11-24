<script setup>
import useToken from '../store/token'
const { token,updateToken,removeToken } = useToken()
const edit = (val) => {
    updateToken(val)
}
const remove=()=>{
    removeToken()
}
</script>
<template>
    <p>现在token的信息的值是:{{ token }}</p>
    <button @click="edit('修改')">修改token的值</button>
    <button @click="remove">重置</button>
</template>