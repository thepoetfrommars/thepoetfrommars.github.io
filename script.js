/* 
 * Da Vinci Hardware Logic
 * Author: Antigravity
 */

document.addEventListener('DOMContentLoaded', () => {
    initThreeJSBackground();
    initScrollAnimations();
    initTypingEffect();
    initTerminal();
});

/* --- Three.js 3D Background --- */
function initThreeJSBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Wireframe Icosahedron (The "System")
    const geometry = new THREE.IcosahedronGeometry(10, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffd700, // Gold
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner Core
    const coreGeo = new THREE.IcosahedronGeometry(5, 0);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x64ffda, // Cyan
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Particles (Stars/Data)
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xe0e0e0,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    camera.position.z = 30;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate Objects
        sphere.rotation.y += 0.002;
        sphere.rotation.x += 0.001;
        core.rotation.y -= 0.004;
        core.rotation.x -= 0.002;
        particlesMesh.rotation.y += 0.0005;

        // Parallax Effect
        sphere.rotation.y += mouseX * 0.05;
        sphere.rotation.x += mouseY * 0.05;
        camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* --- Hidden Terminal --- */
function initTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const closeBtn = document.querySelector('.terminal-close');

    if (!overlay || !input || !output) return;

    // Toggle Terminal with Tilde (~) or Backtick (`)
    document.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            overlay.classList.toggle('active');
            if (overlay.classList.contains('active')) {
                input.focus();
            }
        }
    });

    // Close Button
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // Command Handling
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            processCommand(command);
            input.value = '';
        }
    });

    function processCommand(cmd) {
        printToTerminal(`user@rd_os:~$ ${cmd}`);

        switch (cmd) {
            case 'help':
                printToTerminal(`
Available Commands:
  help      - Show this list
  about     - Navigate to Identity page
  work      - Navigate to Work page
  systems   - Navigate to Systems page
  future    - Navigate to Future page
  whoami    - Display user profile
  clear     - Clear terminal screen
  exit      - Close terminal
                `);
                break;
            case 'about':
                printToTerminal('Navigating to Identity...');
                setTimeout(() => window.location.href = 'index.html', 1000);
                break;
            case 'work':
                printToTerminal('Navigating to Work...');
                setTimeout(() => window.location.href = 'experience.html', 1000);
                break;
            case 'systems':
                printToTerminal('Navigating to Systems...');
                setTimeout(() => window.location.href = 'systems.html', 1000);
                break;
            case 'future':
                printToTerminal('Navigating to Future...');
                setTimeout(() => window.location.href = 'future.html', 1000);
                break;
            case 'whoami':
                printToTerminal('RD // The Poet From Mars // Visionary Rebel Architect');
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case 'exit':
                overlay.classList.remove('active');
                break;
            case '':
                break;
            default:
                printToTerminal(`Command not found: ${cmd}. Type 'help' for list.`);
        }

        // Auto scroll to bottom
        const content = document.querySelector('.terminal-content');
        content.scrollTop = content.scrollHeight;
    }

    function printToTerminal(text) {
        const p = document.createElement('p');
        p.innerText = text;
        output.appendChild(p);
    }
}

/* --- Existing Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
