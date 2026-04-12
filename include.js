/* =====================================================
   include.js — 공통 헤더/푸터 삽입
   모든 페이지에서 script.js보다 먼저 로드됩니다
===================================================== */

(async function () {
  // 헤더와 푸터를 병렬로 로드
  const [headerHTML, footerHTML] = await Promise.all([
    fetch('_header.html').then(r => r.text()),
    fetch('_footer.html').then(r => r.text()),
  ]);

  document.getElementById('page-header').innerHTML = headerHTML;
  document.getElementById('page-footer').innerHTML = footerHTML;

  // 현재 페이지에 맞는 nav 항목에 active-menu 클래스 부여
  const page = location.pathname.split('/').pop() || 'main.html';
  const activeMap = [
    { prefix: 'about',   key: 'about'   },
    { prefix: 'service', key: 'service' },
    { prefix: 'contact', key: 'contact' },
  ];
  for (const { prefix, key } of activeMap) {
    if (page.startsWith(prefix)) {
      document.querySelector(`.nav-item[data-page="${key}"]`)
        ?.classList.add('active-menu');
      break;
    }
  }

  // 헤더/푸터 삽입 완료 → 스크립트 초기화 신호
  document.dispatchEvent(new Event('app-ready'));
})();
