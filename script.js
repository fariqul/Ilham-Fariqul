// ===== Typing Animation =====
const dynamicText = document.querySelector('.dynamic-text');
const words = ['Laravel Developer', 'React Developer', 'Full Stack Developer', 'Backend Specialist', 'API Builder'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    fetchGitHubStats(); // Fetch GitHub stats on load
    fetchGitHubRepos(); // Fetch GitHub repos on load
});

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal class to elements
document.querySelectorAll('.section-title, .about-text, .about-image, .skill-category, .project-card, .contact-text, .contact-form').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Add reveal CSS
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-category.reveal {
        transition-delay: calc(var(--delay, 0) * 0.1s);
    }
    
    .project-card.reveal {
        transition-delay: calc(var(--delay, 0) * 0.1s);
    }
`;
document.head.appendChild(style);

// Add delay to skill categories and project cards
document.querySelectorAll('.skill-category').forEach((el, i) => {
    el.style.setProperty('--delay', i);
});

document.querySelectorAll('.project-card').forEach((el, i) => {
    el.style.setProperty('--delay', i);
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Add active link style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links a.active {
        color: var(--accent-blue);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show a success message
    showNotification('Message sent successfully!', 'success');
    contactForm.reset();
});

// ===== Notification System =====
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--accent-blue)' : '#ff5f57'};
        color: ${type === 'success' ? 'var(--bg-primary)' : 'white'};
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animation
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===== Parallax Effect on Background Glows =====
document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.glow');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    glows.forEach((glow, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== GitHub Stats API =====
async function fetchGitHubStats() {
    const username = 'fariqul';
    
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Update profile stats
        document.getElementById('repoCount').textContent = userData.public_repos || 0;
        document.getElementById('followers').textContent = userData.followers || 0;
        document.getElementById('following').textContent = userData.following || 0;
        
        // Fetch repos to calculate total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        
        // Calculate total stars
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        document.getElementById('totalStars').textContent = totalStars;
        
        // Animate numbers
        animateNumbers();
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Set fallback values
        document.getElementById('repoCount').textContent = '5+';
        document.getElementById('followers').textContent = '10+';
        document.getElementById('following').textContent = '20+';
        document.getElementById('totalStars').textContent = '⭐';
    }
}

// Animate counting numbers
function animateNumbers() {
    const stats = document.querySelectorAll('.profile-stat .stat-value');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        if (isNaN(finalValue)) return;
        
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 30);
        const duration = 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue;
                clearInterval(counter);
            } else {
                stat.textContent = currentValue;
            }
        }, duration);
    });
}

// ===== GitHub Repositories =====
let allRepos = [];

async function fetchGitHubRepos() {
    const username = 'fariqul';
    const projectsGrid = document.getElementById('projectsGrid');
    const loadingEl = document.getElementById('projectsLoading');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        
        // Filter out forks and store all repos
        allRepos = repos.filter(repo => !repo.fork);
        
        // Sort by stars, then by updated date
        allRepos.sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
        
        // Hide loading, show repos
        loadingEl.classList.add('hidden');
        displayRepos(allRepos);
        
        // Setup filter buttons
        setupFilters();
        
    } catch (error) {
        console.error('Error fetching repos:', error);
        loadingEl.innerHTML = `
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: var(--accent-blue); margin-bottom: 1rem;"></i>
            <p>Failed to load repositories. Please try again later.</p>
        `;
    }
}

function displayRepos(repos) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (repos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <p>No repositories found</p>
            </div>
        `;
        return;
    }
    
    // Display top 6 repos
    const displayRepos = repos.slice(0, 6);
    
    projectsGrid.innerHTML = displayRepos.map(repo => createRepoCard(repo)).join('');
    
    // Add reveal animation
    const cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createRepoCard(repo) {
    const language = repo.language || 'Unknown';
    const languageClass = language.toLowerCase().replace(/[^a-z]/g, '');
    const description = repo.description || 'No description available';
    const stars = repo.stargazers_count;
    const forks = repo.forks_count;
    const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    // Get language icon
    const languageIcons = {
        'PHP': 'fab fa-php',
        'JavaScript': 'fab fa-js',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'Python': 'fab fa-python',
        'TypeScript': 'fas fa-code',
        'Blade': 'fab fa-laravel',
        'Vue': 'fab fa-vuejs'
    };
    
    const iconClass = languageIcons[language] || 'fas fa-code';
    
    return `
        <div class="project-card" data-language="${language}">
            <div class="project-image">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link" title="View Repository">
                            <i class="fab fa-github"></i>
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" class="project-link" title="Live Demo">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
                <div class="project-placeholder">
                    <i class="${iconClass} language-icon ${languageClass}"></i>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">
                    <i class="fas fa-folder"></i>
                    ${repo.name}
                </h3>
                <p class="project-description">${description}</p>
                <div class="project-meta">
                    <span class="stars"><i class="fas fa-star"></i> ${stars}</span>
                    <span class="forks"><i class="fas fa-code-branch"></i> ${forks}</span>
                    <span><i class="fas fa-clock"></i> ${updatedAt}</span>
                </div>
                <div class="project-tech">
                    <span class="language">${language}</span>
                    ${repo.topics && repo.topics.length > 0 ? 
                        repo.topics.slice(0, 3).map(topic => `<span>${topic}</span>`).join('') 
                        : ''
                    }
                </div>
            </div>
        </div>
    `;
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            if (filter === 'all') {
                displayRepos(allRepos);
            } else {
                const filteredRepos = allRepos.filter(repo => repo.language === filter);
                displayRepos(filteredRepos);
            }
        });
    });
}

// ===== Console Easter Egg =====
console.log('%c👋 Hello, fellow developer!', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%c🔥 Laravel + React = ❤️', 'font-size: 16px; color: #ff2d20;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #a0a0b0;');
console.log('%chttps://github.com/fariqul', 'font-size: 14px; color: #7b2cbf;');
