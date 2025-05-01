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
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                // Create mobile nav
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                // Create header with close button
                const header = document.createElement('div');
                header.className = 'mobile-nav-header';
                
                const closeBtn = document.createElement('button');
                closeBtn.className = 'close-btn';
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', () => {
                    closeMobileMenu();
                });
                
                header.appendChild(closeBtn);
                mobileNav.appendChild(header);
                
                // Clone the nav list
                const clonedNavList = navList.cloneNode(true);
                mobileNav.appendChild(clonedNavList);
                
                // Add to body
                document.body.appendChild(mobileNav);
                
                // Prevent scrolling
                document.body.style.overflow = 'hidden';
                
                // Animate in
                setTimeout(() => {
                    mobileNav.style.opacity = '1';
                    mobileNav.style.transform = 'translateX(0)';
                }, 50);
                
                // Add event listeners to nav links
                mobileNav.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', closeMobileMenu);
                });
            } else {
                closeMobileMenu();
            }
        });
    }
    
    function closeMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav) {
            mobileNav.style.opacity = '0';
            mobileNav.style.transform = 'translateX(100%)';
            
            document.body.style.overflow = '';
            
            // Remove after animation
            setTimeout(() => {
                if (mobileNav.parentNode) {
                    mobileNav.parentNode.removeChild(mobileNav);
                }
            }, 300);
        }
        
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    }
    
    // Add mobile nav styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 80%;
            max-width: 320px;
            background: white;
            z-index: 1001;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            padding: 80px 2rem 2rem;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            overflow-y: auto;
        }
        
        .mobile-nav .nav-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .menu-toggle.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
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
