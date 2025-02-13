/**
 * 常用工具函数库
 */

// 防抖函数
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 获取URL参数
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 格式化日期
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

// 深拷贝对象
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    const copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = deepClone(obj[key]);
        }
    }
    return copy;
}

// 检查设备类型
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// 检查浏览器类型
function getBrowserType() {
    const ua = navigator.userAgent;
    if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return 'Opera';
    if (ua.indexOf("Edge") > -1) return 'Edge';
    if (ua.indexOf("Chrome") > -1) return 'Chrome';
    if (ua.indexOf("Safari") > -1) return 'Safari';
    if (ua.indexOf("Firefox") > -1) return 'Firefox';
    if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident/") > -1) return 'IE';
    return 'Unknown';
}

// 本地存储封装
const storage = {
    set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    get(key) {
        let value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch(e) {
            return value;
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
};

// 表单验证
const validate = {
    email(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    phone(phone) {
        return /^1[3456789]\d{9}$/.test(phone);
    },
    url(url) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url);
    },
    idCard(id) {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id);
    }
};

// 导出工具函数
export {
    debounce,
    throttle,
    getUrlParam,
    formatDate,
    deepClone,
    getDeviceType,
    getBrowserType,
    storage,
    validate
}; 