/**
 * 警告对话框
 *
 * @param {String} content 内容
 */
export function warningConfirm(content) {
  return ElMessageBox.confirm(content, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
}

/**
 * 消息提示
 *
 * @param content 标题
 * @param title 内容
 * @param callback 回调函数
 */
export function alert(content, call) {
  if (call) {
    ElMessageBox.alert(content, '提示', {
      confirmButtonText: '确定',
      callback: (action) => call(action),
    })
  } else {
    ElMessageBox.alert(content, '提示', {
      confirmButtonText: '确定',
    })
  }
}
