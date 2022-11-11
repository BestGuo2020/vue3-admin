export function saveUserInfo(userinfo, role, userdrawer) {
  // 校验
  const rules = {
    username: [
      {
        required: true,
        message: '该项为必须填',
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: '该项为必须填',
        trigger: 'blur',
      },
      {
        validator: (rule, value, callback) => {
          const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!regex.test(value)) {
            return callback(new Error('邮箱格式不正确'))
          }
          return callback()
        },
        trigger: 'blur',
      },
    ],
    age: [{ required: false }],
  }

  // 表单数据
  const formData = reactive({
    userinfo: {
      username: '',
      email: '',
      age: '',
    },
    role: '',
  })
  const settingFormRef = ref(null)

  // 打开抽屉，装载数据
  function load() {
    formData.userinfo = {
      username: userinfo.username,
      email: userinfo.email,
      age: userinfo.age,
    }

    formData.role = role
  }

  // 关闭抽屉，卸载数据
  function unload() {
    formData.userinfo = {
      username: '',
      email: '',
      age: '',
    }

    formData.role = ''
  }

  // 提交用户信息
  function onSubmit(formEl) {
    formEl.validate(valid => {
      console.log(valid)
      if (valid) {
        console.log('数据保存')
        userdrawer.value = false
      }
    })
  }

  // 改变角色
  function changeRole() {
    // todo
    console.log('角色变更')
    location.reload()
  }

  return { rules, formData, settingFormRef, load, unload, onSubmit, changeRole }
}
