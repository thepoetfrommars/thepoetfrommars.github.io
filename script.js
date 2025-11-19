/* 
 * Da Vinci Hardware Logic
 * Author: Antigravity
 */

document.addEventListener('DOMContentLoaded', () => {
    initGeometricBackground();
    initScrollAnimations();
    initTypingEffect();
});

function initGeometricBackground() {
    const container = document.createElement('div');
    container.className = 'geo-background';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
    `;
    document.body.prepend(container);

    // Create rotating circles (Da Vinci style)
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'geo-circle';
        const size = 300 + (i * 150);
        circle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            border: 1px dashed rgba(255, 255, 255, 0.05);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: rotate ${60 + (i * 20)}s linear infinite ${i % 2 === 0 ? '' : 'reverse'};
        `;
        container.appendChild(circle);
    }

    // Add CSS for rotation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add drawing effect if it's a card
                if (entry.target.classList.contains('blueprint-card')) {
                    drawBorder(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blueprint-card, h2, p').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // CSS for visible state
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

function drawBorder(element) {
    // Simulate hand-drawing effect
    element.style.borderColor = 'transparent';
    setTimeout(() => {
        element.style.transition = 'border-color 1s ease';
        element.style.borderColor = 'var(--line-dim)';
    }, 100);
}

function initTypingEffect() {
    const heroText = document.querySelector('.hero-typing');
    if (!heroText) return;

    const text = heroText.getAttribute('data-text') || "Visionary Rebel Architect";
    heroText.innerText = '';

    let i = 0;
    function type() {
        if (i < text.length) {
            heroText.innerText += text.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }
    setTimeout(type, 500);
}
