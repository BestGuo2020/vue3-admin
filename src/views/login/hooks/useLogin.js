import { post } from '@/request/utils'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from '@/store/index'

export default function () {
  // 路由引入
  const router = useRouter()
  const route = useRoute()
  const mainStore = useMainStore()

  // 登录表单中的数据
  const loginForm = reactive({
    username: 'admin',
    password: '111111',
  })

  // 登录按钮状态
  const loading = ref(false)

  const ruleFormRef = ref() // 定义一个 ref 用于直接获取表单的信息

  // 定义校验的规则
  const formRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 18, message: '密码长度必须在6-18之间', trigger: 'blur' },
    ],
  }

  // 登录操作
  async function login(formEl) {
    if (!formEl) {
      return
    }
    const { username, password } = loginForm
    // 表单验证
    await formEl.validate((valid, fields) => {
      if (valid) {
        // 登录
        loading.value = true
        post('/api/login', { username, password }).then((res) => {
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: res.msg,
              onClose: () => {
                loading.value = false
                // 保存用户信息并将token存到本地和state
                mainStore.userInfo = res.data
                localStorage.setItem('token', res.data.token)
                // 跳转到上次的位置
                if (route.query.redirect) {
                  router.replace(route.query.redirect)
                } else {
                  router.replace('/')
                }
              },
            })
          } else {
            ElMessage.error(res.msg)
            loading.value = false
          }
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  return { loginForm, login, ruleFormRef, formRules, loading }
}
