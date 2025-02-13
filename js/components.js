// 导入工具函数
import { debounce, throttle } from './utils.js';

// 模态框组件
export class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.init();
    }

    init() {
        if (!this.modal) return;
        
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // 点击模态框外部关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 手风琴组件
export class Accordion {
    constructor(element) {
        this.accordion = element;
        this.init();
    }

    init() {
        const headers = this.accordion.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                
                // 关闭其他项
                this.accordion.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                });

                // 切换当前项
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// 轮播图组件
export class Carousel {
    constructor(element, options = {}) {
        this.carousel = element;
        this.options = {
            autoplay: options.autoplay || true,
            interval: options.interval || 5000,
            ...options
        };
        this.currentIndex = 0;
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.init();
    }

    init() {
        // 创建指示器
        this.createIndicators();
        
        // 创建控制按钮
        this.createControls();
        
        // 自动播放
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    createIndicators() {
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        
        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.addEventListener('click', () => this.goTo(index));
            indicators.appendChild(dot);
        });
        
        this.carousel.appendChild(indicators);
    }

    createControls() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-control prev';
        prevBtn.innerHTML = '&lt;';
        prevBtn.addEventListener('click', () => this.prev());
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-control next';
        nextBtn.innerHTML = '&gt;';
        nextBtn.addEventListener('click', () => this.next());
        
        this.carousel.appendChild(prevBtn);
        this.carousel.appendChild(nextBtn);
    }

    goTo(index) {
        this.items[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.items[this.currentIndex].classList.add('active');
        this.updateIndicators();
    }

    prev() {
        const index = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
        this.goTo(index);
    }

    next() {
        const index = this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1;
        this.goTo(index);
    }

    updateIndicators() {
        const dots = this.carousel.querySelectorAll('.carousel-indicators button');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), this.options.interval);
        
        // 鼠标悬停时暂停
        this.carousel.addEventListener('mouseenter', () => {
            clearInterval(this.autoplayInterval);
        });
        
        // 鼠标离开时恢复
        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
}

// 标签页组件
export class Tabs {
    constructor(element) {
        this.tabs = element;
        this.init();
    }

    init() {
        const tabList = this.tabs.querySelector('.tabs-list');
        const tabPanels = this.tabs.querySelector('.tabs-panels');
        
        if (!tabList || !tabPanels) return;
        
        const tabs = tabList.querySelectorAll('.tab');
        const panels = tabPanels.querySelectorAll('.tab-panel');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // 移除所有活动状态
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // 激活当前标签和面板
                tab.classList.add('active');
                panels[index].classList.add('active');
            });
        });
    }
}

// 下拉菜单组件
export class Dropdown {
    constructor(element) {
        this.dropdown = element;
        this.init();
    }

    init() {
        const trigger = this.dropdown.querySelector('.dropdown-trigger');
        const content = this.dropdown.querySelector('.dropdown-content');
        
        if (!trigger || !content) return;
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dropdown.classList.toggle('active');
        });
        
        // 点击外部关闭
        document.addEventListener('click', () => {
            this.dropdown.classList.remove('active');
        });
        
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// 图片懒加载
export function initLazyLoading() {
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
}

// 平滑滚动
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 返回顶部按钮
export function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, 200));
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 导出所有组件
export default {
    Modal,
    Accordion,
    Carousel,
    Tabs,
    Dropdown,
    initLazyLoading,
    initSmoothScroll,
    initBackToTop
}; 