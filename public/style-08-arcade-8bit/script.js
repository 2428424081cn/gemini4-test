// =========================================
// STYLE 08: 8-Bit ���ؽֻ������߼�
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  let coins = 99;
  const coinDisplay = document.getElementById('coin-counter');
  const dialogText = document.getElementById('rpg-dialog-text');

  // ��Ч����
  function playCoin() {
    if (window.soundEngine) {
      window.soundEngine.play8BitCoin();
    }
  }

  // 1. Ͷι�ڿ�������Ӳ��
  const coffeeBtn = document.getElementById('btn-feed-coffee');
  if (coffeeBtn) {
    coffeeBtn.addEventListener('click', () => {
      coins++;
      coinDisplay.textContent = coins;
      playCoin();
      dialogText.innerHTML = `> �������Ӻ�Ͷι��һ��Ũ���ڿ��ȣ�<br>> ���Ӻ�����ˡ������ӡ�BUFF�������ٶȴ����������� +1��`;
    });
  }

  // 2. ��ļ���
  const recruitBtn = document.getElementById('btn-recruit');
  if (recruitBtn) {
    recruitBtn.addEventListener('click', () => {
      playCoin();
      dialogText.innerHTML = `> ����������Լ��Ƥֽ...<br>> ׼�������ʼ�������������: alex.lin@arcade-hero.game��`;
      setTimeout(() => {
        window.location.href = 'mailto:alex.lin@arcade-hero.game?subject=��������ļ���������Ӻ��������ǵĴ�����Ŀ��';
      }, 600);
    });
  }

  // 3. �������� (����΢��)
  const wechatBtn = document.getElementById('btn-wechat');
  if (wechatBtn) {
    wechatBtn.addEventListener('click', () => {
      playCoin();
      navigator.clipboard.writeText('CIPHER_LIN_2026').then(() => {
        dialogText.innerHTML = `> ���Ž����ɹ���΢�����CIPHER_LIN_2026���Ѵ�����ı��������壡`;
      });
    });
  }

  // �����۵����Ч
  document.querySelectorAll('.inv-slot, .quest-item').forEach(el => {
    el.addEventListener('click', playCoin);
  });
});
