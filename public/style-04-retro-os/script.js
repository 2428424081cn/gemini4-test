// =========================================
// STYLE 04: ���� Windows 95 ����ϵͳ������ɨ���߼�
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  let highestZ = 100;

  // 1. �����ö�����ק�߼�
  function bringToFront(win) {
    highestZ++;
    win.style.zIndex = highestZ;
    document.querySelectorAll('.win-window').forEach(w => w.classList.remove('active'));
    win.classList.add('active');
    updateTaskbar();
  }

  document.querySelectorAll('.win-window').forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));

    const titlebar = win.querySelector('.win-titlebar');
    if (!titlebar) return;

    let isDragging = false;
    let startX, startY, origLeft, origTop;

    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.closest('.win-controls')) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = win.offsetLeft;
      origTop = win.offsetTop;
      bringToFront(win);
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      let newLeft = origLeft + (e.clientX - startX);
      let newTop = origTop + (e.clientY - startY);
      newLeft = Math.max(0, Math.min(window.innerWidth - 60, newLeft));
      newTop = Math.max(0, Math.min(window.innerHeight - 60, newTop));
      win.style.left = `${newLeft}px`;
      win.style.top = `${newTop}px`;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  });

  // 2. ���ڴ�/�ر�/��С��/��󻯿���
  function openWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;
    win.style.display = 'flex';
    bringToFront(win);
    if (window.soundEngine) window.soundEngine.playWinChime();
    updateTaskbar();
  }

  function closeWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;
    win.style.display = 'none';
    updateTaskbar();
  }

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const winId = btn.getAttribute('data-close');
      closeWindow(winId);
      e.stopPropagation();
    });
  });

  document.querySelectorAll('.win-min').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const win = btn.closest('.win-window');
      win.style.display = 'none';
      updateTaskbar();
      e.stopPropagation();
    });
  });

  document.querySelectorAll('.win-max').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const win = btn.closest('.win-window');
      if (win.getAttribute('data-maximized') === 'true') {
        win.style.width = win.getAttribute('data-prev-w');
        win.style.height = win.getAttribute('data-prev-h');
        win.style.top = win.getAttribute('data-prev-t');
        win.style.left = win.getAttribute('data-prev-l');
        win.removeAttribute('data-maximized');
      } else {
        win.setAttribute('data-prev-w', win.style.width || '480px');
        win.setAttribute('data-prev-h', win.style.height || 'auto');
        win.setAttribute('data-prev-t', win.style.top);
        win.setAttribute('data-prev-l', win.style.left);
        win.setAttribute('data-maximized', 'true');
        win.style.top = '0px';
        win.style.left = '0px';
        win.style.width = '100vw';
        win.style.height = 'calc(100vh - 28px)';
      }
      e.stopPropagation();
    });
  });

  // ����ͼ������Ӧ
  document.querySelectorAll('.desk-icon').forEach(icon => {
    icon.addEventListener('dblclick', () => {
      const target = icon.getAttribute('data-target');
      openWindow(target);
    });
    icon.addEventListener('click', () => {
      const target = icon.getAttribute('data-target');
      openWindow(target);
    });
  });

  // 3. ��ʼ�˵�
  const startBtn = document.getElementById('start-btn');
  const startMenu = document.getElementById('start-menu');

  startBtn.addEventListener('click', () => {
    startMenu.classList.toggle('show');
    startBtn.classList.toggle('pressed');
  });

  document.addEventListener('click', (e) => {
    if (!startBtn.contains(e.target) && !startMenu.contains(e.target)) {
      startMenu.classList.remove('show');
      startBtn.classList.remove('pressed');
    }
  });

  document.querySelectorAll('.start-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      openWindow(target);
      startMenu.classList.remove('show');
      startBtn.classList.remove('pressed');
    });
  });

  // 4. ��������̬����
  function updateTaskbar() {
    const taskContainer = document.getElementById('taskbar-tasks');
    taskContainer.innerHTML = '';

    document.querySelectorAll('.win-window').forEach(win => {
      if (win.style.display !== 'none') {
        const titleText = win.querySelector('.win-title').textContent;
        const iconText = win.querySelector('.win-icon').textContent;
        const tab = document.createElement('div');
        tab.className = `task-tab ${win.classList.contains('active') ? 'active' : ''}`;
        tab.innerHTML = `<span>${iconText}</span> <span>${titleText}</span>`;
        tab.addEventListener('click', () => {
          if (win.classList.contains('active')) {
            win.style.display = 'none';
            updateTaskbar();
          } else {
            bringToFront(win);
          }
        });
        taskContainer.appendChild(tab);
      }
    });
  }

  // 5. ������ʱ��
  function updateWinClock() {
    const now = new Date();
    const clock = document.getElementById('win-clock');
    if (clock) {
      clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
  setInterval(updateWinClock, 1000);
  updateWinClock();

  // 6. ɨ�׼���С��Ϸ (8x8, 10����)
  const gridEl = document.getElementById('mines-grid');
  const faceBtn = document.getElementById('mines-reset-btn');
  const flagCountEl = document.getElementById('mines-flag-count');
  const timerEl = document.getElementById('mines-timer');

  const ROWS = 8;
  const COLS = 8;
  const MINES = 10;
  let board = [];
  let revealedCount = 0;
  let flagsLeft = MINES;
  let gameOver = false;
  let gameTimer = null;
  let seconds = 0;

  function initMines() {
    clearInterval(gameTimer);
    seconds = 0;
    timerEl.textContent = '000';
    faceBtn.textContent = '??';
    gameOver = false;
    revealedCount = 0;
    flagsLeft = MINES;
    flagCountEl.textContent = '010';
    gridEl.innerHTML = '';
    board = [];

    // �����հ�
    for (let r = 0; r < ROWS; r++) {
      board[r] = [];
      for (let c = 0; c < COLS; c++) {
        board[r][c] = { mine: false, count: 0, revealed: false, flagged: false };
      }
    }

    // ����
    let planted = 0;
    while (planted < MINES) {
      const rr = Math.floor(Math.random() * ROWS);
      const cc = Math.floor(Math.random() * COLS);
      if (!board[rr][cc].mine) {
        board[rr][cc].mine = true;
        planted++;
      }
    }

    // ������������
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!board[r][c].mine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
                count++;
              }
            }
          }
          board[r][c].count = count;
        }
      }
    }

    // ��Ⱦ DOM
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = document.createElement('div');
        cell.className = 'mine-cell';
        cell.dataset.r = r;
        cell.dataset.c = c;

        cell.addEventListener('click', () => revealCell(r, c));
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          toggleFlag(r, c);
        });

        gridEl.appendChild(cell);
      }
    }

    gameTimer = setInterval(() => {
      if (!gameOver && seconds < 999) {
        seconds++;
        timerEl.textContent = String(seconds).padStart(3, '0');
      }
    }, 1000);
  }

  function revealCell(r, c) {
    if (gameOver || board[r][c].revealed || board[r][c].flagged) return;

    board[r][c].revealed = true;
    revealedCount++;
    const idx = r * COLS + c;
    const cell = gridEl.children[idx];
    cell.classList.add('revealed');

    if (board[r][c].mine) {
      cell.textContent = '??';
      cell.style.background = '#ff0000';
      faceBtn.textContent = '??';
      gameOver = true;
      clearInterval(gameTimer);
      revealAllMines();
      return;
    }

    if (board[r][c].count > 0) {
      cell.textContent = board[r][c].count;
      const colors = ['', 'blue', 'green', 'red', 'darkblue', 'brown', 'cyan', 'black', 'gray'];
      cell.style.color = colors[board[r][c].count];
    } else {
      // ��ɢ�հ�
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !board[nr][nc].revealed) {
            revealCell(nr, nc);
          }
        }
      }
    }

    if (revealedCount === ROWS * COLS - MINES) {
      faceBtn.textContent = '??';
      gameOver = true;
      clearInterval(gameTimer);
      if (window.soundEngine) window.soundEngine.playWinChime();
      alert('��ϲɨ��ʤ�������Ӻ��Ĵ���ͬ�����޵��� BUG��');
    }
  }

  function toggleFlag(r, c) {
    if (gameOver || board[r][c].revealed) return;
    const idx = r * COLS + c;
    const cell = gridEl.children[idx];

    if (!board[r][c].flagged && flagsLeft > 0) {
      board[r][c].flagged = true;
      flagsLeft--;
      cell.textContent = '??';
    } else if (board[r][c].flagged) {
      board[r][c].flagged = false;
      flagsLeft++;
      cell.textContent = '';
    }
    flagCountEl.textContent = String(flagsLeft).padStart(3, '0');
  }

  function revealAllMines() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c].mine) {
          const idx = r * COLS + c;
          gridEl.children[idx].textContent = '??';
        }
      }
    }
  }

  faceBtn.addEventListener('click', initMines);
  initMines();
  updateTaskbar();
});
