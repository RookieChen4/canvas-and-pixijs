function throttle(func, wait, options) {
    let context, args, timeout;
    let old = 0; //时间戳
    if(!options) options = {};
    let later = function () {
        old = new Date().valueOf(); //重新计算时间戳
        timeout = null;
        func.apply(context, args);
    }
    return function() {
        context = this;
        args = arguments;
        let now = new Date().valueOf();
        if(options.leading === false && !old) {
            old = now;
        }
        if(now-old > wait) {
            if(timeout) {
                clearTimeout(timeout);//防止重复执行
                timeout = null;
            }
            func.apply(context, args);
            old = now;
        } else if(!timeout && options.trailing !== false) {
            timeout = setTimeout(later, wait);
        }
    }
}