// =========================================
// STYLE 09: δ��������� 3D�ǿ�ԾǨ����
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 3D ��������
  const STAR_COUNT = 450;
  const stars = [];
  let speed = 1.2;
  let targetSpeed = 1.2;
  let isWarping = false;

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * 1000,
      pz: 1000
    });
  }

  function renderStars() {
    ctx.fillStyle = isWarping ? 'rgba(3, 6, 16, 0.25)' : 'rgba(3, 6, 16, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    speed += (targetSpeed - speed) * 0.05;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.pz = s.z;
      s.z -= speed;

      if (s.z <= 0) {
        s.z = 1000;
        s.pz = 1000;
        s.x = (Math.random() - 0.5) * canvas.width * 2;
        s.y = (Math.random() - 0.5) * canvas.height * 2;
      }

      const k = 250 / s.z;
      const px = s.x * k + cx;
      const py = s.y * k + cy;

      const pk = 250 / s.pz;
      const prevX = s.x * pk + cx;
      const prevY = s.y * pk + cy;

      if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
        const size = Math.max(1, (1 - s.z / 1000) * 3);
        const alpha = Math.min(1, (1 - s.z / 1000) * 1.5);

        ctx.strokeStyle = isWarping ? '#00f2fe' : `rgba(200, 230, 255, ${alpha})`;
        ctx.lineWidth = isWarping ? size * 1.5 : size;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }

    requestAnimationFrame(renderStars);
  }
  renderStars();

  // ����ԾǨ��ť
  const warpBtn = document.getElementById('btn-warp-drive');
  if (warpBtn) {
    warpBtn.addEventListener('click', () => {
      isWarping = !isWarping;
      if (isWarping) {
        targetSpeed = 28;
        warpBtn.textContent = '?? ���ռ�����ȫ���� (������ٻָ�)';
        warpBtn.style.background = '#00f2fe';
        warpBtn.style.color = '#000';
      } else {
        targetSpeed = 1.2;
        warpBtn.textContent = '? ����ռ�����ԾǨ (WARP SPEED)';
        warpBtn.style.background = '';
        warpBtn.style.color = '';
      }

      if (window.soundEngine) {
        window.soundEngine.playSciFiRadar();
      }
    });
  }

  // ��̬ң�����긡��
  const coordsEl = document.getElementById('coords-val');
  setInterval(() => {
    const raH = (18 + Math.sin(Date.now() / 3000) * 0.1).toFixed(2);
    const dec = (38 + Math.cos(Date.now() / 4000) * 0.2).toFixed(2);
    coordsEl.textContent = `RA ${raH}h / DEC +${dec}�� / WARP 1.2`;
  }, 1500);

  // ��ť��Ч
  document.querySelectorAll('.sector-entry, .comms-link').forEach(el => {
    el.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playSciFiRadar();
    });
  });
});
