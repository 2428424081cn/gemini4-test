// =========================================
// STYLE 02: ��Ұ���ɽ����߼�
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // �����Ч����
  document.querySelectorAll('.neo-btn, .nav-item, .project-card').forEach(el => {
    el.addEventListener('click', () => {
      if (window.soundEngine) {
        window.soundEngine.playPopClick();
      }
    });
  });

  // 1. �ŷ���ֽϵͳ
  const stickerBtn = document.getElementById('btn-drop-stickers');
  const STICKER_WORDS = ['?? Ӳ�˴���', '?? NO BUGS', '? 60FPS', '?? ��������', '?? CRDT�㷨', '?? ������', '? 100% RAW', '? ��������', '?? ��������'];
  const COLORS = ['#FFE600', '#FF5E97', '#00F5D4', '#B388FF', '#FFFFFF'];

  stickerBtn.addEventListener('click', () => {
    for (let i = 0; i < 6; i++) {
      createFloatingSticker();
    }
  });

  function createFloatingSticker() {
    const sticker = document.createElement('div');
    const text = STICKER_WORDS[Math.floor(Math.random() * STICKER_WORDS.length)];
    const bg = COLORS[Math.floor(Math.random() * COLORS.length)];
    const rot = (Math.random() * 40 - 20).toFixed(1);
    
    sticker.textContent = text;
    sticker.style.position = 'fixed';
    sticker.style.left = `${Math.random() * (window.innerWidth - 150) + 20}px`;
    sticker.style.top = `${Math.random() * (window.innerHeight - 100) + 20}px`;
    sticker.style.background = bg;
    sticker.style.color = '#111';
    sticker.style.fontWeight = '900';
    sticker.style.fontSize = '14px';
    sticker.style.padding = '8px 16px';
    sticker.style.border = '3px solid #111';
    sticker.style.boxShadow = '5px 5px 0px #111';
    sticker.style.transform = `rotate(${rot}deg) scale(0)`;
    sticker.style.transition = 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    sticker.style.zIndex = '9999';
    sticker.style.cursor = 'grab';
    sticker.style.userSelect = 'none';

    document.body.appendChild(sticker);

    // ���ų���
    requestAnimationFrame(() => {
      sticker.style.transform = `rotate(${rot}deg) scale(1)`;
    });

    // ���������ʧ
    sticker.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playPopClick();
      sticker.style.transform = `rotate(${rot}deg) scale(0)`;
      setTimeout(() => sticker.remove(), 250);
    });

    // ��ק�߼�
    let isDragging = false;
    let startX, startY, origLeft, origTop;

    sticker.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = parseInt(sticker.style.left);
      origTop = parseInt(sticker.style.top);
      sticker.style.cursor = 'grabbing';
      e.stopPropagation();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      sticker.style.left = `${origLeft + (e.clientX - startX)}px`;
      sticker.style.top = `${origTop + (e.clientY - startY)}px`;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        sticker.style.cursor = 'grab';
      }
    });
  }

  // 2. ����΢��
  const copyBtn = document.getElementById('btn-copy-wechat');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('CIPHER_LIN').then(() => {
        const origText = copyBtn.textContent;
        copyBtn.textContent = '? �Ѹ���΢�źţ�';
        copyBtn.style.background = '#00F5D4';
        setTimeout(() => {
          copyBtn.textContent = origText;
          copyBtn.style.background = '#fff';
        }, 2000);
      });
    });
  }
});
