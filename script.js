// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 2500);
});

// ===== MATRIX BACKGROUND =====
(function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    let width, height, columns, drops;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        columns = Math.floor(width / 18);
        drops = Array(columns).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#00FF66';
        ctx.font = '12px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 18, drops[i] * 18);
            if (drops[i] * 18 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 40);
})();

// ===== AOS INIT =====
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

// ===== TYPING EFFECT =====
const typingText = document.getElementById('typingText');
const text = './deploy --platform=intelligence';
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (isDeleting) {
        typingText.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            setTimeout(typeEffect, 1000);
            return;
        }
        setTimeout(typeEffect, 50);
    } else {
        typingText.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, 80);
    }
}

setTimeout(typeEffect, 1500);

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            let current = 0;
            const increment = target / 60;
            const suffix = el.dataset.count.includes('%') ? '%' : '+';

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target + suffix;
                }
            };
            updateCounter();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(counter => counterObserver.observe(counter));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = answer.classList.contains('open');

        document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
        document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('active'));

        if (!isOpen) {
            answer.classList.add('open');
            btn.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Hero visual animation
gsap.from('.hud-container', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
});

// About cards stagger
gsap.from('.about-stat-card', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

// Service cards stagger
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Pricing cards stagger
gsap.from('.pricing-card', {
    scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Testimonial cards stagger
gsap.from('.testimonial-card', {
    scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// FAQ items stagger
gsap.from('.faq-item', {
    scrollTrigger: {
        trigger: '.faq-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
});

// CTA box
gsap.from('.cta-box', {
    scrollTrigger: {
        trigger: '.cta-box',
        start: 'top 80%',
    },
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// ===== PARALLAX GLOW ORB =====
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    document.querySelector('.glow-orb-1').style.transform =
        `translate(${x * 0.5}px, ${y * 0.5}px)`;
    document.querySelector('.glow-orb-2').style.transform =
        `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
});

// ===== SCROLL INDICATOR FADE =====
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

console.log('%c ZEROTRACK v3.2.1 ',
    'background: #00FF66; color: #0A0A0A; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c Digital Intelligence Platform ',
    'color: #00FF66; font-size: 14px; font-family: monospace;');
console.log('%c 🔒 Secure Connection Established ',
    'color: #00FF66; font-size: 12px;');
