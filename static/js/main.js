// Main JavaScript file for Karthik's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Activate animations when elements come into view
    initScrollAnimations();
});

// Initialize animations on page load
function initAnimations() {
    // Animate hero section elements
    document.querySelectorAll('.animate-text').forEach(el => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Animate hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 500);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navList = document.querySelector('.nav-list');
    const closeBtn = document.querySelector('.nav-close-btn');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }
    
    function closeMobileMenu() {
        if (nav) {
            nav.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Close menu when clicking nav links
    if (navList) {
        navList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Activate animations when elements come into view
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // For skill bars, animate them when in view
                if (entry.target.classList.contains('skill-detailed-category')) {
                    const bars = entry.target.querySelectorAll('.skill-progress');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.style.width;
                        }, index * 100);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.project-card, .skill-category, .section-header, .timeline-item, .skill-detailed-category, .about-grid, .contact-card, .contact-form-container, .map-container, .resume-item, .resume-skill-category, .mini-project').forEach(el => {
        observer.observe(el);
    });
}

// Typing effect for hero section (optional)
function initTypingEffect() {
    const element = document.querySelector('.typing-effect');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const speed = 100; // typing speed in milliseconds
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000); // Start after 1 second
}

// Form validation for contact form
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Validate name
    if (nameInput && nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else if (nameInput) {
        removeError(nameInput);
    }
    
    // Validate email
    if (emailInput && emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (emailInput && !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    } else if (emailInput) {
        removeError(emailInput);
    }
    
    // Validate message
    if (messageInput && messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else if (messageInput) {
        removeError(messageInput);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    formGroup.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    formGroup.classList.remove('error');
}

// Add error message styles
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group.error input,
    .form-group.error textarea {
        border-color: #f50057;
    }
    
    .error-message {
        color: #f50057;
        font-size: 0.85rem;
        margin-top: 0.3rem;
    }
`;
document.head.appendChild(errorStyles);
