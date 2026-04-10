/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== MOBILE NAV ===== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
mobileClose.addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);
mobileLinks.forEach(l => l.addEventListener('click', closeMobileNav));

/* ===== HERO SLIDER ===== */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoplayTimer;

function goToSlide(index) {
  const prev = slides[currentSlide];
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  // 입장 애니메이션 재시작을 위해 active 잠깐 제거 후 재추가
  prev.classList.remove('active');
  const next = slides[currentSlide];
  next.classList.remove('active');
  void next.offsetWidth; // reflow 강제
  next.classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startAutoplay() {
  autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
}
function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

document.querySelector('.hero-prev').addEventListener('click', () => {
  goToSlide(currentSlide - 1);
  resetAutoplay();
});
document.querySelector('.hero-next').addEventListener('click', () => {
  goToSlide(currentSlide + 1);
  resetAutoplay();
});
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoplay();
  });
});

startAutoplay();

/* ===== DENTAL TABS ===== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + target).classList.add('active');
  });
});

/* ===== STATS COUNTER ===== */
const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    statsAnimated = true;
    statNums.forEach(num => {
      const target = parseInt(num.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        num.textContent = Math.floor(ease * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else num.textContent = target.toLocaleString();
      }
      requestAnimationFrame(update);
    });
  }
}

/* ===== FADE UP ANIMATIONS ===== */
const fadeEls = document.querySelectorAll(
  '.service-card, .process-step, .testimonial-card, .case-card, .health-item, .stat-item, .news-item'
);

function applyFadeClasses() {
  fadeEls.forEach(el => el.classList.add('fade-up'));
}

function checkFade() {
  fadeEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setTimeout(() => el.classList.add('visible'), (i % 4) * 80);
    }
  });
  animateStats();
}

applyFadeClasses();
window.addEventListener('scroll', checkFade, { passive: true });
setTimeout(checkFade, 200);

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== 스크롤 진행 바 ===== */
const scrollProgressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgressBar) scrollProgressBar.style.width = pct + '%';
}, { passive: true });

/* ===== 커서 글로우 ===== */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

/* ===== 히어로 타이프라이터 효과 ===== */
(function initTypewriter() {
  const firstSlide = document.querySelector('.hero-slide[data-index="0"] h1');
  if (!firstSlide) return;

  const originalHTML = firstSlide.innerHTML;
  // 슬라이드가 처음 활성화될 때만 실행
  let done = false;
  function runTypewriter() {
    if (done) return;
    done = true;
    const em = firstSlide.querySelector('em');
    const emText = em ? em.textContent : '';
    const plainText = firstSlide.textContent.replace(emText, '').trim();

    firstSlide.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    firstSlide.appendChild(cursor);

    const fullText = plainText;
    let i = 0;

    // 앞부분 텍스트 타이핑
    function typeMain() {
      if (i <= fullText.length) {
        firstSlide.innerHTML = fullText.slice(0, i).replace('\n', '<br>');
        i++;
        if (i <= fullText.length) {
          setTimeout(typeMain, 55);
        } else {
          // em 태그 텍스트 추가
          firstSlide.innerHTML += '<br>';
          const emEl = document.createElement('em');
          emEl.style.opacity = '0';
          emEl.style.transition = 'opacity 0.5s ease';
          emEl.textContent = emText;
          firstSlide.appendChild(emEl);
          firstSlide.appendChild(cursor);
          setTimeout(() => {
            emEl.style.opacity = '1';
            setTimeout(() => cursor.remove(), 800);
          }, 120);
        }
      }
    }

    setTimeout(typeMain, 600);
  }

  // 첫 슬라이드가 이미 active인 경우 실행
  const firstSlideEl = document.querySelector('.hero-slide[data-index="0"]');
  if (firstSlideEl && firstSlideEl.classList.contains('active')) {
    setTimeout(runTypewriter, 800);
  }
})();

/* ===== 카드 3D 틸트 효과 ===== */
function addTiltEffect(selector, maxDeg = 8) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = -y * maxDeg;
      const rotY = x * maxDeg;
      card.style.transition = 'transform 0.1s ease';
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
      card.style.transform = '';
    });
  });
}

addTiltEffect('.service-card', 7);
addTiltEffect('.testimonial-card', 5);

/* ===== 인터섹션 옵저버 (성능 개선) ===== */
const io = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const idx = Array.from(document.querySelectorAll('.fade-up')).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (idx % 5) * 70);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

/* ===== 숫자 카운터 (인터섹션 기반) ===== */
const statsIo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      animateStats();
      statsIo.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsIo.observe(statsSection);

/* ===== 섹션 헤더 등장 애니메이션 ===== */
const headerIo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fade-slide-in 0.6s cubic-bezier(0.34,1.2,0.64,1) both';
      headerIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section-header').forEach(h => headerIo.observe(h));
