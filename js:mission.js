let session = JSON.parse(localStorage.getItem('co_session'));
if (!session) window.location.href = 'index.html';

let html5QrcodeScanner = null;

function updateUI() {
  const targetEl = document.getElementById('next-balise');
  if (!session.startTime) {
    targetEl.innerText = "DÉPART";
  } else if (session.currentIndex < session.steps.length) {
    targetEl.innerText = session.steps[session.currentIndex];
  } else {
    targetEl.innerText = "ARRIVÉE";
  }
}

function startChrono() {
  setInterval(() => {
    if (!session.startTime) return;
    const now = session.endTime ? session.endTime : Date.now();
    const diffSec = Math.floor((now - session.startTime) / 1000);
    const m = String(Math.floor(diffSec / 60)).padStart(2, '0');
    const s = String(diffSec % 60).padStart(2, '0');
    document.getElementById('chrono').innerText = `${m}:${s}`;
  }, 1000);
}

document.getElementById('btn-scan').addEventListener('click', () => {
  document.getElementById('scanner-wrapper').style.display = 'block';
  document.getElementById('btn-scan').style.display = 'none';

  html5QrcodeScanner = new Html5Qrcode("reader");
  html5QrcodeScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    onScanSuccess
  );
});

document.getElementById('btn-cancel').addEventListener('click', stopScanner);

function stopScanner() {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.stop().then(() => {
      document.getElementById('scanner-wrapper').style.display = 'none';
      document.getElementById('btn-scan').style.display = 'block';
    });
  }
}

function onScanSuccess(decodedText) {
  stopScanner();
  const now = Date.now();

  // 1. SCAN DÉPART
  if (!session.startTime) {
    if (decodedText === CONFIG.START_CODE) {
      session.startTime = now;
      session.scans.push({ step: "START", raw: decodedText, time: now });
      localStorage.setItem('co_session', JSON.stringify(session));
      alert("Départ validé ! Chronomètre lancé.");
    } else {
      alert("QR Code incorrect. Scannez le QR Code DÉPART.");
    }
    updateUI();
    return;
  }

  // 2. COURSE (SANS RÉVÉLER VRAI/LEURRE)
  if (session.currentIndex < session.steps.length) {
    const expectedBalise = session.steps[session.currentIndex];
    
    // Enregistrement anonyme sans validation immédiate de la véracité
    session.scans.push({
      expected: expectedBalise,
      raw: decodedText,
      time: now
    });

    session.currentIndex++;
    localStorage.setItem('co_session', JSON.stringify(session));
    
    updateUI();
    alert("Balise enregistrée. Passez à la suivante !");
    return;
  }

  // 3. SCAN ARRIVÉE
  if (session.currentIndex >= session.steps.length) {
    if (decodedText === CONFIG.FINISH_CODE) {
      session.endTime = now;
      session.scans.push({ step: "FINISH", raw: decodedText, time: now });
      localStorage.setItem('co_session', JSON.stringify(session));
      window.location.href = 'resultat.html';
    } else {
      alert("Scannez le QR Code ARRIVÉE pour terminer la course.");
    }
  }
}

updateUI();
startChrono();