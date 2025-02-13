// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化统计数据
    initializeStats();
    // 加载党建数据
    loadPartyData();
    // 添加动画效果
    initializeAnimations();
});

// 初始化统计数据
function initializeStats() {
    // 获取统计元素
    const partyMembers = document.getElementById('party-members');
    const activities = document.getElementById('activities');
    const trainingHours = document.getElementById('training-hours');

    // 设置初始值
    if (partyMembers) animateNumber(partyMembers, 0, 25, 2000); // 党员人数
    if (activities) animateNumber(activities, 0, 12, 2000); // 年度活动次数
    if (trainingHours) animateNumber(trainingHours, 0, 120, 2000); // 培训学时
}

// 数字动画效果
function animateNumber(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        current = start + (elapsed / duration) * range;

        if (current >= end) {
            element.textContent = Math.round(end);
            return;
        }

        element.textContent = Math.round(current);
        requestAnimationFrame(updateNumber);
    }

    requestAnimationFrame(updateNumber);
}

// 加载党建数据
async function loadPartyData() {
    try {
        const response = await fetch('/data/party/page.json');
        const data = await response.json();

        // 更新页面标题和描述
        updatePageHeader(data);
        // 更新各个部分的内容
        updateSections(data);
    } catch (error) {
        console.error('加载党建数据失败:', error);
        // 显示错误提示
        showErrorMessage();
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
    // 更新党建动态
    updateNewsSection(data.sections.find(s => s.id === 'party-news'));
    // 更新党组织架构
    updateOrganizationSection(data.sections.find(s => s.id === 'party-organization'));
    // 更新党员教育
    updateEducationSection(data.sections.find(s => s.id === 'party-education'));
    // 更新党建活动
    updateActivitiesSection(data.sections.find(s => s.id === 'party-activities'));
    // 更新党建成果
    updateAchievementsSection(data.sections.find(s => s.id === 'party-achievements'));
}

// 更新党建动态部分
function updateNewsSection(newsData) {
    if (!newsData) return;
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = newsData.items.map(news => `
        <article class="news-item animate__animated animate__fadeIn">
            <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.onerror=null; this.src='/images/party/default.svg';">
            <div class="news-content">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-date">${news.date}</p>
                <p>${news.summary}</p>
                <a href="${news.link}" class="btn-party">阅读更多</a>
            </div>
        </article>
    `).join('');
}

// 更新党组织架构部分
function updateOrganizationSection(orgData) {
    if (!orgData) return;
    const orgChart = document.querySelector('.organization-chart');
    if (!orgChart) return;

    // 生成组织架构HTML
    const createOrgLevel = (items) => `
        <div class="org-level">
            ${items.map(item => `
                <div class="org-item">
                    <h4>${item.title}</h4>
                    <p>${item.name}</p>
                </div>
            `).join('')}
        </div>
    `;

    orgChart.innerHTML = orgData.items.map(level => createOrgLevel(level.items)).join('');
}

// 更新党员教育部分
function updateEducationSection(eduData) {
    if (!eduData) return;
    const eduContent = document.querySelector('.education-content');
    if (!eduContent) return;

    eduContent.innerHTML = eduData.items.map(edu => `
        <div class="education-item animate__animated animate__fadeIn">
            <h3 class="education-title">${edu.title}</h3>
            <p>${edu.description}</p>
            ${edu.resources ? `
                <div class="resources">
                    ${edu.resources.map(resource => `
                        <a href="${resource.link}" class="btn-party" target="_blank">
                            <i class="fas ${resource.icon}"></i> ${resource.title}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// 更新党建活动部分
function updateActivitiesSection(activitiesData) {
    if (!activitiesData) return;
    const activitiesGrid = document.querySelector('.activities-grid');
    if (!activitiesGrid) return;

    activitiesGrid.innerHTML = activitiesData.items.map(activity => `
        <div class="activity-item animate__animated animate__fadeIn">
            <img src="${activity.image}" alt="${activity.title}" class="activity-image" onerror="this.onerror=null; this.src='/images/party/default.svg';">
            <div class="activity-content">
                <h3 class="activity-title">${activity.title}</h3>
                <p class="activity-date">${activity.date}</p>
                <p>${activity.description}</p>
            </div>
        </div>
    `).join('');
}

// 更新党建成果部分
function updateAchievementsSection(achievementsData) {
    if (!achievementsData) return;
    const achievementsGrid = document.querySelector('.achievements-grid');
    if (!achievementsGrid) return;

    achievementsGrid.innerHTML = achievementsData.items.map(achievement => `
        <div class="achievement-item animate__animated animate__fadeIn">
            <i class="achievement-icon fas ${achievement.icon}"></i>
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-description">${achievement.description}</p>
        </div>
    `).join('');
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