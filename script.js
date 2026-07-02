// ============================================
// ZEROTRACK - Cyber Intelligence Platform
// Premium Hacker Theme JavaScript
// ============================================

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ============================================
// LOADING SCREEN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    const loadingPercentage = document.getElementById('loadingPercentage');
    
    const loadingMessages = [
        'INITIALIZING SECURE CONNECTION...',
        'LOADING ENCRYPTION MODULES...',
        'ESTABLISHING PROTOCOLS...',
        'SCANNING DATABASE...',
        'CONFIGURING FIREWALL...',
        'LOADING COMPLETE...'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            loadingBar.style.width = '100%';
            loadingPercentage.textContent = '100%';
            loadingText.textContent = 'ACCESS GRANTED';
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                detectVisitorData();
            }, 500);
        } else {
            loadingBar.style.width = progress + '%';
            loadingPercentage.textContent = Math.floor(progress) + '%';
            
            const newIndex = Math.floor(progress / 20);
            if (newIndex > messageIndex && newIndex < loadingMessages.length) {
                messageIndex = newIndex;
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }
    }, 300);
});

// ============================================
// MATRIX RAIN EFFECT
// ============================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// VISITOR DATA DETECTION
// ============================================
async function detectVisitorData() {
    const visitorIP = document.getElementById('visitorIP');
    const visitorLocation = document.getElementById('visitorLocation');
    const visitorISP = document.getElementById('visitorISP');
    const visitorDevice = document.getElementById('visitorDevice');
    const visitorBrowser = document.getElementById('visitorBrowser');
    const visitorOS = document.getElementById('visitorOS');
    const visitorTime = document.getElementById('visitorTime');
    
    // Deteksi Browser & OS
    const userAgent = navigator.userAgent;
    
    let browserName = 'Unknown';
    if (userAgent.includes('Firefox')) browserName = 'Mozilla Firefox';
    else if (userAgent.includes('SamsungBrowser')) browserName = 'Samsung Browser';
    else if (userAgent.includes('Opera') || userAgent.includes('OPR')) browserName = 'Opera';
    else if (userAgent.includes('Edge') || userAgent.includes('Edg')) browserName = 'Microsoft Edge';
    else if (userAgent.includes('Chrome')) browserName = 'Google Chrome';
    else if (userAgent.includes('Safari')) browserName = 'Apple Safari';
    
    let osName = 'Unknown';
    if (userAgent.includes('Windows NT 10.0')) osName = 'Windows 10/11';
    else if (userAgent.includes('Windows NT 6.3')) osName = 'Windows 8.1';
    else if (userAgent.includes('Mac OS X')) osName = 'macOS';
    else if (userAgent.includes('Android')) {
        const v = userAgent.match(/Android\s([0-9.]+)/);
        osName = v ? `Android ${v[1]}` : 'Android';
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        const v = userAgent.match(/OS\s([0-9_]+)/);
        osName = v ? `iOS ${v[1].replace(/_/g,'.')}` : 'iOS';
    } else if (userAgent.includes('Linux')) osName = 'Linux';
    
    let deviceType = 'Unknown';
    const sw = window.screen.width;
    if (userAgent.includes('iPhone')) deviceType = sw >= 430 ? 'iPhone 15 Pro Max' : sw >= 390 ? 'iPhone 14/15' : 'iPhone';
    else if (userAgent.includes('iPad')) deviceType = 'iPad';
    else if (userAgent.includes('Android')) {
        if (userAgent.includes('SM-S928')) deviceType = 'Samsung Galaxy S24 Ultra';
        else if (userAgent.includes('SM-S918')) deviceType = 'Samsung Galaxy S23 Ultra';
        else if (userAgent.includes('Pixel')) deviceType = 'Google Pixel';
        else if (userAgent.includes('Redmi') || userAgent.includes('Mi ')) deviceType = 'Xiaomi Device';
        else deviceType = 'Android Device';
    } else deviceType = `Desktop (${sw}x${window.screen.height})`;
    
    visitorDevice.textContent = deviceType;
    visitorBrowser.textContent = browserName;
    visitorOS.textContent = osName;
    
    const now = new Date();
    visitorTime.textContent = now.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        day:'numeric', month:'short', year:'numeric',
        hour:'2-digit', minute:'2-digit', second:'2-digit'
    });
    
    // IP & Lokasi
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        visitorIP.textContent = data.ip || 'Tidak terdeteksi';
        const loc = [data.city, data.region, data.country_name].filter(Boolean);
        visitorLocation.textContent = loc.join(', ') || 'Tidak terdeteksi';
        visitorISP.textContent = data.org || data.isp || 'Tidak terdeteksi';
    } catch(e) {
        visitorIP.textContent = '192.168.1.' + Math.floor(Math.random()*255);
        visitorLocation.textContent = 'Jakarta, Indonesia';
        visitorISP.textContent = 'PT Telkom Indonesia';
    }
}

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top && window.scrollY < top + section.clientHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) link.classList.add('active');
    });
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// COUNTER
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
        current += step;
        if (current < target) { el.textContent = Math.floor(current); requestAnimationFrame(update); }
        else el.textContent = target;
    };
    update();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(n => animateCounter(n));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
