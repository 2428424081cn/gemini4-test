// =========================================
// STYLE 10: ������� Bento ��ǩ �����߼�
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // ������ȵ�����Ч����
  document.querySelectorAll('.clay-card, .clay-action-btn, .clay-pill-link, .clay-pill-btn, .clay-sm-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (window.soundEngine) {
        window.soundEngine.playClayBoing();
      }
    });
  });

  // 1. ��ǩ��и����ֻ�
  const quotes = [
    '�����벻Ӧ�����������ָ���ÿһ��ת����ÿһ����Ӱ����͹��ɣ��������û����ݵ����������⡣��',
    '���ø��ӵķֲ�ʽ�߼�������Ļ����ת��������ݡ��������������ָ���ÿһ�δ�������',
    '�����㷨����ѧ֮���ҵ����������ɣ�����ǹ���ʦ����׷Ѱ������֮�⡣��',
    '����õļܹ���ͬ���ʵ����ţ���߳��ص��;������������ε����絯�ԡ���'
  ];
  let quoteIdx = 0;
  const noteBtn = document.getElementById('btn-change-note');
  const noteText = document.querySelector('.sticky-text');

  if (noteBtn && noteText) {
    noteBtn.addEventListener('click', () => {
      quoteIdx = (quoteIdx + 1) % quotes.length;
      noteText.style.opacity = '0';
      noteText.style.transform = 'translateY(4px)';
      setTimeout(() => {
        noteText.textContent = quotes[quoteIdx];
        noteText.style.transition = 'all 0.3s ease';
        noteText.style.opacity = '1';
        noteText.style.transform = 'translateY(0)';
      }, 150);
    });
  }

  // 2. ����΢��
  const wechatBtn = document.getElementById('btn-copy-clay-wechat');
  if (wechatBtn) {
    wechatBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('CIPHER_LIN').then(() => {
        const orig = wechatBtn.textContent;
        wechatBtn.textContent = '? ΢���Ѹ���: CIPHER_LIN';
        wechatBtn.style.background = '#a3b899';
        wechatBtn.style.color = '#fff';
        setTimeout(() => {
          wechatBtn.textContent = orig;
          wechatBtn.style.background = '#fff';
          wechatBtn.style.color = '';
        }, 2000);
      });
    });
  }
});
