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

// Form validation removed - using Google Sheets submission handler for all .inquiryForm forms

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

// Reset all forms and scroll to top on page load
window.addEventListener('load', () => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Reset all forms
    document.querySelectorAll('.inquiryForm').forEach(form => {
        form.reset();
        // Clear validation styles
        form.querySelectorAll('input').forEach(input => {
            input.classList.remove('border-red-500', 'bg-red-50');
            const errorMsg = input.parentElement.querySelector('.error-msg');
            if (errorMsg) errorMsg.classList.add('hidden');
        });
    });

    // Reset mobile menu state
    isMenuOpen = false;
    if (mobileMenu) {
        mobileMenu.style.maxHeight = '0';
        mobileMenu.classList.add('hidden');
    }
    if (menuIcon) {
        menuIcon.style.transform = 'rotate(0deg)';
    }
});

// form
// ================= FORM VALIDATION =================
const formValidators = {
    fullName: (v) => {
        const trimmed = v.trim();
        return trimmed.length >= 3 && /^[a-zA-Z\s]+$/.test(trimmed);
    },
    email: (v) => {
        const trimmed = v.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    },
    phone: (v) => {
        const digits = v.replace(/\D/g, '');
        return digits.length === 10;
    },
    address: (v) => {
        const trimmed = v.trim();
        return trimmed.length >= 5;
    }
};

function validateField(input) {
    const fieldName = input.name;
    const validator = formValidators[fieldName];
    const isValid = !validator || validator(input.value);
    const errorMsg = input.parentElement.querySelector('.error-msg');

    if (!isValid) {
        input.classList.add('border-red-500', 'bg-red-50');
        if (errorMsg) errorMsg.classList.remove('hidden');
        return false;
    } else {
        input.classList.remove('border-red-500', 'bg-red-50');
        if (errorMsg) errorMsg.classList.add('hidden');
        return true;
    }
}

function validateAllFields(form) {
    const inputs = form.querySelectorAll('input[name="fullName"], input[name="email"], input[name="phone"], input[name="address"]');
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

// Setup real-time field validation
document.querySelectorAll('.inquiryForm input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('focus', () => input.classList.add('ring-2', 'ring-teal-500'));
    input.addEventListener('blur', () => input.classList.remove('ring-2', 'ring-teal-500'));
});

// ================= FORM SUBMIT HANDLER =================
document.querySelectorAll('.inquiryForm').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateAllFields(form)) {
        sendEmail(form);
    } else {
        Swal.fire({
            title: "Validation Error",
            text: "Please fill in all fields correctly.",
            icon: "error"
        });
    }
  });
});

// ================= SEND EMAIL =================
async function sendEmail(form) {
  if (form.dataset.sending === 'true') return;
  form.dataset.sending = 'true';

  const get = name => form.querySelector(`[name="${name}"]`);

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  const loadingText = submitBtn.dataset.loadingText || 'Processing...';

  // Show loader
  submitBtn.innerHTML = `<span class="btn-loader"></span>${loadingText}`;
  submitBtn.classList.add('btn-loading');

  const phoneDigits = get('phone').value.replace(/\D/g, '');
  get('phone').value = `(${phoneDigits.slice(0,3)}) ${phoneDigits.slice(3,6)}-${phoneDigits.slice(6)}`;

  const data = {
    fullName: get('fullName').value.trim(),
    email: get('email').value.trim(),
    phone: get('phone').value.trim(),
    address: get('address').value.trim(),
  };

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbx1Q55NNtw375Tygv6R-PPrngcdzfZQwrTruVMOzRTg15okMIMLBHeG2Wf9mXCORT7H/exec", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status === "success") {
      Swal.fire("Thank you!", "We’ve received your message.", "success");
      form.reset();
      // Reset field validation styles
      form.querySelectorAll('input').forEach(input => {
        input.classList.remove('border-red-500', 'bg-red-50');
        const errorMsg = input.parentElement.querySelector('.error-msg');
        if (errorMsg) errorMsg.classList.add('hidden');
      });
    } else {
      throw new Error("Submission failed");
    }
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  } finally {
    form.dataset.sending = 'false';
    // Hide loader
    submitBtn.textContent = originalText;
    submitBtn.classList.remove('btn-loading');
  }
}

// Before-After Slider Functionality
function initBeforeAfterSlider(sliderId, handleId) {
  const slider = document.getElementById(sliderId);
  const handle = document.getElementById(handleId);
  const afterImg = slider.querySelector('.img-after');

  if (!slider || !handle) return;

  let isActive = false;

  const updateSliderPosition = (e) => {
    if (!isActive) return;

    const rect = slider.getBoundingClientRect();
    let x = e.clientX - rect.left;

    // Handle touch events
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
    }

    x = Math.max(0, Math.min(x, rect.width));
    const percentage = (x / rect.width) * 100;

    afterImg.style.width = percentage + '%';
    handle.style.left = percentage + '%';
  };

  // Mouse events
  handle.addEventListener('mousedown', () => {
    isActive = true;
  });

  document.addEventListener('mouseup', () => {
    isActive = false;
  });

  document.addEventListener('mousemove', updateSliderPosition);

  // Touch events
  handle.addEventListener('touchstart', () => {
    isActive = true;
  });

  document.addEventListener('touchend', () => {
    isActive = false;
  });

  document.addEventListener('touchmove', updateSliderPosition);

  // Click on slider to move handle
  slider.addEventListener('click', (e) => {
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    afterImg.style.width = percentage + '%';
    handle.style.left = percentage + '%';
  });
}

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider('sliderAbout', 'handleAbout');
});