observer.observe(document.getElementById('home'));

// ============================================
// FAQ
// ============================================
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) item.classList.remove('active');
    });
    faqItem.classList.toggle('active');
}

// ============================================
// MODAL DETAIL
// ============================================
const suspectsData = {
    suspect1: {
        name:'ANDI PRATAMA', alias:'CyberGhost99', photo:'images/suspects/suspect1.jpg',
        phone:'+62 812-3456-7890', location:'Jakarta Pusat, DKI Jakarta',
        coordinates:'-6.2088° S, 106.8456° E', device:'Xiaomi Redmi Note 12 Pro',
        ip:'192.168.100.23', imei:'354123456789012', status:'CLASSIFIED',
        description:'Pelaku melakukan penipuan online dengan modus investasi bodong. Korban dijanjikan keuntungan 200% dalam 1 bulan. Setelah transfer, pelaku menghilang dan memblokir semua kontak korban. Total kerugian korban mencapai Rp 25.000.000.',
        modus:'Investasi Bodong', kerugian:'Rp 25.000.000', tanggal:'12 Januari 2025', platform:'WhatsApp & Telegram'
    },
    suspect2: {
        name:'SITI RAHMAWATI', alias:'DarkAngel', photo:'images/suspects/suspect2.jpg',
        phone:'+62 813-5678-9012', location:'Surabaya, Jawa Timur',
        coordinates:'-7.2575° S, 112.7521° E', device:'Samsung Galaxy S23 Ultra',
        ip:'10.0.45.178', imei:'357890123456789', status:'WANTED',
        description:'Pelaku berpura-pura menjadi customer service bank dan meminta data pribadi korban. Setelah mendapatkan akses ke mobile banking, pelaku menguras saldo rekening korban sebesar Rp 15.000.000.',
        modus:'Social Engineering / Phishing', kerugian:'Rp 15.000.000', tanggal:'5 Februari 2025', platform:'Telepon & SMS'
    },
    suspect3: {
        name:'BUDI SANTOSO', alias:'PhantomHacker', photo:'images/suspects/suspect3.jpg',
        phone:'+62 811-2345-6789', location:'Bandung, Jawa Barat',
        coordinates:'-6.9147° S, 107.6098° E', device:'iPhone 15 Pro Max',
        ip:'172.16.89.45', imei:'359012345678901', status:'TRACKED',
        description:'Pelaku melakukan penipuan dengan modus giveaway di Instagram. Korban diminta transfer biaya administrasi untuk mengklaim hadiah. Setelah transfer dilakukan, akun Instagram pelaku menghilang. Total korban lebih dari 50 orang.',
        modus:'Fake Giveaway', kerugian:'Rp 50.000.000 (akumulasi)', tanggal:'20 Maret 2025', platform:'Instagram'
    }
};

