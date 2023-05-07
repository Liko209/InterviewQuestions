function throttle(fn, wait) {
    let pre = Date.now();
    return function () {
        let context = this;
        let args = arguments;
        let now = Date.now();
        if (now - pre >= wait) {
            fn.apply(context, args);
            pre = now;
        }
    }
}

function throttle(fn, wait) {
    let timeout = null;
    let pre = Date.now();
    return function () {
        let context = this;
        let args = arguments;
        let now = Date.now();
        let remaining = wait - (now - pre);
        if (timeout) clearTimeout(timeout);
        if (remaining <= 0) {
            fn.apply(context, args);
            pre = now;
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args);
            }, remaining)
        }
    }
}