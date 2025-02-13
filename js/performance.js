// 性能监控和优化

// 性能指标收集
export function collectPerformanceMetrics() {
    // 使用Performance API收集性能数据
    const performanceData = {
        // 页面加载时间
        loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
        // DOM加载时间
        domReadyTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart,
        // 首次内容绘制时间
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        // 首次有意义内容绘制时间
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
    };

    // 发送性能数据到分析服务器
    sendToAnalytics('performance', performanceData);
}

// 资源预加载
export function preloadResources() {
    // 预加载关键图片
    const criticalImages = [
        '/images/logo.png',
        '/images/hero-banner.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // 预加载关键脚本
    const criticalScripts = [
        '/js/main.js',
        '/js/components.js'
    ];

    criticalScripts.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        document.head.appendChild(link);
    });
}

// 图片懒加载优化
export function optimizeImages() {
    // 使用Intersection Observer实现图片懒加载
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // 观察所有带有data-src属性的图片
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 代码分割和按需加载
export function initLazyLoading() {
    // 延迟加载非关键组件
    const lazyComponents = document.querySelectorAll('[data-lazy-component]');
    
    const componentObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const component = entry.target;
                const componentName = component.dataset.lazyComponent;
                
                // 动态导入组件
                import(`./components/${componentName}.js`)
                    .then(module => {
                        module.default(component);
                        observer.unobserve(component);
                    })
                    .catch(error => console.error(`Error loading component: ${componentName}`, error));
            }
        });
    });

    lazyComponents.forEach(component => {
        componentObserver.observe(component);
    });
}

// 缓存管理
export const cache = {
    // 设置缓存
    set(key, value, ttl = 3600) {
        const item = {
            value,
            expiry: Date.now() + (ttl * 1000)
        };
        localStorage.setItem(key, JSON.stringify(item));
    },

    // 获取缓存
    get(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const data = JSON.parse(item);
        if (Date.now() > data.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return data.value;
    },

    // 清除过期缓存
    cleanup() {
        Object.keys(localStorage).forEach(key => {
            this.get(key); // 获取时会自动清理过期项
        });
    }
};

// 性能监控
export function monitorPerformance() {
    // 监控页面加载性能
    window.addEventListener('load', () => {
        collectPerformanceMetrics();
    });

    // 监控资源加载失败
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
            sendToAnalytics('resource_error', {
                type: e.target.tagName.toLowerCase(),
                src: e.target.src || e.target.href,
                error: e.error?.message || 'Resource loading failed'
            });
        }
    }, true);

    // 监控JavaScript错误
    window.addEventListener('error', (e) => {
        if (!e.target.tagName) { // 非资源加载错误
            sendToAnalytics('js_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error?.stack
            });
        }
    });

    // 监控网络请求
    if (window.PerformanceObserver) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.initiatorType === 'xmlhttprequest' || entry.initiatorType === 'fetch') {
                    sendToAnalytics('api_performance', {
                        url: entry.name,
                        duration: entry.duration,
                        startTime: entry.startTime,
                        initiatorType: entry.initiatorType
                    });
                }
            });
        });

        observer.observe({ entryTypes: ['resource'] });
    }
}

// 发送数据到分析服务器
function sendToAnalytics(eventType, data) {
    // 使用 Navigator.sendBeacon() 发送数据，避免阻塞页面卸载
    const analyticsUrl = 'https://your-analytics-endpoint.com/collect';
    const payload = {
        eventType,
        data,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };

    if (navigator.sendBeacon) {
        navigator.sendBeacon(analyticsUrl, JSON.stringify(payload));
    } else {
        // 降级方案：使用同步 XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('POST', analyticsUrl, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(payload));
    }
}

// 初始化性能优化
export function initPerformanceOptimizations() {
    // 预加载资源
    preloadResources();
    
    // 优化图片加载
    optimizeImages();
    
    // 初始化延迟加载
    initLazyLoading();
    
    // 清理过期缓存
    cache.cleanup();
    
    // 启动性能监控
    monitorPerformance();
}

// 导出所有功能
export default {
    collectPerformanceMetrics,
    preloadResources,
    optimizeImages,
    initLazyLoading,
    cache,
    monitorPerformance,
    initPerformanceOptimizations
}; 