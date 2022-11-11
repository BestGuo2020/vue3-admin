import commonValidate from '@/utils/validator-common'

export function avatarUpload() {
  function uploadSuccess(resp) {
    console.log('上传成功', resp)
  }

  function uploadError(error) {
    console.log('上传失败', error)
  }

  return { uploadSuccess, uploadError }
}

export function saveUserInfo(userinfo, role, userdrawer) {
  // 校验
  const rules = {
    username: [commonValidate.required],
    email: [commonValidate.required, commonValidate.email],
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
