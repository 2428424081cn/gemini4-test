// =========================================
// STYLE 06: ǧ�� Y2K Һ̬���� 3D�Ӳ��
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. CD ��Ƭ����Ӳ���ת��б
  const cdDisc = document.getElementById('interactive-cd');
  if (cdDisc) {
    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      cdDisc.style.transform = `rotateX(${-deltaY * 20}deg) rotateY(${deltaX * 20}deg)`;
    });
  }

  // 2. 3D �����ǿ�Ƭ��б
  const tiltCards = document.querySelectorAll('.y2k-tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / (rect.height / 2)) * 10;
      const rotY = (x / (rect.width / 2)) * 10;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });

    card.addEventListener('mouseenter', () => {
      if (window.soundEngine) {
        window.soundEngine.playTerminalBeep();
      }
    });
  });

  // 3. ����΢��
  const wechatBtn = document.getElementById('y2k-wechat-btn');
  if (wechatBtn) {
    wechatBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('CIPHER_LIN_2026').then(() => {
        const orig = wechatBtn.textContent;
        wechatBtn.textContent = '? WECHAT COPIED! ?';
        wechatBtn.style.background = '#00fff2';
        wechatBtn.style.color = '#000';
        setTimeout(() => {
          wechatBtn.textContent = orig;
          wechatBtn.style.background = '';
          wechatBtn.style.color = '';
        }, 2000);
      });
    });
  }
});
