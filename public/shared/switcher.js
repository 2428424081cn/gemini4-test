/**
 * ȫ�ָ�������л��� & ��ί��ʱ������
 */
(function() {
  const STYLES = [
    { id: 'style-01-cyberpunk', name: '01. �����ڿ� / �޺��ն�', icon: '?', desc: 'CRTɨ���� / ������ / �ɽ���������', tag: 'CYBER' },
    { id: 'style-02-neobrutalism', name: '02. ��Ұ���� / �Ϸ�˹����', icon: '??', desc: '�ֺڱ߿� / ʵɫ��ӲͶӰ / Ȥζ��ֽ', tag: 'POP' },
    { id: 'style-03-glassmorphism', name: '03. �����ζ / Һ̬ĥɰ', icon: '?', desc: 'ë������̬ / �Ӳ�΢�� / �����ʸ�', tag: 'LUXE' },
    { id: 'style-04-retro-os', name: '04. ���� Win95 ����ϵͳ', icon: '??', desc: '���䴰�� / ��ʼ�˵� / ��������ɨ��', tag: 'RETRO' },
    { id: 'style-05-zen-ink', name: '05. ����ʽˮī���⻭��', icon: '??', desc: '��ֽ��Ⱦ / �����鷨 / ��������չ��', tag: 'ZEN' },
    { id: 'style-06-y2k-chrome', name: '06. ǧ�� Y2K Һ̬����', icon: '??', desc: 'ȫϢ�ʺ�ɫ / ˮ������ / 3D�ӲƬ', tag: 'Y2K' },
    { id: 'style-07-editorial', name: '07. ��ʿƽ����־�Ű�', icon: '??', desc: '�ǶԳƱ���դ�� / �����Ű� / ��������', tag: 'SWISS' },
    { id: 'style-08-arcade-8bit', name: '08. 8-Bit ���ؽֻ���Ϸ', icon: '???', desc: 'NES���� / HP/MP״̬�� / RPG������־', tag: 'GAME' },
    { id: 'style-09-scifi-hud', name: '09. δ�����̽�� HUD', icon: '??', desc: '3D�ǿ�ԾǨ / ս���״� / ȫϢң����', tag: 'SCI-FI' },
    { id: 'style-10-claymorphism', name: '10. ������� Bento ��ǩ', icon: '??', desc: '��������Ӱ / �������� / ��ǩ�ֻ��ʸ�', tag: 'CLAY' },
  ];

  // ������Ը�·��
  const currentPath = window.location.pathname;
  const isRoot = !currentPath.includes('/style-');
  const rootPrefix = isRoot ? './' : '../';

  // ʶ��ǰ����һ�����
  let currentStyleIndex = -1;
  STYLES.forEach((s, idx) => {
    if (currentPath.includes(s.id)) {
      currentStyleIndex = idx;
    }
  });

  function initSwitcher() {
    // ע�� DOM
    const dockContainer = document.createElement('div');
    dockContainer.id = 'global-switcher-dock';

    const currentStyle = currentStyleIndex >= 0 ? STYLES[currentStyleIndex] : null;
    const labelText = currentStyle ? currentStyle.name.split(' ')[1] : '�����������';
    const badgeText = currentStyleIndex >= 0 ? `${currentStyleIndex + 1}/10` : 'PORTAL';

    dockContainer.innerHTML = `
      <div class="sw-dock-pill" id="sw-open-btn" title="���չ������л��������">
        <span>${currentStyle ? currentStyle.icon : '??'}</span>
        <span>${labelText}</span>
        <span class="sw-badge-num">${badgeText}</span>
        <span style="opacity:0.6;font-size:11px;">?</span>
      </div>

      <div class="sw-modal-overlay" id="sw-modal">
        <div class="sw-modal-card">
          <div class="sw-header">
            <div class="sw-header-title">
              <span>???</span>
              <span>10 �ǰ�˲�ͬ������ҽ�����վ</span>
            </div>
            <div class="sw-header-actions">
              <button class="sw-icon-btn" id="sw-audio-toggle" title="�л���������">??</button>
              <a href="${rootPrefix}index.html" class="sw-icon-btn" title="������������" style="text-decoration:none;">??</a>
              <button class="sw-icon-btn" id="sw-close-btn" title="�ر����">?</button>
            </div>
          </div>

          <div class="sw-tabs">
            <button class="sw-tab-btn active" data-target="tab-styles">?? �л���� (${STYLES.length})</button>
            <button class="sw-tab-btn" data-target="tab-score">? ��ί������</button>
          </div>

          <div class="sw-content">
            <!-- TAB 1: ����л� -->
            <div id="tab-styles" class="sw-tab-pane">
              <div class="sw-grid">
                ${STYLES.map((s, idx) => {
                  const isCur = idx === currentStyleIndex;
                  const targetHref = `${rootPrefix}${s.id}/index.html`;
                  return `
                    <a href="${targetHref}" class="sw-style-item ${isCur ? 'current' : ''}">
                      <div class="sw-style-icon">${s.icon}</div>
                      <div class="sw-style-info">
                        <div class="sw-style-name">${s.name}</div>
                        <div class="sw-style-desc">${s.desc}</div>
                      </div>
                      ${isCur ? '<span style="color:#6366f1;font-weight:700;font-size:12px;">��ǰ</span>' : ''}
                    </a>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- TAB 2: ������ -->
            <div id="tab-score" class="sw-tab-pane" style="display:none;">
              <div class="sw-score-panel">
                <p style="margin:0 0 10px 0;font-size:13px;color:var(--sw-text-muted);">
                  ����������: <b style="color:#fff;">${currentStyle ? currentStyle.name : '10 �׷�����׷���'}</b>��
                  �϶������֣�����ֱ��һ�����ɽṹ�������ܽᡣ
                </p>

                <div class="sw-score-row">
                  <span class="sw-score-label">1. �Ӿ������� (Visual Impact):</span>
                  <input type="range" class="sw-score-slider" id="score-visual" min="60" max="100" value="95">
                  <span class="sw-score-val" id="val-visual">95</span>
                </div>

                <div class="sw-score-row">
                  <span class="sw-score-label">2. ������϶� (Authenticity):</span>
                  <input type="range" class="sw-score-slider" id="score-style" min="60" max="100" value="98">
                  <span class="sw-score-val" id="val-style">98</span>
                </div>

                <div class="sw-score-row">
                  <span class="sw-score-label">3. �����붯Ч (Interaction):</span>
                  <input type="range" class="sw-score-slider" id="score-interaction" min="60" max="100" value="94">
                  <span class="sw-score-val" id="val-interaction">94</span>
                </div>

                <div class="sw-score-row">
                  <span class="sw-score-label">4. �������ʸ� (Craftsmanship):</span>
                  <input type="range" class="sw-score-slider" id="score-code" min="60" max="100" value="96">
                  <span class="sw-score-val" id="val-code">96</span>
                </div>

                <textarea class="sw-score-comment" id="score-comment" placeholder="��ί���� / �����Ľ����� (��ѡ)...">ʮ����վ��ȫ��̥���ǣ�������Էḻ����ģ�崿��д��������������Ч�ǳ���ɫ��</textarea>

                <div class="sw-score-total">
                  <div>
                    <div style="font-size:12px;color:var(--sw-text-muted);">��Ȩ�ۺ�����</div>
                    <div style="font-size:24px;font-weight:800;color:#38bdf8;" id="total-score-val">95.8 / 100</div>
                  </div>
                  <button class="sw-btn-primary" id="btn-copy-review">?? һ���������󱨸�</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dockContainer);

    // ���¼�
    const openBtn = document.getElementById('sw-open-btn');
    const closeBtn = document.getElementById('sw-close-btn');
    const modal = document.getElementById('sw-modal');
    const audioBtn = document.getElementById('sw-audio-toggle');

    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      if (window.soundEngine) window.soundEngine.playPopClick();
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // �����л�
    audioBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const enabled = window.soundEngine.toggleSound();
        audioBtn.textContent = enabled ? '??' : '??';
        if (enabled) window.soundEngine.playPopClick();
      }
    });

    // Tabs �л�
    const tabs = dockContainer.querySelectorAll('.sw-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        document.getElementById('tab-styles').style.display = targetId === 'tab-styles' ? 'block' : 'none';
        document.getElementById('tab-score').style.display = targetId === 'tab-score' ? 'block' : 'none';
        if (window.soundEngine) window.soundEngine.playPopClick();
      });
    });

    // ��̬��ּ���
    const sliders = ['visual', 'style', 'interaction', 'code'];
    function calcScore() {
      let sum = 0;
      sliders.forEach(key => {
        const slider = document.getElementById(`score-${key}`);
        const valSpan = document.getElementById(`val-${key}`);
        valSpan.textContent = slider.value;
        sum += parseFloat(slider.value);
      });
      const avg = (sum / 4).toFixed(1);
      document.getElementById('total-score-val').textContent = `${avg} / 100`;
      return avg;
    }

    sliders.forEach(key => {
      document.getElementById(`score-${key}`).addEventListener('input', calcScore);
    });

    // ���Ʊ���
    const copyBtn = document.getElementById('btn-copy-review');
    copyBtn.addEventListener('click', () => {
      const avg = calcScore();
      const comment = document.getElementById('score-comment').value;
      const targetName = currentStyle ? currentStyle.name : 'ȫ��10�״�ǰ�˷��';
      const text = `�����ҽ��ܴ�ǰ����վ���󱨸桿
�������: ${targetName}
�ۺϵ÷�: ${avg} ��
- �Ӿ�������: ${document.getElementById('val-visual').textContent}
- ������϶�: ${document.getElementById('val-style').textContent}
- �����붯Ч: ${document.getElementById('val-interaction').textContent}
- �������ʸ�: ${document.getElementById('val-code').textContent}
�������:
${comment}`;

      navigator.clipboard.writeText(text).then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '? �ѳɹ����Ƶ������壡';
        setTimeout(() => copyBtn.innerHTML = orig, 2000);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwitcher);
  } else {
    initSwitcher();
  }
})();
