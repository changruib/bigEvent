$(function () {
  const form = layui.form
  const layer = layui.layer
  
  form.verify({
    nickname: function (value) {
      if (value.length > 6 || value.length < 1) {
        return '昵称的长度必须在1-6个字符之间'
      }
    }
  })

  initUserInfo()
  // 初始化用户信息
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status === 1) {
          return layer.msg('请求用户信息失败')
        }
        // console.log(res);
        form.val('form-UserInfo',res.data)
      }
    });
  }

  // 重置表单
  $('#btnReset').on('click', (e) => {
    e.preventDefault()
    initUserInfo()
  })

  // 提交信息
  $('.layui-form').on('submit', (e) => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $('.layui-form').serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('成功更改信息！')
        // 调用父页面的方法重新渲染页面信息
        window.parent.getUserInfo()
      }
    })
  })
})