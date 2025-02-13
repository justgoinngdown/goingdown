// 加载页面配置
async function loadPageConfig() {
    try {
        const response = await fetch('/_data/staff/page.json');
        const config = await response.json();
        
        // 更新团队介绍
        document.querySelector('.intro .section-description').textContent = config.teamIntro.description;
        
        // 更新团队构成数据
        updateStats(
            config.teamComposition.seniorEngineers,
            config.teamComposition.engineers,
            config.teamComposition.technicians
        );
        
        // 更新团队优势
        const advantagesList = document.querySelector('.highlights .list');
        advantagesList.innerHTML = `
            <div class="list-item animated-float">
                <i class="fas fa-graduation-cap"></i>
                <h3>${config.teamAdvantages.professionalQuality.title}</h3>
                <p>${config.teamAdvantages.professionalQuality.description}</p>
                <div class="feature-tags">
                    ${config.teamAdvantages.professionalQuality.tags.map(tag => `
                        <span class="tag"><i class="fas fa-check"></i> ${tag}</span>
                    `).join('')}
                </div>
            </div>
            <div class="list-item animated-float">
                <i class="fas fa-hands-helping"></i>
                <h3>${config.teamAdvantages.teamwork.title}</h3>
                <p>${config.teamAdvantages.teamwork.description}</p>
                <div class="feature-tags">
                    ${config.teamAdvantages.teamwork.tags.map(tag => `
                        <span class="tag"><i class="fas fa-users"></i> ${tag}</span>
                    `).join('')}
                </div>
            </div>
            <div class="list-item animated-float">
                <i class="fas fa-clock"></i>
                <h3>${config.teamAdvantages.efficiency.title}</h3>
                <p>${config.teamAdvantages.efficiency.description}</p>
                <div class="feature-tags">
                    ${config.teamAdvantages.efficiency.tags.map(tag => `
                        <span class="tag"><i class="fas fa-tachometer-alt"></i> ${tag}</span>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading page config:', error);
    }
}

// 加载员工数据
async function loadStaffData() {
    try {
        const staffList = document.getElementById('staff-list');
        const response = await fetch('/api/staff.php');
        const result = await response.json();

        if (!result.success) {
            throw new Error('Failed to load staff data');
        }

        const staffMembers = result.data;

        // 清空现有列表
        staffList.innerHTML = '';

        // 创建员工卡片
        staffMembers.forEach(staffMember => {
            const memberCard = document.createElement('div');
            memberCard.className = 'staff-item animated-float';
            memberCard.innerHTML = `
                <div class="staff-avatar">
                    ${staffMember.photo ? 
                        `<img src="${staffMember.photo}" alt="${staffMember.name}" class="staff-photo">` :
                        '<i class="fas fa-user-circle fa-4x"></i>'
                    }
                </div>
                <h3 class="staff-name">${staffMember.name}</h3>
                <p class="staff-title">${staffMember.position}</p>
                <p class="staff-department"><i class="fas fa-building"></i> ${staffMember.department || ''}</p>
                ${staffMember.qualification ? 
                    `<p class="staff-qualification"><i class="fas fa-certificate"></i> ${staffMember.qualification}</p>` : 
                    ''
                }
                <div class="staff-contact">
                    ${staffMember.email ? 
                        `<p><i class="fas fa-envelope"></i> ${staffMember.email}</p>` : 
                        ''
                    }
                    ${staffMember.phone ? 
                        `<p><i class="fas fa-phone"></i> ${staffMember.phone}</p>` : 
                        ''
                    }
                </div>
                ${staffMember.description ? 
                    `<div class="staff-description">
                        <p><i class="fas fa-info-circle"></i> ${staffMember.description}</p>
                    </div>` : 
                    ''
                }
            `;
            staffList.appendChild(memberCard);
        });

    } catch (error) {
        console.error('Error loading staff data:', error);
        // 显示错误信息
        const staffList = document.getElementById('staff-list');
        staffList.innerHTML = '<p class="error-message">加载数据时出现错误，请稍后再试。</p>';
    }
}

// 更新统计数据
function updateStats(seniorEngineers, engineers, technicians) {
    const elements = {
        'senior-engineers': seniorEngineers,
        'engineers': engineers,
        'technicians': technicians
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            animateValue(element, 0, value, 2000);
        }
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadPageConfig();
    loadStaffData();
}); 