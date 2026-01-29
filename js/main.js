/**
 * MAIN JAVASCRIPT
 * Portfolio functionality including:
 * - Project rendering and filtering
 * - Modal management
 * - Form validation
 * - Navigation and UI interactions
 */

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    // Navigation
    navbar: document.getElementById('navbar'),
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Projects
    featuredProjects: document.getElementById('featured-projects'),
    projectsGrid: document.getElementById('projects-grid'),
    projectSearch: document.getElementById('project-search'),
    filterChips: document.querySelectorAll('.filter-chip'),
    noResults: document.getElementById('no-results'),
    clearFilters: document.getElementById('clear-filters'),
    
    // Modal
    modal: document.getElementById('project-modal'),
    modalBody: document.getElementById('modal-body'),
    modalCloseButtons: document.querySelectorAll('[data-close-modal]'),
    
    // Contact Form
    contactForm: document.getElementById('contact-form'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

// ============================================
// STATE
// ============================================
const state = {
    currentFilter: 'all',
    searchQuery: ''
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for search input
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
    elements.toastMessage.textContent = message;
    elements.toast.hidden = false;
    
    setTimeout(() => {
        elements.toast.hidden = true;
    }, duration);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// PROJECT RENDERING
// ============================================

/**
 * Create a project card HTML element
 */
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${project.title}`);
    
    const difficultyClass = `difficulty-${project.difficulty.toLowerCase()}`;
    
    const badgesHtml = project.technologies.map(tech => 
        `<span class="project-badge">${escapeHtml(tech)}</span>`
    ).join('');
    
    const featuresHtml = project.features.slice(0, 3).map(feature => 
        `<li>${escapeHtml(feature)}</li>`
    ).join('');
    
    const githubLink = project.githubUrl 
        ? `<a href="${escapeHtml(project.githubUrl)}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            </svg>
            GitHub
           </a>`
        : '';
    
    const demoLink = project.demoUrl 
        ? `<a href="${escapeHtml(project.demoUrl)}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            Demo
           </a>`
        : '';
    
    card.innerHTML = `
        <div class="project-header">
            <div>
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <span class="project-difficulty ${difficultyClass}">${escapeHtml(project.difficulty)}</span>
            </div>
        </div>
        <div class="project-badges">${badgesHtml}</div>
        <p class="project-summary">${escapeHtml(project.summary)}</p>
        <div class="project-features">
            <h4>Key Features</h4>
            <ul>${featuresHtml}</ul>
        </div>
        <div class="project-footer">
            ${githubLink}
            ${demoLink}
        </div>
    `;
    
    // Click handler for modal
    card.addEventListener('click', () => openModal(project));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(project);
        }
    });
    
    return card;
}

/**
 * Create a compact featured project card
 */
function createFeaturedCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${project.title}`);
    
    const difficultyClass = `difficulty-${project.difficulty.toLowerCase()}`;
    
    const badgesHtml = project.technologies.slice(0, 3).map(tech => 
        `<span class="project-badge">${escapeHtml(tech)}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-header">
            <div>
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <span class="project-difficulty ${difficultyClass}">${escapeHtml(project.difficulty)}</span>
            </div>
        </div>
        <div class="project-badges">${badgesHtml}</div>
        <p class="project-summary">${escapeHtml(project.summary)}</p>
    `;
    
    card.addEventListener('click', () => {
        // Scroll to projects section and open modal
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => openModal(project), 500);
    });
    
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => openModal(project), 500);
        }
    });
    
    return card;
}

/**
 * Render featured projects
 */
function renderFeaturedProjects() {
    const featured = projects.filter(p => p.featured).slice(0, 3);
    elements.featuredProjects.innerHTML = '';
    
    featured.forEach(project => {
        elements.featuredProjects.appendChild(createFeaturedCard(project));
    });
}

/**
 * Filter projects based on current filter and search query
 */
function filterProjects() {
    let filtered = projects;
    
    // Apply category filter
    if (state.currentFilter !== 'all') {
        filtered = filtered.filter(p => 
            p.categories.includes(state.currentFilter) || 
            p.technologies.includes(state.currentFilter)
        );
    }
    
    // Apply search filter
    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(query) ||
            p.summary.toLowerCase().includes(query) ||
            p.technologies.some(t => t.toLowerCase().includes(query))
        );
    }
    
    return filtered;
}

/**
 * Render projects grid
 */
function renderProjects() {
    const filtered = filterProjects();
    
    elements.projectsGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        elements.projectsGrid.hidden = true;
        elements.noResults.hidden = false;
    } else {
        elements.projectsGrid.hidden = false;
        elements.noResults.hidden = true;
        
        filtered.forEach(project => {
            elements.projectsGrid.appendChild(createProjectCard(project));
        });
    }
}

// ============================================
// MODAL
// ============================================

/**
 * Open project details modal
 */
