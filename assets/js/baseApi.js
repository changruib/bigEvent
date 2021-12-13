$.ajaxPrefilter(function (options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  
  // 为 /my 请求路径设置响应头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
    Authorization: localStorage.getItem('token') || ''
    }
  }

  // 配置全局回调函数
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
  }
})