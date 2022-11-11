/**
 * 通用的表单验证
 */
export default {
  required: {
    required: true,
    message: '该项为必填项',
    trigger: 'blur',
  },
  number: { type: 'number', message: '该项必项是一个数字', trigger: 'blur' },
  email: {
    validator: (rule, value, callback) => {
      const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!regex.test(value)) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    },
    trigger: 'blur',
  },
  phone: {
    validator: (rule, value, callback) => {
      const regex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!regex.test(value)) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    },
    trigger: 'blur',
  },
}
