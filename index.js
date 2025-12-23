// Mobile Menu Toggle with smooth animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        // Open menu
        mobileMenu.classList.remove('hidden');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('hidden');
            mobileMenuOverlay.style.opacity = '0';
            setTimeout(() => mobileMenuOverlay.style.opacity = '1', 10);
        }
        // Use setTimeout to trigger transition
        setTimeout(() => {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        }, 0);
        menuIcon.style.transform = 'rotate(90deg)';
    } else {
        // Close menu
        mobileMenu.style.maxHeight = '0';
        if (mobileMenuOverlay) {
            mobileMenuOverlay.style.opacity = '0';
        }
        menuIcon.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
        }, 300);
    }
});

// Close mobile menu when link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a, button');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.style.maxHeight = '0';
        menuIcon.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target) && isMenuOpen) {
        isMenuOpen = false;
        mobileMenu.style.maxHeight = '0';
        menuIcon.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
        }, 300);
    }
});

// Handle window resize to close menu on larger screens
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isMenuOpen) {
        isMenuOpen = false;
        mobileMenu.style.maxHeight = '0';
        menuIcon.style.transform = 'rotate(0deg)';
        mobileMenu.classList.add('hidden');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
    }
});

// Close when clicking overlay
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', () => {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.style.maxHeight = '0';
            menuIcon.style.transform = 'rotate(0deg)';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenuOverlay.classList.add('hidden');
            }, 300);
        }
    });
}

// Form Validation
const contactForm = document.getElementById('contactForm');

// Validation Rules
const validators = {
    name: (value) => {
        return value.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(value);
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    phone: (value) => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/.test(value);
        return value.trim().length >= 10 && phoneRegex;
    },
    address: (value) => {
        return value.trim().length >= 5;
    }
};

// Validate individual field
function validateField(input) {
    const { name, value } = input;
    const errorMsg = input.parentElement.querySelector('.error-msg');
    const isValid = validators[name] ? validators[name](value) : true;

    if (!isValid && value) {
        input.classList.add('border-red-500', 'bg-red-50');
        errorMsg.classList.remove('hidden');
        return false;
    } else {
        input.classList.remove('border-red-500', 'bg-red-50');
        errorMsg.classList.add('hidden');
        return true;
    }
}

// Add real-time validation
// Setup form 1 validation
if (contactForm1) {
    const formInputs1 = contactForm1.querySelectorAll('input');
    formInputs1.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('change', () => validateField(input));

        // Add visual feedback on focus
        input.addEventListener('focus', () => {
            input.classList.add('ring-2', 'ring-teal-500');
        });

        input.addEventListener('blur', () => {
            input.classList.remove('ring-2', 'ring-teal-500');
        });
    });

    // Form Submit Handler for Form 1
    contactForm1.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        formInputs1.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show success message
            const formData = new FormData(contactForm1);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                timestamp: new Date().toISOString()
            };

            console.log('Form 1 submitted successfully:', data);

            // Show success feedback
            const submitBtn = contactForm1.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Request Sent!';
            submitBtn.classList.add('bg-green-500');

            // Reset form
            contactForm1.reset();

            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('bg-green-500');
            }, 3000);

            // Show notification
            showNotification('Thank you! We will contact you within 24 hours.', 'success');
        } else {
            showNotification('Please fix the errors in the form.', 'error');
        }
    });
}

// Setup form 2 validation
if (contactForm2) {
    const formInputs2 = contactForm2.querySelectorAll('input');
    formInputs2.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('change', () => validateField(input));

        // Add visual feedback on focus
        input.addEventListener('focus', () => {
            input.classList.add('ring-2', 'ring-teal-500');
        });

        input.addEventListener('blur', () => {
            input.classList.remove('ring-2', 'ring-teal-500');
        });
    });

    // Form Submit Handler for Form 2
    contactForm2.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        formInputs2.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show success message
            const formData = new FormData(contactForm2);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                timestamp: new Date().toISOString()
            };

            console.log('Form 2 submitted successfully:', data);

            // Show success feedback
            const submitBtn = contactForm2.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Consultation Scheduled!';
            submitBtn.classList.add('bg-green-500');

            // Reset form
            contactForm2.reset();

            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('bg-green-500');
            }, 3000);

            // Show notification
            showNotification('Thank you! We will contact you within 24 hours.', 'success');
        } else {
            showNotification('Please fix the errors in the form.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 shadow-lg ${
        type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } success-message`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Counter Animation
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    const duration = 2000; // 2 seconds
    const fps = 60;
    const frames = duration / (1000 / fps);

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / frames;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
}

// Intersection Observer for Counter Animation
const aboutSection = document.getElementById('about');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (aboutSection) {
    observer.observe(aboutSection);
}

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Sticky Behavior
const navbar = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('shadow-xl');
    } else {
        navbar.classList.remove('shadow-xl');
    }

    lastScrollTop = scrollTop;
});

// Add scroll reveal animation
const scrollRevealElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .counter-card, .service-card, .portfolio-item, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

scrollRevealElements.forEach(element => {
    revealObserver.observe(element);
});

// Active Navigation Link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-[#36718b]-500', 'font-bold');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('text-[#36718b]', 'font-bold');
            }
        });
    });
}

setActiveNavLink();

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Clear existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    // Focus on first form input with Alt+F
    if (e.altKey && e.key === 'f') {
        e.preventDefault();
        const firstInput = contactForm.querySelector('input');
        if (firstInput) firstInput.focus();
    }
});

// Lazy Load Images (if needed in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Performance Monitoring (optional)
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// Add touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    // Swipe left - close mobile menu
    if (difference > swipeThreshold && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
}

// Accessibility: Add ARIA labels
document.querySelectorAll('button').forEach(btn => {
    if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', btn.textContent.trim());
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validators,
        validateField,
        showNotification
    };
}

// Initialize on load
window.addEventListener('load', () => {
    console.log('Ember Home Improvement website loaded successfully!');
});
