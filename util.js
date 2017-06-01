//是不是ie
function isIE() {
    return !-[1,];
}

//判断是否是object类型
function isObject(input) {
    return Object.prototype.toString.apply(input) === "[object Object]"
}

//判断是否是Array类型
function isArray(input) {
    return Object.prototype.toString.apply(input) === "[object Array]"
}

//判断el是否包含在root中
function contains(root, el) {
    if (!root || !el) return false;
    if (root.compareDocumentPosition) {
        return root === el || !!(root.compareDocumentPosition(el) & 16);
    }
    if (root.contains && el.nodeType === 1) {
        return root.contains(el) && root !== el;
    }
    while (el = el.parentNode) {
        if (el === root) return true;
    }
    return false;
}

//和默认对象合并
function defaults(defs, obj) {
    for (var key in defs) {
        if (!obj.hasOwnProperty(key) || obj[key] == null) {
            obj[key] = defs[key];
        }
    }
    return obj;
};

//拷贝，最后加上true代表深拷贝
function assign(target) {
    var length = arguments.length;
    var deep = typeof arguments[length - 1] === "boolean" ? arguments[length - 1] : false;
    for (var i = 1; i < length; i++) {
        var source = arguments[i];
        if (!isObject(source)) continue;
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                var value = source[key];
                if (deep && isObject(value)) {
                    value = assign({}, value)
                }
                target[key] = value;
            }
        }
    }
    return target;
}

//取出输入arr1和arr2的差集
function diff(arr1, arr2) {
    return arr1.filter(x => {
        return arr2.indexOf(x) === -1
    });
};

//去除数组里的空值
function compact(array) {
    var output = [];
    array.forEach(function (i) {
        if (i) { output.push(i); }
    })
    return output;
}

//去重
function unique(array) {
    var result = [];
    var dictionary = {};
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (!dictionary[value]) {
            dictionary[value] = true;
            result.push(value);
        }
    }
    return result;
}

//打平数组
function flatten(array) {
    var output = [], index = 0;;
    for (let i = 0; i < array.length; i++) {
        var value = array[i];
        if (isArray(value)) {
            value = flatten(value);
            var j = 0, len = value.length;
            output.length += len;
            while (j < len) {
                output[index++] = value[j++];
            }
        } else {
            output[index++] = value;
        }
    }
    return output;
}

//去除字符串前后的空格
function trim(str) {
    return str == null ? "" : (str + '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}

//绑定事件兼容
function addEvent(el, event, listener) {
    if (el.addEventListener) {
        el.addEventListener(event, listener, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + event, listener);
    } else {
        el['on' + event] = listener;
    }
}

//事件代理
function delegateEvent(parent, childTag, ev, listener) {
    addEvent(parent, ev, function () {
        var target = event.target || event.srcElement;
        if ((parent !== childTag) && (target.tagName == childTag.toUpperCase())) {
            listener.call(target, event);
        }
    })
}

//插入后面
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//增加class
function addClass(el, className) {
    var oldClass = el.className;
    if (!~oldClass.indexOf(className)) {
        el.className = oldClass === "" ? className : oldClass + " " + className;
    }
}

//移除class
function removeClass(el, className) {
    var oldClass = el.className;
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = oldClass.replace(reg, "");
}

//获取浏览器滚动条的宽度
function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return w1 - w2;
};

//超长加省略号
function ellipsis(selector, innerSelector) {
    document.querySelectorAll(selector).forEach(function (item) {
        let outerHeight = item.offsetHeight;
        let innerText = item.querySelector(innerSelector);
        if (!innerText) return;
        var times = 20;
        while (innerText.offsetHeight > outerHeight && times--) {
            let text = innerText.innerText;
            innerText.innerText = text.replace(/([\S\s])\.\.\.$|[\S\s]$/, '...');
        }
    })
}

var requestAnimationFrame = window.requestAnimationFrame ||  window.webkitRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    
function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}

function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
}

function getBoundingClientRect(element) {
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;

    if (element.getBoundingClientRect) {
        if (typeof arguments.callee.offset != "number") {
            var temp = document.createElement("div");
            temp.style.cssText = "position: absolute;left: 0;top: 0;"
            document
                .body
                .appendChild(temp);
            arguments.callee.offset = -temp
                .getBoundingClientRect()
                .top - scrollTop;
            document
                .body
                .removeChild(temp);
            temp = null;
        }

        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;

        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        }
    } else {
        var actualTop = getElementTop(element);
        var actualLeft = getElementLeft(element);

        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - screenTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}
