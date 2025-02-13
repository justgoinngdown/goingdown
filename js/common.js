// 通用工具函数
const utils = {
    // 格式化日期
    formatDate: (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 动画数字增长
    animateNumber: (element, start, end, duration = 2000) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    },

    // 懒加载图片
    lazyLoadImages: () => {
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
    },

    // 平滑滚动
    smoothScroll: (target) => {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    },

    // 显示加载动画
    showLoading: () => {
        const loading = document.createElement('div');
        loading.className = 'loading-spinner';
        loading.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loading);
    },

    // 隐藏加载动画
    hideLoading: () => {
        const loading = document.querySelector('.loading-spinner');
        if (loading) {
            loading.remove();
        }
    },

    // 显示错误消息
    showError: (message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化懒加载
    utils.lazyLoadImages();

    // 初始化平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                utils.smoothScroll(target);
            }
        });
    });

    // 添加页面过渡动画
    document.body.classList.add('page-loaded');
});

// 导出工具函数
window.utils = utils; 