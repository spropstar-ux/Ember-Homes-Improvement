// Optimized Lightweight JS - Core functionality only

// Auto-update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
let isMenuOpen = false;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            menuIcon.style.transform = 'rotate(90deg)';
        } else {
            mobileMenu.style.maxHeight = '0';
            menuIcon.style.transform = 'rotate(0deg)';
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        }
    });

    // Close menu when link clicked
    document.querySelectorAll('#mobileMenu a, #mobileMenu button').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.style.maxHeight = '0';
            menuIcon.style.transform = 'rotate(0deg)';
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        });
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.style.maxHeight = '0';
            menuIcon.style.transform = 'rotate(0deg)';
            mobileMenu.classList.add('hidden');
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target) && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.style.maxHeight = '0';
            menuIcon.style.transform = 'rotate(0deg)';
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        }
    });
}

// Simple Form Validation
const validators = {
    name: (v) => v.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(v),
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: (v) => /^[\d\s\-\+\(\)]+$/.test(v) && v.trim().length >= 10,
    address: (v) => v.trim().length >= 5
};

function validateField(input) {
    const isValid = validators[input.name] ? validators[input.name](input.value) : true;
    const errorMsg = input.parentElement.querySelector('.error-msg');

    if (!isValid && input.value) {
        input.classList.add('border-red-500', 'bg-red-50');
        if (errorMsg) errorMsg.classList.remove('hidden');
        return false;
    } else {
        input.classList.remove('border-red-500', 'bg-red-50');
        if (errorMsg) errorMsg.classList.add('hidden');
        return true;
    }
}

// Setup form validation for both forms
['contactForm1', 'contactForm2'].forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('focus', () => input.classList.add('ring-2', 'ring-teal-500'));
        input.addEventListener('blur', () => input.classList.remove('ring-2', 'ring-teal-500'));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Sent!';
            submitBtn.classList.add('bg-green-500');
            form.reset();
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('bg-green-500');
            }, 3000);
        }
    });
});

// Counter Animation
function startCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            counter.textContent = Math.floor(current).toLocaleString();
            if (current < target) requestAnimationFrame(update);
            else counter.textContent = target.toLocaleString();
        };
        update();
    });
}

// Intersection Observer for counters
if (document.getElementById('about')) {
    new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            entries[0].target.observer.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 }).observe(document.getElementById('about'));
}

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize on load
console.log('Ember site loaded');
