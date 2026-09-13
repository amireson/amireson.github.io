const slide = document.getElementById('slide');
const viewer = document.getElementById('viewer');
const indicator = document.getElementById('pageIndicator');
const installBtn = document.getElementById('installBtn');
const help = document.getElementById('help');

const slideCount = 21;
const slidePath = n => `slides/Slide${String(n)}.png`;
let index = 1;
let scale = 1;
let tx = 0;
let ty = 0;
let pointers = new Map();
let gestureStart = null;
let lastTap = 0;
let deferredPrompt = null;

function render() {
  slide.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${scale})`;
}

function resetView() {
  scale = 1; tx = 0; ty = 0; render();
}

function clampPan() {
  if (scale <= 1) { tx = 0; ty = 0; return; }
  const vw = viewer.clientWidth;
  const vh = viewer.clientHeight;
  const iw = slide.naturalWidth || vw;
  const ih = slide.naturalHeight || vh;
  const fit = Math.min(vw / iw, vh / ih);
  const baseW = iw * fit;
  const baseH = ih * fit;
  const maxX = Math.max(0, (baseW * scale - vw) / 2);
  const maxY = Math.max(0, (baseH * scale - vh) / 2);
  tx = Math.max(-maxX, Math.min(maxX, tx));
  ty = Math.max(-maxY, Math.min(maxY, ty));
}

function showSlide(n) {
  index = Math.max(1, Math.min(slideCount, n));
  resetView();
  slide.src = slidePath(index);
  slide.alt = `Field trip slide ${index} of ${slideCount}`;
  indicator.textContent = `${index} / ${slideCount}`;
  // Preload neighbors.
  [index - 1, index + 1].forEach(i => {
    if (i >= 1 && i <= slideCount) {
      const im = new Image(); im.src = slidePath(i);
    }
  });
}

function next() { if (index < slideCount) showSlide(index + 1); }
function prev() { if (index > 1) showSlide(index - 1); }

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

viewer.addEventListener('pointerdown', e => {
  viewer.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

  if (pointers.size === 1) {
    gestureStart = {
      x: e.clientX, y: e.clientY,
      tx, ty, scale,
      time: performance.now(),
      moved: false
    };
  } else if (pointers.size === 2) {
    const [a,b] = [...pointers.values()];
    gestureStart = {
      dist: distance(a,b),
      scale,
      tx, ty,
      midpointX: (a.x+b.x)/2,
      midpointY: (a.y+b.y)/2
    };
  }
});

viewer.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

  if (pointers.size === 2) {
    const [a,b] = [...pointers.values()];
    if (!gestureStart?.dist) return;
    const d = distance(a,b);
    const newScale = Math.max(1, Math.min(5, gestureStart.scale * d / gestureStart.dist));
    scale = newScale;
    clampPan();
    render();
    return;
  }

  if (pointers.size === 1 && gestureStart) {
    const dx = e.clientX - gestureStart.x;
    const dy = e.clientY - gestureStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 8) gestureStart.moved = true;
    if (scale > 1) {
      tx = gestureStart.tx + dx;
      ty = gestureStart.ty + dy;
      clampPan();
      render();
    }
  }
});

viewer.addEventListener('pointerup', e => {
  const ended = pointers.get(e.pointerId);
  pointers.delete(e.pointerId);

  if (pointers.size > 0) {
    if (pointers.size === 1) {
      const p = [...pointers.values()][0];
      gestureStart = {x:p.x, y:p.y, tx, ty, scale, time:performance.now(), moved:false};
    }
    return;
  }

  if (!gestureStart || !ended) return;

  if (scale > 1) {
    clampPan(); render(); gestureStart = null; return;
  }

  const dx = e.clientX - (gestureStart.x ?? e.clientX);
  const dy = e.clientY - (gestureStart.y ?? e.clientY);
  const dt = performance.now() - (gestureStart.time ?? performance.now());

  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2 && dt < 700) {
    dx < 0 ? next() : prev();
    gestureStart = null;
    return;
  }

  if (!gestureStart.moved) {
    const now = performance.now();
    if (now - lastTap < 320) {
      if (scale === 1) {
        scale = 2.2; tx = 0; ty = 0;
      } else {
        resetView();
      }
      render();
      lastTap = 0;
    } else {
      lastTap = now;
      // Delay single-tap navigation slightly so double-tap can win.
      setTimeout(() => {
        if (lastTap !== now) return;
        const x = e.clientX / viewer.clientWidth;
        if (x < 0.35) prev();
        else if (x > 0.65) next();
        lastTap = 0;
      }, 330);
    }
  }
  gestureStart = null;
});

viewer.addEventListener('pointercancel', e => {
  pointers.delete(e.pointerId);
  gestureStart = null;
});

window.addEventListener('keydown', e => {
  if (['ArrowRight','PageDown',' '].includes(e.key)) next();
  if (['ArrowLeft','PageUp'].includes(e.key)) prev();
  if (e.key === 'Escape') resetView();
});

window.addEventListener('resize', () => { clampPan(); render(); });

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async e => {
  e.stopPropagation();
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

window.addEventListener('appinstalled', () => { installBtn.hidden = true; });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
}

showSlide(1);
setTimeout(() => help.classList.remove('show'), 3500);
