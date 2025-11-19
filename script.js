/* 
 * Premium Glassmorphism Logic
 * Author: Antigravity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initScrollAnimations();
    initNavbarEffect();
    initTypingEffect();
    
    // Add background orbs if they don't exist in HTML
    if (!document.querySelector('.bg-animation')) {
        createBackground();
    }
});

function createBackground() {
    const bg = document.createElement('div');
    bg.className = 'bg-animation';
    bg.innerHTML = `
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    `;
    document.body.prepend(bg);
}

function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .section-header, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

function initTypingEffect() {
    const heroText = document.querySelector('.hero-typing');
    if (!heroText) return;
    
    const text = heroText.getAttribute('data-text') || heroText.innerText;
    heroText.innerText = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            heroText.innerText += text.charAt(i);
            i++;
            setTimeout(type, 50); // Typing speed
        }
    }
    
    // Start after a small delay
    setTimeout(type, 500);
}
