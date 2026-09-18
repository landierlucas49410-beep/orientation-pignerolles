const session = JSON.parse(localStorage.getItem('co_session'));
if (!session || !session.endTime) window.location.href = 'index.html';

function analyserResultats() {
  let balisesCorrectes = 0;
  let leurresScannes = 0;
  let detailHtml = "";

  const totalSec = Math.floor((session.endTime - session.startTime) / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalSecRem = totalSec % 60;

  let lastTime = session.startTime;

  session.scans.forEach((scan, idx) => {
    if (scan.step === "START" || scan.step === "FINISH") return;

    const interSec = Math.floor((scan.time - lastTime) / 1000);
    const mInter = Math.floor(interSec / 60);
    const sInter = String(interSec % 60).padStart(2, '0');
    lastTime = scan.time;

    const expected = scan.expected;
    const raw = scan.raw;
    const isVrai = (raw === `CO_PIGNEROLLES_${expected}`);
    
    let isLeurre = false;
    if (CONFIG.LEURRES_MAP[expected] && CONFIG.LEURRES_MAP[expected].includes(raw)) {
      isLeurre = true;
    }

    if (isVrai) {
      balisesCorrectes++;
      detailHtml += `<tr><td>${expected}</td><td>${mInter}:${sInter}</td><td class="badge-ok">✅ Valide</td></tr>`;
    } else {
      leurresScannes++;
      const explications = CONFIG.LEURRES_INFO[raw] || "Erreur de repérage sur le terrain.";
      detailHtml += `<tr><td>${expected}</td><td>${mInter}:${sInter}</td><td class="badge-err">❌ LEURRE<br><small>${explications}</small></td></tr>`;
    }
  });

  // Calcul du score sur 20
  let pts = (balisesCorrectes * 10) - (leurresScannes * 5);
  if (totalMin > CONFIG.TIME_LIMIT_MINUTES) {
    const depassement = totalMin - CONFIG.TIME_LIMIT_MINUTES;
    pts -= depassement;
  }
  
  let score20 = Math.max(0, (pts / 80) * 20).toFixed(2);

  const container = document.getElementById('bilan-content');
  container.innerHTML = `
    <div style="text-align:center; margin-bottom:15px;">
      <h2>Binôme ${session.binomeId} (${session.groupe})</h2>
      <p>${session.e1} & ${session.e2}</p>
      <div style="font-size:2.2rem; font-weight:bold; color:var(--primary); margin:10px 0;">
        ${score20} / 20
      </div>
      <p>⏱️ Temps total : <b>${totalMin} min ${totalSecRem} s</b></p>
      <p>🎯 Balises : <b>${balisesCorrectes} / 8</b> | ⚠️ Leurres : <b>${leurresScannes}</b></p>
    </div>

    <h3>Détail des étapes</h3>
    <table class="table-results">
      <thead>
        <tr><th>Cible</th><th>Inter.</th><th>Résultat</th></tr>
      </thead>
      <tbody>
        ${detailHtml}
      </tbody>
    </table>

    <div style="margin-top:20px; background:#eef; padding:10px; border-radius:8px; font-size:0.85rem;">
      <b>Question de réflexion :</b><br>
      Si vous avez scanné un leurre, quel indice de la carte (symbole, relief, végétation) n'a pas été suffisamment vérifié ?
    </div>
  `;
}

analyserResultats();