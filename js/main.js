// 导入工具函数
import { debounce, throttle, storage, validate } from './utils.js';

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化导航菜单
    initNavigation();
    // 初始化滚动事件
    initScroll();
    // 初始化表单验证
    initForms();
    // 初始化响应式处理
    initResponsive();
});

// 初始化导航菜单
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 添加当前页面高亮
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// 初始化滚动事件
function initScroll() {
    // 返回顶部按钮
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }, 200));

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 滚动时固定导航栏
    const header = document.querySelector('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > headerHeight) {
                header.classList.add('fixed');
                document.body.style.paddingTop = headerHeight + 'px';
            } else {
                header.classList.remove('fixed');
                document.body.style.paddingTop = '0';
            }
        }, 200));
    }
}

// 初始化表单验证
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const formData = new FormData(form);
            
            // 验证邮箱
            const email = formData.get('email');
            if (email && !validate.email(email)) {
                showError(form.querySelector('[name="email"]'), '请输入有效的邮箱地址');
                isValid = false;
            }
            
            // 验证手机号
            const phone = formData.get('phone');
            if (phone && !validate.phone(phone)) {
                showError(form.querySelector('[name="phone"]'), '请输入有效的手机号码');
                isValid = false;
            }
            
            if (isValid) {
                // 提交表单
                submitForm(form, formData);
            }
        });
    });
}

// 显示表单错误信息
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

// 提交表单
async function submitForm(form, formData) {
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });
        
        if (response.ok) {
            showMessage('提交成功！', 'success');
            form.reset();
        } else {
            throw new Error('提交失败');
        }
    } catch (error) {
        showMessage('提交失败，请稍后重试', 'error');
    }
}

// 显示消息提示
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// 初始化响应式处理
function initResponsive() {
    // 响应式图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 响应式视频处理
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            video.setAttribute('controls', '');
        }
    });
}

// 导出主要函数
export {
    initNavigation,
    initScroll,
    initForms,
    initResponsive,
    showMessage
}; 