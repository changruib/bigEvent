$(function () {
  getUserInfo()

  const layer = layui.layer
  $('#btnLogout').on('click', () => {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', {
      icon: 3,
      title: '提示'
    }, (index) => {
      // 清空本地存储的token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'
      // 关闭询问框
      layer.close(index)
    })
  })
})

function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // 配置响应头对象
    // herders: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('身份认证失败！')
      }
      // 渲染用户头像
      renderAvatar(res.data)
    },
    /* // 不论成功还是失败，最终都会调用 complete 回调函数
    complete: function (res) { 
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    } */
  });
}

function renderAvatar(user) {
  // 获取用户名称
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}