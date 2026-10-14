// =========================================
// STYLE 07: ��ʿ��־�Ű� �����߼�
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // ������Ч�����
  document.querySelectorAll('.mag-nav-strip a, .plate-entry, .klein-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (window.soundEngine) {
        window.soundEngine.playPopClick();
      }
    });
  });

  // ��ͣ���ӡ�¶�Ч
  const plates = document.querySelectorAll('.plate-entry');
  plates.forEach(plate => {
    plate.addEventListener('mouseenter', () => {
      plate.style.borderBottomColor = '#002FA7';
    });
    plate.addEventListener('mouseleave', () => {
      plate.style.borderBottomColor = 'rgba(20, 20, 20, 0.2)';
    });
  });
});
