$(function () {
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.register-box').show()
  })
  
  $('#link-login').on('click', function () {
    $('.register-box').hide()
    $('.login-box').show()
  })

  // 从 layui 中获取 form 对象
  var form = layui.form
  const layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
    repwd:function (value) {
      var pwd = $('.register-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听表单的提交事件
  $('#form-reg').on('submit', (e) => {
    e.preventDefault()
    var data = {
      username: $('#form-reg [name=username]').val(),
      password: $('#form-reg [name=password]').val()
    }
    $.post('/api/reguser', data, (res) => {
        if (res.status !== 0) {
        return layer.msg(res.message)
        }
        layer.msg(res.message)
        $('#link-login').click()
    })
  })

  $('#form-login').submit((e) => {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/api/login",
      // 快速获取表单中的数据
      data: $('#form-login').serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('登陆失败!')
        }
        layer.msg('登陆成功!')
        // 将登陆成功得到的 token 字符串保存到localstorage 中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        // location.href = '/index.html'
      }
    });
  })
})