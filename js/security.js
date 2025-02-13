// 安全相关功能

// CSP配置
export function setupCSP() {
    const meta = document.createElement('meta');
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://hm.baidu.com;
        style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
        img-src 'self' data: https:;
        font-src 'self' https://cdnjs.cloudflare.com;
        connect-src 'self' https://api.your-domain.com;
        frame-src 'self';
        object-src 'none';
    `;
    document.head.appendChild(meta);
}

// XSS防护
export function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// CSRF防护
export function setupCSRFProtection() {
    // 生成CSRF令牌
    const csrfToken = generateRandomToken();
    
    // 存储令牌
    localStorage.setItem('csrfToken', csrfToken);
    
    // 为所有表单添加CSRF令牌
    document.querySelectorAll('form').forEach(form => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'csrf_token';
        input.value = csrfToken;
        form.appendChild(input);
    });
    
    // 为所有AJAX请求添加CSRF令牌
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        const originalOpen = xhr.open;
        
        xhr.open = function() {
            const args = Array.from(arguments);
            originalOpen.apply(xhr, args);
            xhr.setRequestHeader('X-CSRF-Token', csrfToken);
        };
        
        return xhr;
    };
}

// 生成随机令牌
function generateRandomToken() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// 密码强度检查
export function checkPasswordStrength(password) {
    const result = {
        score: 0,
        feedback: []
    };
    
    // 长度检查
    if (password.length < 8) {
        result.feedback.push('密码长度至少需要8个字符');
    } else {
        result.score += 1;
    }
    
    // 包含数字
    if (/\d/.test(password)) {
        result.score += 1;
    } else {
        result.feedback.push('密码需要包含数字');
    }
    
    // 包含小写字母
    if (/[a-z]/.test(password)) {
        result.score += 1;
    } else {
        result.feedback.push('密码需要包含小写字母');
    }
    
    // 包含大写字母
    if (/[A-Z]/.test(password)) {
        result.score += 1;
    } else {
        result.feedback.push('密码需要包含大写字母');
    }
    
    // 包含特殊字符
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        result.score += 1;
    } else {
        result.feedback.push('密码需要包含特殊字符');
    }
    
    return result;
}

// 防止点击劫持
export function preventClickjacking() {
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }
}

// 输入限制和验证
export function setupInputValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            
            // 验证所有必填字段
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, '此字段为必填项');
                }
            });
            
            // 验证邮箱
            form.querySelectorAll('[type="email"]').forEach(input => {
                if (input.value && !isValidEmail(input.value)) {
                    isValid = false;
                    showError(input, '请输入有效的邮箱地址');
                }
            });
            
            // 验证手机号
            form.querySelectorAll('[type="tel"]').forEach(input => {
                if (input.value && !isValidPhone(input.value)) {
                    isValid = false;
                    showError(input, '请输入有效的手机号码');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// 错误提示
function showError(input, message) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = message;
    } else {
        const div = document.createElement('div');
        div.className = 'error-message';
        div.textContent = message;
        input.parentNode.insertBefore(div, input.nextSibling);
    }
    input.classList.add('error');
}

// 邮箱验证
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 手机号验证
function isValidPhone(phone) {
    return /^1[3456789]\d{9}$/.test(phone);
}

// 防止暴力破解
export class BruteForceProtection {
    constructor(maxAttempts = 5, lockoutTime = 30 * 60 * 1000) {
        this.maxAttempts = maxAttempts;
        this.lockoutTime = lockoutTime;
        this.attempts = new Map();
    }
    
    checkAttempt(userId) {
        const now = Date.now();
        const userAttempts = this.attempts.get(userId);
        
        if (!userAttempts) {
            this.attempts.set(userId, {
                count: 1,
                lastAttempt: now
            });
            return true;
        }
        
        if (now - userAttempts.lastAttempt > this.lockoutTime) {
            // 重置尝试次数
            this.attempts.set(userId, {
                count: 1,
                lastAttempt: now
            });
            return true;
        }
        
        if (userAttempts.count >= this.maxAttempts) {
            return false;
        }
        
        userAttempts.count++;
        userAttempts.lastAttempt = now;
        return true;
    }
    
    getRemainingAttempts(userId) {
        const userAttempts = this.attempts.get(userId);
        if (!userAttempts) return this.maxAttempts;
        return Math.max(0, this.maxAttempts - userAttempts.count);
    }
    
    getLockoutTime(userId) {
        const userAttempts = this.attempts.get(userId);
        if (!userAttempts || userAttempts.count < this.maxAttempts) return 0;
        
        const remainingTime = this.lockoutTime - (Date.now() - userAttempts.lastAttempt);
        return Math.max(0, remainingTime);
    }
}

// 初始化安全措施
export function initSecurity() {
    setupCSP();
    setupCSRFProtection();
    preventClickjacking();
    setupInputValidation();
}

// 导出所有安全功能
export default {
    setupCSP,
    sanitizeInput,
    setupCSRFProtection,
    checkPasswordStrength,
    preventClickjacking,
    setupInputValidation,
    BruteForceProtection,
    initSecurity
}; 