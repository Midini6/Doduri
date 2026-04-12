/* =====================================================
   sub.js — 서브 페이지 전용 스크립트
   (about.html / service.html / contact.html 에서만 사용)
   include.js, script.js 와 함께 로드됩니다
===================================================== */

document.addEventListener('app-ready', function () {

  /* ===== 스크롤 시 서브탭 active 자동 전환 ===== */
  const subTabLinks = document.querySelectorAll('.sub-tab-link');
  if (!subTabLinks.length) return;

  // 탭 링크의 href에서 섹션 id 수집
  const sections = [];
  subTabLinks.forEach(link => {
    const href = link.getAttribute('href');
    const id = href.includes('#') ? href.split('#')[1] : null;
    if (id) {
      const el = document.getElementById(id);
      if (el) sections.push({ id, el, link });
    }
  });

  if (!sections.length) return;

  function updateActiveTab() {
    const scrollY = window.scrollY + 160; // 헤더(80) + 탭바(80) 높이 보정
    let current = sections[0];
    sections.forEach(s => {
      if (scrollY >= s.el.offsetTop) current = s;
    });
    subTabLinks.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab(); // 페이지 로드 시 초기 실행

}); // end app-ready
