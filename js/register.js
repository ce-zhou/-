window.addEventListener('load', function () {
    // 正则表达式
    var regtel = /^1[3|4|5|7|8]\d{9}$/; // 手机号的正则表达式
    var regqq = /^[1-9]\d{4,}$/; // qq号正则表达式
    var reguser = /^[\u4e00-\u9fa5]{2,8}$/; // 用户名正则表达式
    var regmsg = /^\d{6}$/; // 短信验证码的正则表达式
    var regpaw = /^[\w-]{6,16}$/; // \w就等于[a-zA-Z0-9_-]不加-，登陆密码正则表达式
    // 获取元素
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var username = document.querySelector('#user');
    var message = document.querySelector('#msg');
    var password = document.querySelector('#paw');
    var pass = document.querySelector('#pass');
    // 函数调用
    regexp(tel, regtel);
    regexp(qq, regqq);
    regexp(username, reguser);
    regexp(message, regmsg);
    regexp(password, regpaw);
    // 注册事件 将他封装成一个函数，方便每一个元素调用
    function regexp(ele, reg) {
        ele.addEventListener('blur', function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'right';
                this.nextElementSibling.innerHTML = '<i class="right_icon"></i> 用户输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入';
            }
        })
    }
    // 比较登陆密码和确认密码
    pass.addEventListener('blur', function () {
        if (this.value === password.value) {
            this.nextElementSibling.className = 'right';
            this.nextElementSibling.innerHTML = '<i class="right_icon"></i> 用户输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 密码不一致，请从新输入';
        }
    })
})