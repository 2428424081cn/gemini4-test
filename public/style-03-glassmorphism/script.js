// =========================================
// STYLE 03: �����ζĥɰ�����߼� (Spotlight)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // �۹��������Ч��
  const cards = document.querySelectorAll('.spotlight-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseenter', () => {
      if (window.soundEngine) {
        // ����ˮ�ξ��干��
        window.soundEngine.playGlassChime();
      }
    });
  });

  // ��ť����
  document.querySelectorAll('.glass-btn-primary, .glass-btn-secondary, .glass-btn-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.soundEngine) {
        window.soundEngine.playGlassChime();
      }
    });
  });
});
