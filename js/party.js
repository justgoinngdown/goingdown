// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 显示加载动画
        utils.showLoading();
        
        // 初始化统计数据
        initializeStats();
        
        // 加载党建数据
        const data = await loadPartyData();
        if (data) {
            // 更新页面标题和描述
            updatePageHeader(data);
            // 更新各个部分的内容
            updateSections(data);
        } else {
            showErrorMessage();
        }
        
        // 添加动画效果
        initializeAnimations();
        
        // 隐藏加载动画
        utils.hideLoading();
    } catch (error) {
        console.error('页面初始化失败:', error);
        utils.hideLoading();
        utils.showError('页面加载失败，请刷新重试');
    }
});

// 初始化统计数据
function initializeStats() {
    // 获取统计元素
    const partyMembers = document.getElementById('party-members');
    const activities = document.getElementById('activities');
    const trainingHours = document.getElementById('training-hours');

    // 使用通用工具函数设置初始值
    if (partyMembers) utils.animateNumber(partyMembers, 0, 25, 2000); // 党员人数
    if (activities) utils.animateNumber(activities, 0, 12, 2000); // 年度活动次数
    if (trainingHours) utils.animateNumber(trainingHours, 0, 120, 2000); // 培训学时
}

// 加载党建数据
async function loadPartyData() {
    try {
        const response = await fetch('./data/party/page.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('加载党建数据失败:', error);
        utils.showError('数据加载失败，请稍后重试');
        return null;
    }
}

// 显示错误提示
function showErrorMessage() {
    const sections = ['news-grid', 'organization-chart', 'education-content', 'activities-grid', 'achievements-grid'];
    sections.forEach(sectionClass => {
        const element = document.querySelector('.' + sectionClass);
        if (element) {
            element.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem;">
                    <i class="fas fa-exclamation-circle" style="color: #c7000b; font-size: 2rem;"></i>
                    <p style="margin-top: 1rem; color: #666;">数据加载失败，请稍后重试</p>
                </div>
            `;
        }
    });
}

// 更新页面头部信息
function updatePageHeader(data) {
    const description = document.querySelector('.page-header .description');
    if (description && data.description) {
        description.textContent = data.description;
    }
}

// 更新各个部分内容
function updateSections(data) {
    if (!data || !data.sections) {
        console.error('无效的数据格式');
        return;
    }

    // 更新党建动态
    const newsSection = data.sections.find(s => s.id === 'party-news');
    if (newsSection) updateNewsSection(newsSection);

    // 更新党建活动
    const activitiesSection = data.sections.find(s => s.id === 'party-activities');
    if (activitiesSection) updateActivitiesSection(activitiesSection);
}

// 更新党建动态部分
function updateNewsSection(newsData) {
    if (!newsData || !newsData.items) return;
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = newsData.items.map(news => renderNews(news)).join('');
}

// 渲染新闻列表
function renderNews(news) {
    return `
        <div class="news-item">
            <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.onerror=null; this.src='./images/party/default.svg';">
            <div class="news-content">
                <h3>${news.title}</h3>
                <p class="news-date">${utils.formatDate(news.date)}</p>
                <p class="news-summary">${news.summary}</p>
                <a href="${news.link}" class="news-link">查看详情</a>
            </div>
        </div>
    `;
}

// 更新党建活动部分
function updateActivitiesSection(activitiesData) {
    if (!activitiesData || !activitiesData.items) return;
    const activitiesGrid = document.querySelector('.activities-grid');
    if (!activitiesGrid) return;

    activitiesGrid.innerHTML = activitiesData.items.map(activity => renderActivity(activity)).join('');
}

// 渲染活动列表
function renderActivity(activity) {
    return `
        <div class="activity-item">
            <img src="${activity.image}" alt="${activity.title}" class="activity-image" onerror="this.onerror=null; this.src='./images/party/default.svg';">
            <div class="activity-content">
                <h3>${activity.title}</h3>
                <p class="activity-date">${utils.formatDate(activity.date)}</p>
                <p class="activity-description">${activity.description}</p>
            </div>
        </div>
    `;
}

// 初始化动画效果
function initializeAnimations() {
    // 监听滚动事件，添加动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 为所有需要动画的元素添加观察器
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// 错误处理函数
function handleError(error, message) {
    console.error(message, error);
    // 可以在这里添加用户友好的错误提示
} 