// =========================================
// STYLE 01: �����ڿ� / �ն˽����߼�
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Matrix �ַ��� Canvas ��Ч
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%&_#@<>~';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(7, 9, 14, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  let matrixInterval = setInterval(drawMatrix, 35);

  // 2. ʵʱ UTC ʱ��
  function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('cyber-clock');
    if (clockEl) {
      clockEl.textContent = now.toTimeString().split(' ')[0] + ' UTC';
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 3. �ն˽����߼������
  const outputEl = document.getElementById('term-output');
  const inputEl = document.getElementById('term-input');
  const enterBtn = document.getElementById('btn-term-enter');

  const COMMANDS = {
    help: () => `
<div class="term-line term-yellow">=== AVAILABLE PROTOCOLS & COMMANDS ===</div>
<div class="term-line"><span class="term-green">whoami / bio</span>    - ��ȡ���Ӻ�����Ԫ����������ܹ���ѧ</div>
<div class="term-line"><span class="term-green">skills</span>          - ��ʾ���ļ���ջ��������ͼ</div>
<div class="term-line"><span class="term-green">projects</span>        - �鿴�����Ը߲�����ͼ�ι�����Ŀ</div>
<div class="term-line"><span class="term-green">contact</span>         - ����ȫ˫����������Ƶ��</div>
<div class="term-line"><span class="term-green">matrix</span>          - �����ַ������ٹ���ģʽ</div>
<div class="term-line"><span class="term-green">clear</span>           - ˢ�²��������̨����</div>
`,

    whoami: () => COMMANDS.bio(),
    bio: () => `
<div class="term-line term-cyan">=== OPERATIVE PROFILE: ���Ӻ� (Alex Lin) ===</div>
<div class="term-line">���ݽ�ɫ: ����ȫջϵͳ�ܹ�ʦ & WebGL ���⽻������ר��</div>
<div class="term-line">ʵս����: 8+ ��ϵͳ������ǰ�ؽ������ᾭ��</div>
<div class="term-line">��������: "��ȷ���ԵĴ����Ԧ���ң��ü��µ�΢�뼶��Ⱦ���ѻ�����ꡣ"</div>
<div class="term-line term-dim">������������򼶸߲����ֲ�ʽ��̨�� WebGPU ������ʵ������Ŀ��</div>
`,

    skills: () => `
<div class="term-line term-yellow">=== SKILL MATRIX / ������������ ===</div>
<div class="term-card">
  <div class="term-card-title">? WebGL / WebGPU / Three.js [98%]</div>
  <div class="term-card-desc">������� Shader ��ɫ����̡��ӳ���Ⱦ��������������ά��������ģ�⡣</div>
  <div class="term-tags"><span class="term-tag">GLSL</span><span class="term-tag">Compute Shader</span><span class="term-tag">3D Scene</span></div>
</div>
<div class="term-card">
  <div class="term-card-title">? TypeScript / React / Next.js [96%]</div>
  <div class="term-card-desc">��ҵ���ִ�ǰ��ȫ��·�ܹ�������״̬�������������뼶��Ӧ��ơ�</div>
  <div class="term-tags"><span class="term-tag">Full-Stack</span><span class="term-tag">SSR/SSG</span><span class="term-tag">Zustand</span></div>
</div>
<div class="term-card">
  <div class="term-card-title">? Rust / Node.js / �߲���ϵͳ [92%]</div>
  <div class="term-card-desc">΢�������ˡ�WASM �����ܼ�����չ���ֲ�ʽ����������ܹ���</div>
  <div class="term-tags"><span class="term-tag">Tokio</span><span class="term-tag">WASM</span><span class="term-tag">gRPC</span></div>
</div>
`,

    projects: () => `
<div class="term-line term-pink">=== DEPLOYED BLACK-PROJECTS / �������� ===</div>
<div class="term-card">
  <div class="term-card-title">01. AetherEngine (WebGPU ��Ⱦ����)</div>
  <div class="term-card-desc">���� WebGPU ����һ�������� 3D ��Ⱦ�������������棬֧�� 100k+ ��̬����ͬ��������</div>
  <div class="term-tags"><span class="term-tag">WebGPU</span><span class="term-tag">Rust WASM</span><span class="term-tag">Compute</span></div>
</div>
<div class="term-card">
  <div class="term-card-title">02. OmniFlow (�ֲ�ʽ��ʱЭ������)</div>
  <div class="term-card-desc">���뼶Эͬ����ƽ̨��֧�� 500+ �����ʵʱ���������� CRDT ״̬�Զ�������</div>
  <div class="term-tags"><span class="term-tag">CRDT</span><span class="term-tag">WebSocket</span><span class="term-tag">Canvas</span></div>
</div>
<div class="term-card">
  <div class="term-card-title">03. NeuroCanvas (AI �������⻭��)</div>
  <div class="term-card-desc">�ں�����ʽ AI �Ķ�ģ̬������������̨��ʵ���ֻ��ͼ�� 4K �����ʸе���ʽֱ����</div>
  <div class="term-tags"><span class="term-tag">GenAI</span><span class="term-tag">Interactive</span><span class="term-tag">React</span></div>
</div>
<div class="term-card">
  <div class="term-card-title">04. HyperMetric (΢�뼶��·���ϵͳ)</div>
  <div class="term-card-desc">רΪ���ͷֲ�ʽ��Ⱥ��ƵĿ��ӻ� APM ������΢�뼶��־������Ͽ���̨��</div>
  <div class="term-tags"><span class="term-tag">Observability</span><span class="term-tag">Rust</span><span class="term-tag">Kafka</span></div>
</div>
`,

    contact: () => `
<div class="term-line term-green">=== COMM FREQUENCIES / ͨѶƵ�� ===</div>
<div class="term-line">Email: <a href="mailto:alex.lin@cyberpunk.io" class="term-cyan">alex.lin@cyberpunk.io</a></div>
<div class="term-line">GitHub: <a href="https://github.com" target="_blank" class="term-cyan">github.com/alex-lin-cipher</a></div>
<div class="term-line">Twitter/X: <a href="https://twitter.com" target="_blank" class="term-cyan">@AlexLinCyber</a></div>
<div class="term-line">WeChat: <span class="term-yellow">CIPHER_LIN_2026</span></div>
<div class="term-line term-dim">��ʱ��ӭ̽�� WebGPU������ͼ�ν��漰�߲���ϵͳ���̼ܹ�������</div>
`,

    clear: () => {
      outputEl.innerHTML = '';
      return '';
    },

    matrix: () => {
      clearInterval(matrixInterval);
      matrixInterval = setInterval(drawMatrix, 15);
      setTimeout(() => {
        clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 35);
      }, 5000);
      return `<div class="term-line term-pink">? MATRIX WARP SPEED ENGAGED (5 SECONDS OVERCLOCK) ?</div>`;
    }
  };

  function printLine(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    outputEl.appendChild(div);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (window.soundEngine) {
      window.soundEngine.playTerminalBeep();
    }

    printLine(`<div class="term-line"><span class="term-green">root@cipher:~$</span> ${cmdRaw}</div>`);

    if (COMMANDS[cmd]) {
      const res = COMMANDS[cmd]();
      if (res) printLine(res);
    } else {
      printLine(`<div class="term-line term-pink">COMMAND NOT FOUND: '${cmdRaw}'. ���� 'help' ��ȡ������Чָ�</div>`);
    }

    inputEl.value = '';
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  // �س���������
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputEl.value);
    }
  });

  enterBtn.addEventListener('click', () => {
    handleCommand(inputEl.value);
  });

  // ���ٵ������
  document.querySelectorAll('.cmd-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      handleCommand(cmd);
    });
  });

  // ��ʼ�Զ���ӡһ�� help
  setTimeout(() => {
    printLine(COMMANDS.help());
  }, 300);
});
