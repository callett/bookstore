import { defineStore } from "pinia";
import { ref } from "vue";

const useToken = defineStore('token',
    () => {
        
        const token = ref()
        const user = ref('admin')
        const pwd = ref('123456')
        const updateToken = (value1,value2) => {
            if (user.value === value1 && pwd.value === value2) {
                token.value = value1
            }
        }
    
        const removeToken = () => {
            localStorage.clear()
            window.location.reload()
        }
        return {token,updateToken,removeToken}
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key:'token',
                    Storage: localStorage
                }
            ]
        }
    }
)

export default useToken