document.querySelectorAll('.submenu').forEach(submenu => {
    submenu.style.display = 'none';
  });
  document.querySelectorAll('.mainmenu a').forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault();

      // 클릭된 메인 메뉴 항목에 active 클래스 토글
      this.classList.toggle('active');

      // 모든 서브메뉴를 숨김
      document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.display = 'none';
      });

      

      // 모든 메인 메뉴 항목의 active 클래스 제거
      document.querySelectorAll('.mainmenu a').forEach(menu => {
        menu.classList.remove('active');
      });

      // 클릭된 메인 메뉴 항목에 active 클래스 추가
      this.classList.add('active');

      // 클릭된 항목의 서브메뉴 표시
      const submenu = this.parentElement.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';      }
    });
  });