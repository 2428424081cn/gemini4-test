// =========================================
// STYLE 05: ����ʽˮī���⻭�� ˮī��Ⱦ����
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('ink-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ˮī���ӳ�
  const inkDrops = [];

  class InkDrop {
    constructor(x, y, isBig = false) {
      this.x = x;
      this.y = y;
      this.radius = isBig ? (Math.random() * 25 + 20) : (Math.random() * 12 + 6);
      this.maxRadius = this.radius * (Math.random() * 1.8 + 1.2);
      this.alpha = Math.random() * 0.25 + 0.15;
      this.decay = Math.random() * 0.003 + 0.002;
      this.color = Math.random() > 0.88 ? '#b92b27' : '#1b1c1d'; // ż������ɰ���
    }

    update() {
      if (this.radius < this.maxRadius) {
        this.radius += 0.3;
      }
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  // ����ƶ�����ī��
  let lastX = 0, lastY = 0;
  window.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist > 18) {
      inkDrops.push(new InkDrop(e.clientX, e.clientY));
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  // ����������ī��
  window.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      inkDrops.push(new InkDrop(e.clientX + offsetX, e.clientY + offsetY, true));
    }
    if (window.soundEngine) {
      window.soundEngine.playZenDrop();
    }
  });

  // ����ѭ��
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = inkDrops.length - 1; i >= 0; i--) {
      inkDrops[i].update();
      inkDrops[i].draw();

      if (inkDrops[i].alpha <= 0) {
        inkDrops.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  // ��ť��Ч��
  document.querySelectorAll('.zen-nav a, .zen-link-btn, .zen-scroll-card').forEach(el => {
    el.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playZenDrop();
    });
  });
});
