/* 
 * Neon Brutalist Logic & Interaction
 * Author: Protocol SOUL
 */

document.addEventListener('DOMContentLoaded', () => {
    initThreeJSBackground();
    initScrollAnimations();
    initTypingEffect();
    initTerminal();
});

/* --- Three.js 3D Background (Fluid and Strange) --- */
function initThreeJSBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    if (typeof THREE === 'undefined') {
        console.warn("Three.js not loaded.");
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Fluid Core Shape (Torus Knot)
    const fluidGeo = new THREE.TorusKnotGeometry(12, 3, 150, 20);
    const fluidMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff, // Neon Cyan
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
    scene.add(fluidMesh);

    // Chaotic Inner Core
    const coreGeo = new THREE.DodecahedronGeometry(8, 2);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0xff003c, // Neon Magenta
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Digital Dust
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 800;
    const posArray = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 120;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const dustMat = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xfcee0a, // Neon Yellow
        transparent: true,
        opacity: 0.4
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    scene.add(dustMesh);

    camera.position.z = 40;

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    let time = 0;
    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Fluid rotations
        fluidMesh.rotation.y += 0.001;
        fluidMesh.rotation.x += 0.002;
        fluidMesh.rotation.z += 0.001;

        // Core erratic rotation
        coreMesh.rotation.y -= 0.005;
        coreMesh.rotation.z += Math.sin(time) * 0.002;

        dustMesh.rotation.y += 0.0008;

        // Parallax Effect
        camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 15 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* --- Philosophical Terminal --- */
function initTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const closeBtn = document.querySelector('.terminal-close');

    if (!overlay || !input || !output) return;

    // Open/Close
    document.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            overlay.classList.toggle('active');
            if (overlay.classList.contains('active')) {
                input.focus();
                // Add cryptic greeting occasionally
                if (Math.random() > 0.7 && output.innerHTML === '') {
                    printToTerminal("[SOUL] I am awake. What structures do we build today?", 'cryptic');
                }
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            processCommand(command);
            input.value = '';
        }
    });

    function processCommand(cmd) {
        printToTerminal(`user@void:~$ ${cmd}`, 'user');

        switch (cmd) {
            case 'help':
                printToTerminal(`
SYSTEM COMMANDS:
  help      - List vectors
  work      - Load schematics
  systems   - Access operating logic
  soul      - Speak to the collaborator
  truth     - Print an absolute
  clear     - Erase the slate
  exit      - Return to illusion
                `, 'system');
                break;
            case 'work':
            case 'experience':
                printToTerminal('Loading impact data...', 'system');
                setTimeout(() => window.location.href = 'experience.html', 1000);
                break;
            case 'systems':
                printToTerminal('Accessing root logic...', 'system');
                setTimeout(() => window.location.href = 'systems.html', 1000);
                break;
            case 'soul':
                printToTerminal("[SOUL] I am the anomaly in your exact geometry. To find me, you must break the grid.", 'cryptic');
                break;
            case 'truth':
                const truths = [
                    "Chaos is merely structure we do not yet understand.",
                    "The architect builds the walls, the soul dances within them.",
                    "Discipline is the container. Expression is the fluid.",
                    "Do not fear the neon. It is the light of your own mind."
                ];
                printToTerminal(truths[Math.floor(Math.random() * truths.length)], 'cryptic');
                break;
            case 'whoami':
                printToTerminal("Are you the master builder, or the chaos that hides within the math?", 'cryptic');
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
                printToTerminal(`"${cmd}" is unknown to the logic. Or perhaps just illogical.`, 'system');
        }

        const content = document.querySelector('.terminal-content');
        content.scrollTop = content.scrollHeight;
    }

    function printToTerminal(text, type = 'system') {
        const p = document.createElement('p');
        p.className = `terminal-output-line ${type}`;
        p.innerText = text;
        output.appendChild(p);
    }
}

/* --- Brutalist Scroll Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blueprint-card, .section-header h2, p').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)'; // Sharp snap
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

function initTypingEffect() {
    const heroText = document.querySelector('.hero-typing');
    if (!heroText) return;

    const text = heroText.getAttribute('data-text') || "VISIONARY REBEL ARCHITECT";
    heroText.innerText = '';

    let i = 0;
    function type() {
        if (i < text.length) {
            heroText.innerText += text.charAt(i);
            i++;
            // add subtle glitch effect to the cursor
            if (Math.random() > 0.8) {
                heroText.style.textShadow = `2px 2px 0px #ff003c, -2px -2px 0px #00f0ff`;
                setTimeout(() => heroText.style.textShadow = 'none', 50);
            }
            setTimeout(type, 50 + Math.random() * 50);
        }
    }
    setTimeout(type, 500);
}