function openDetail(suspectId) {
    const modal = document.getElementById('detailModal');
    const data = suspectsData[suspectId];
    document.getElementById('modalTitle').textContent = `DETAIL PELAKU - ${data.name}`;
    document.getElementById('modalBody').innerHTML = `
        <div style="display:flex;gap:30px;margin-bottom:30px;flex-wrap:wrap;">
            <div style="flex-shrink:0;">
                <img src="${data.photo}" alt="${data.name}" style="width:200px;height:250px;object-fit:cover;border:2px solid var(--neon-green);border-radius:8px;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22250%22%3E%3Crect fill=%22%230a0a0a%22 width=%22200%22 height=%22250%22/%3E%3Ctext fill=%22%2300ff66%22 x=%22100%22 y=%22125%22 text-anchor=%22middle%22%3ENO PHOTO%3C/text%3E%3C/svg%3E'">
                <div style="text-align:center;margin-top:10px;"><span style="background:var(--neon-green);color:#000;padding:5px 15px;border-radius:3px;font-family:var(--font-mono);font-size:0.7rem;">${data.status}</span></div>
            </div>
            <div style="flex:1;min-width:250px;">
                <h4 style="color:var(--neon-green);margin-bottom:15px;font-family:var(--font-heading);">INFORMASI PELAKU</h4>
                <p><strong>Nama:</strong> ${data.name}</p>
                <p><strong>Alias:</strong> ${data.alias}</p>
                <p><strong>No. HP:</strong> ${data.phone}</p>
                <p><strong>Lokasi:</strong> ${data.location}</p>
                <p><strong>Koordinat:</strong> <span style="color:#00aaff;">${data.coordinates}</span></p>
                <p><strong>Device:</strong> ${data.device}</p>
                <p><strong>IP:</strong> ${data.ip}</p>
                <p><strong>IMEI:</strong> ${data.imei}</p>
            </div>
        </div>
        <div style="border-top:1px solid var(--border-color);padding-top:20px;">
            <h4 style="color:var(--neon-green);margin-bottom:15px;">DESKRIPSI KASUS</h4>
            <p style="color:var(--text-secondary);line-height:1.8;margin-bottom:20px;">${data.description}</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;">
                <div style="background:rgba(0,255,102,0.05);padding:15px;border-radius:8px;border:1px solid var(--border-color);"><strong style="color:var(--neon-green);">Modus:</strong><p>${data.modus}</p></div>
                <div style="background:rgba(0,255,102,0.05);padding:15px;border-radius:8px;border:1px solid var(--border-color);"><strong style="color:var(--neon-green);">Kerugian:</strong><p>${data.kerugian}</p></div>
                <div style="background:rgba(0,255,102,0.05);padding:15px;border-radius:8px;border:1px solid var(--border-color);"><strong style="color:var(--neon-green);">Tanggal:</strong><p>${data.tanggal}</p></div>
                <div style="background:rgba(0,255,102,0.05);padding:15px;border-radius:8px;border:1px solid var(--border-color);"><strong style="color:var(--neon-green);">Platform:</strong><p>${data.platform}</p></div>
            </div>
        </div>
        <div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid var(--border-color);">
            <a href="https://wa.me/6281234567890" class="btn btn-primary" target="_blank" style="display:inline-flex;"><i class="fab fa-whatsapp"></i> KONSULTASI SEKARANG</a>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    document.getElementById('detailModal').classList.remove('active');
    document.body.style.overflow = 'visible';
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });
document.querySelector('.modal-overlay').addEventListener('click', closeDetail);

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%cZEROTRACK%c // DIGITAL INTELLIGENCE PLATFORM\n%c>> System: ONLINE | Encryption: AES-256',
    'color:#00ff66;font-size:24px;font-weight:bold;', 'color:#00ff66;', 'color:#00ff66;');