function openModal(project) {
    const difficultyClass = `difficulty-${project.difficulty.toLowerCase()}`;
    
    const badgesHtml = project.technologies.map(tech => 
        `<span class="project-badge">${escapeHtml(tech)}</span>`
    ).join('');
    
    const featuresHtml = project.features.map(feature => 
        `<li>${escapeHtml(feature)}</li>`
    ).join('');
    
    const outcomesHtml = project.learningOutcomes.map(outcome => 
        `<li>${escapeHtml(outcome)}</li>`
    ).join('');
    
    // Build details sections
    let detailsHtml = '';
    
    if (project.details.algorithmExplanation) {
        detailsHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Algorithm Explanation</h4>
                ${project.details.algorithmExplanation}
            </div>
        `;
    }
    
    if (project.details.sampleData) {
        detailsHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Sample Data</h4>
                <div class="code-block">
                    <pre>${escapeHtml(project.details.sampleData)}</pre>
                </div>
            </div>
        `;
    }
    
    if (project.details.sampleOutput) {
        detailsHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Sample Output</h4>
                <div class="code-block">
                    <pre>${escapeHtml(project.details.sampleOutput)}</pre>
                </div>
            </div>
        `;
    }
    
    if (project.details.screenshots) {
        const screenshotsHtml = project.details.screenshots.map(screenshot => 
            `<div class="screenshot-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.5;">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <p>${escapeHtml(screenshot)}</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Insert screenshot here</p>
            </div>`
        ).join('');
        
        detailsHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Screenshots</h4>
                ${screenshotsHtml}
            </div>
        `;
    }
    
    if (project.details.ethicsNotes) {
        const ethicsHtml = project.details.ethicsNotes.map(note => 
            `<li>${escapeHtml(note)}</li>`
        ).join('');
        
        detailsHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Ethics & Security Notes</h4>
                <ul>${ethicsHtml}</ul>
            </div>
        `;
    }
    
    if (project.details.deliverables) {
        const deliverablesHtml = project.details.deliverables.map(item => 
            `<li>${escapeHtml(item)}</li>`
        ).join('');
        
        detailsHtml += `
            <div class="modal-section">
                <h4 class="modal-section-title">Project Deliverables</h4>
                <ul>${deliverablesHtml}</ul>
            </div>
        `;
    }
    
    const githubLink = project.githubUrl 
        ? `<a href="${escapeHtml(project.githubUrl)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            </svg>
            View on GitHub
           </a>`
        : '';
    
    const demoLink = project.demoUrl 
        ? `<a href="${escapeHtml(project.demoUrl)}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            Live Demo
           </a>`
        : '';
    
    elements.modalBody.innerHTML = `
        <div class="modal-header">
            <h3 id="modal-title" class="modal-title">${escapeHtml(project.title)}</h3>
            <div class="modal-badges">
                <span class="project-difficulty ${difficultyClass}">${escapeHtml(project.difficulty)}</span>
                ${badgesHtml}
            </div>
        </div>
        
        <div class="modal-section">
            <p>${escapeHtml(project.description)}</p>
        </div>
        
        <div class="modal-section">
            <h4 class="modal-section-title">Key Features</h4>
            <ul>${featuresHtml}</ul>
        </div>
        
        <div class="modal-section">
            <h4 class="modal-section-title">Learning Outcomes</h4>
            <ul>${outcomesHtml}</ul>
        </div>
        
        ${detailsHtml}
        
        <div class="modal-links">
            ${githubLink}
            ${demoLink}
        </div>
    `;
    
    elements.modal.hidden = false;
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    elements.modal.querySelector('.modal-close').focus();
}

/**
 * Close modal
 */
function closeModal() {
    elements.modal.hidden = true;
    document.body.style.overflow = '';
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Initialize navigation
 */
function initNavigation() {
    // Mobile menu toggle
    elements.navToggle.addEventListener('click', () => {
        const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
        elements.navToggle.setAttribute('aria-expanded', !isExpanded);
        elements.navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    elements.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            elements.navMenu.classList.remove('active');
            elements.navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize project filters
 */
function initFilters() {
    // Filter chips
    elements.filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state
            elements.filterChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-pressed', 'true');
            
            // Update state and render
            state.currentFilter = chip.dataset.filter;
            renderProjects();
        });
    });
    
    // Search input (debounced)
    const debouncedSearch = debounce((e) => {
        state.searchQuery = e.target.value.trim();
        renderProjects();
    }, 300);
    
    elements.projectSearch.addEventListener('input', debouncedSearch);
    
    // Clear filters
    elements.clearFilters.addEventListener('click', () => {
        state.currentFilter = 'all';
        state.searchQuery = '';
        elements.projectSearch.value = '';
        
        elements.filterChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        elements.filterChips[0].classList.add('active');
        elements.filterChips[0].setAttribute('aria-pressed', 'true');
        
        renderProjects();
    });
}

/**
 * Initialize modal
 */
function initModal() {
    // Close buttons
    elements.modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !elements.modal.hidden) {
            closeModal();
        }
    });
    
    // Close on overlay click
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
}

/**
 * Initialize contact form
 */
function initContactForm() {
    elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
        
        // Get form data
        const formData = new FormData(elements.contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Validation
        let hasErrors = false;
        
        if (!name) {
            document.getElementById('name-error').textContent = 'Please enter your name';
            document.getElementById('name').classList.add('error');
            hasErrors = true;
        }
        
        if (!email) {
            document.getElementById('email-error').textContent = 'Please enter your email';
            document.getElementById('email').classList.add('error');
            hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            document.getElementById('email').classList.add('error');
            hasErrors = true;
        }
        
        if (!message) {
            document.getElementById('message-error').textContent = 'Please enter a message';
            document.getElementById('message').classList.add('error');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        
        // Demo: Show success message (no actual submission)
        showToast('Message sent! (Demo - no email was actually sent)');
        elements.contactForm.reset();
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Simple intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality
 */
function init() {
    renderFeaturedProjects();
    renderProjects();
    initNavigation();
    initFilters();
    initModal();
    initContactForm();
    initScrollAnimations();
    
    console.log('Portfolio initialized successfully!');
    console.log(`Loaded ${projects.length} projects`);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
