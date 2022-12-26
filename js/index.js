window.addEventListener('load', function () {
    // 获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 1、当鼠标经过focus时，左右箭头出现
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        // 鼠标停在focus上 定时器停止
        clearInterval(timer);
        timer = null; // 清除定时器变量
    })
    // 当鼠标离开focus时，左右箭头消失
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            next.click();
        }, 2000)
    })
    // 2、要让小圆圈随着图片数量的变化而变化
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li（小圆圈）
        var li = document.createElement('li');
        // 自定义属性
        li.setAttribute('index', i);
        // 将小圆圈添加到ol中
        ol.appendChild(li);
        // 3、点击哪个小圆圈，就将它的类变成current (排他思想)
        li.addEventListener('click', function () {
            // 先排除其他的
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 再给当前的小圆圈添加current
            this.className = 'current';
            // 4、点击小圆圈，图片随之变动(实质上就是改变ul的位置),图片移动的距离：-小圆圈的索引*focus的宽度
            var index = this.getAttribute('index');
            // 处理bug，点击小圆圈时要将num与它的index同步
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';
    // 5、复制第一张图片放到最后，实现无缝链接
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6、点击右侧按钮，图片会滑动  滑动距离：先定义一个num变量，让num++，滑动距离就是num*focusWidth
    var num = 0;
    // 7、小圆圈要随右侧箭头的点击而变化 定义一个circle变量 circle++
    var circle = 0;
    // 节流阀
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 当我滑倒最后一张复制的图片时，让它迅速到第一张，无缝衔接到下一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 排他思想
            circleChange();
        }
    })
    // 8、左侧按钮
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 当我滑倒第一张复制的图片时，让它迅速到最后一张，无缝衔接到倒数第二张
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })
    // 9、自动播放
    var timer = setInterval(function () {
        // 手动调用点击事件
        next.click();
    }, 2000)
    function circleChange() {
        // 排他思想
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
})