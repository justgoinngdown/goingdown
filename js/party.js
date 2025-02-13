// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 显示加载动画
        utils.showLoading();
        
        // 加载党建数据
        const data = await loadPartyData();
        if (data) {
            // 更新统计数据
            updateStats(data.stats);
            // 更新各个部分的内容
            updateSections(data);
            // 初始化动画效果
            initializeAnimations();
        } else {
            showErrorMessage();
        }
        
        // 隐藏加载动画
        utils.hideLoading();
    } catch (error) {
        console.error('页面初始化失败:', error);
        utils.hideLoading();
        utils.showError('页面加载失败，请刷新重试');
    }
});

// 更新统计数据
function updateStats(stats) {
    if (!stats) return;
    
    // 获取统计元素
    const partyMembers = document.getElementById('party-members');
    const activities = document.getElementById('activities');
    const trainingHours = document.getElementById('training-hours');

    // 使用通用工具函数设置数值
    if (partyMembers) utils.animateNumber(partyMembers, 0, stats.partyMembers, 2000);
    if (activities) utils.animateNumber(activities, 0, stats.activities, 2000);
    if (trainingHours) utils.animateNumber(trainingHours, 0, stats.trainingHours, 2000);
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
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>数据加载失败，请稍后重试</p>
                </div>
            `;
        }
    });
}

// 更新各个部分内容
function updateSections(data) {
    if (!data || !data.sections) {
        console.error('无效的数据格式');
        return;
    }

    // 更新每个部分的内容
    data.sections.forEach(section => {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
            // 更新标题和描述
            updateSectionHeader(sectionElement, section);
            // 更新具体内容
            switch (section.id) {
                case 'party-news':
                    updateNewsSection(section);
                    break;
                case 'party-organization':
                    updateOrganizationSection(section);
                    break;
                case 'party-education':
                    updateEducationSection(section);
                    break;
                case 'party-activities':
                    updateActivitiesSection(section);
                    break;
                case 'party-achievements':
                    updateAchievementsSection(section);
                    break;
            }
        }
    });
}

// 更新部分标题和描述
function updateSectionHeader(element, section) {
    const header = element.querySelector('.section-header');
    if (header) {
        const title = header.querySelector('.section-title');
        const description = header.querySelector('.section-description');
        
        if (title) title.textContent = section.title;
        if (description) description.textContent = section.description;
    }
}

// 更新党建动态部分
function updateNewsSection(section) {
    if (!section || !section.items) return;
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = section.items.map(news => `
        <div class="news-item">
            <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.onerror=null; this.src='./images/party/default.svg';">
            <div class="news-content">
                <h3>${news.title}</h3>
                <p class="news-date">${utils.formatDate(news.date)}</p>
                <p class="news-summary">${news.summary}</p>
                <a href="${news.link}" class="news-link">查看详情 <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

// 更新组织架构部分
function updateOrganizationSection(section) {
    if (!section || !section.items) return;
    const orgChart = document.querySelector('.organization-chart');
    if (!orgChart) return;

    orgChart.innerHTML = section.items.map(level => `
        <div class="org-level">
            <h3 class="org-level-title">${level.level}</h3>
            <div class="org-items">
                ${level.items.map(item => `
                    <div class="org-item">
                        <h4>${item.title}</h4>
                        <p class="org-name">${item.name}</p>
                        <p class="org-responsibility">${item.responsibility}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 更新党员教育部分
function updateEducationSection(section) {
    if (!section || !section.items) return;
    const educationContent = document.querySelector('.education-content');
    if (!educationContent) return;

    educationContent.innerHTML = section.items.map(edu => `
        <div class="education-item">
            <h3>${edu.title}</h3>
            <p class="description">${edu.description}</p>
            <ul class="resource-list">
                ${edu.resources.map(resource => `
                    <li class="resource-item">
                        <i class="fas ${resource.icon}"></i>
                        <a href="${resource.link}">${resource.title}</a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// 更新党建活动部分
function updateActivitiesSection(section) {
    if (!section || !section.items) return;
    const activitiesGrid = document.querySelector('.activities-grid');
    if (!activitiesGrid) return;

    activitiesGrid.innerHTML = section.items.map(activity => `
        <div class="activity-item">
            <img src="${activity.image}" alt="${activity.title}" class="activity-image" onerror="this.onerror=null; this.src='./images/party/default.svg';">
            <div class="activity-content">
                <h3>${activity.title}</h3>
                <p class="activity-date">${utils.formatDate(activity.date)}</p>
                <p class="activity-description">${activity.description}</p>
            </div>
        </div>
    `).join('');
}

// 更新党建成果部分
function updateAchievementsSection(section) {
    if (!section || !section.items) return;
    const achievementsGrid = document.querySelector('.achievements-grid');
    if (!achievementsGrid) return;

    achievementsGrid.innerHTML = section.items.map(achievement => `
        <div class="achievement-item">
            <i class="fas ${achievement.icon}"></i>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            <span class="achievement-date">${utils.formatDate(achievement.date)}</span>
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
                // 为统计数字添加特殊动画
                if (entry.target.classList.contains('stat-item')) {
                    entry.target.classList.add('animated-float');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 为所有需要动画的元素添加观察器
    document.querySelectorAll('.section, .stat-item, .news-item, .activity-item, .achievement-item').forEach(element => {
        observer.observe(element);
    });
}

// 工具函数：格式化日期
utils.formatDate = function(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}; 