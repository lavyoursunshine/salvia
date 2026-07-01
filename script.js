
/* ================= DATA ================= */
const SYMPTOMS = [
  {id:'demam', label:'Demam Tinggi', points:5, region:'kepala'},
  {id:'menggigil', label:'Menggigil', points:2, region:'kepala'},
  {id:'sakitKepala', label:'Sakit Kepala', points:2, region:'kepala'},
  {id:'dehidrasi', label:'Tanda Dehidrasi', points:8, region:'sistemik'},
  {id:'kelelahan', label:'Kelelahan Akut', points:3, region:'sistemik'},
  {id:'mual', label:'Mual Intens', points:4, region:'epigastrium'},
  {id:'muntah', label:'Muntah', points:4, region:'epigastrium'},
  {id:'kram', label:'Kram Perut Akut', points:7, region:'abdomen'},
  {id:'diareAir', label:'Diare Berair', points:5, region:'abdomen'},
  {id:'diareDarah', label:'Diare Berdarah', points:10, region:'abdomen'},
];
const REGIONS = {
  kepala:{label:'Kepala / Neurologis', icon:'head'},
  sistemik:{label:'Sistemik / Rongga Mulut', icon:'pulse'},
  epigastrium:{label:'Epigastrium / Pencernaan Atas', icon:'stomach'},
  abdomen:{label:'Abdomen & Usus Bawah', icon:'abdomen'},
};
const REGION_ORDER = ['kepala','sistemik','epigastrium','abdomen'];

const BEHAVIORS = [
  {id:'cuciKran', label:'Mencuci daging mentah di bawah kran', points:8, zone:'wastafel', tip:'Hindari mencuci daging unggas mentah langsung di kran terbuka; gunakan wadah tertutup agar percikan aerosol tidak menyebar.'},
  {id:'cuciTangan', label:'Tidak cuci tangan pakai sabun usai pegang daging', points:6, zone:'wastafel', tip:'Cuci tangan dengan sabun minimal 20 detik setiap selesai kontak dengan daging mentah.'},
  {id:'spons', label:'Spons cuci piring basah tidak disterilkan', points:2, zone:'wastafel', tip:'Ganti atau sterilkan spons cuci piring secara rutin dengan air panas.'},
  {id:'talenan', label:'Talenan kayu/pori dipakai gabung daging & sayur', points:8, zone:'konter', tip:'Pisahkan talenan: satu khusus daging mentah, satu untuk sayur/buah — gunakan kode warna agar tidak tertukar.'},
  {id:'thawing', label:'Thawing daging di suhu ruang lebih dari 2 jam', points:5, zone:'konter', tip:'Cairkan daging beku di dalam kulkas, bukan dibiarkan di suhu ruang.'},
  {id:'lap', label:'Lap dapur dipakai berulang untuk tangan & meja', points:4, zone:'konter', tip:'Gunakan lap terpisah untuk tangan dan permukaan meja, cuci secara berkala dengan air panas.'},
  {id:'telur', label:'Telur mentah tanpa wadah tertutup di kulkas', points:4, zone:'kulkas', tip:'Simpan telur dalam wadah tertutup di rak kulkas, bukan di rak pintu.'},
  {id:'dagingRak', label:'Daging mentah disimpan di rak atas kulkas', points:4, zone:'kulkas', tip:'Simpan daging mentah di rak paling bawah kulkas agar cairan tidak menetes ke makanan lain.'},
  {id:'suhuMasak', label:'Memasak unggas dengan suhu inti di bawah 75°C', points:7, zone:'kompor', tip:'Pastikan suhu inti daging unggas mencapai minimal 75°C sebelum disajikan.'},
  {id:'sisaTerbuka', label:'Makanan matang/sisa dibiarkan terbuka >2 jam', points:2, zone:'kompor', tip:'Simpan makanan matang dalam wadah tertutup dan dinginkan dalam 2 jam setelah dimasak.'},
];
const ZONES = {
  wastafel:{label:'Area Wastafel', icon:'droplet'},
  konter:{label:'Area Konter & Persiapan', icon:'knife'},
  kulkas:{label:'Area Kulkas', icon:'snowflake'},
  kompor:{label:'Area Kompor & Penyajian', icon:'flame'},
};
const ZONE_ORDER = ['wastafel','konter','kulkas','kompor'];

const PATHOGEN_PHASES = [
  {tag:'Fase 1', name:'Ingestion & Acid Tolerance', desc:'Salmonella harus melewati benteng asam lambung. Dibutuhkan sekitar 100 ribu hingga 1 juta sel bakteri agar sebagian berhasil selamat — namun ambang ini turun tajam pada kondisi asam lambung rendah (hipoklorhidria).'},
  {tag:'Fase 2', name:'Adhesion', desc:'Bakteri yang lolos menempelkan diri pada dinding usus menggunakan struktur rambut halus (fimbriae), mengunci posisi pada sel epitel dan sel M di brush border usus.'},
  {tag:'Fase 3', name:'Invasion (SPI-1)', desc:'Melalui sistem sekresi Tipe III (T3SS), Salmonella menyuntikkan protein efektor ke sel inang, memaksa membran sel melipat (ruffling) dan "menelan" bakteri masuk ke dalam.'},
  {tag:'Fase 4', name:'Intracellular (SPI-2)', desc:'Alih-alih dihancurkan, bakteri bersembunyi dalam kantung pelindung (Salmonella-containing vacuole) dan memblokir penggabungan dengan lisosom — menjadikannya bunker replikasi yang aman.'},
  {tag:'Fase 5', name:'Inflammation', desc:'Sistem imun melepaskan gelombang sel radang ke lumen usus, merusak epitel dan mengganggu transpor cairan — inilah asal muasal manifestasi klinis diare berair.'},
  {tag:'Fase 6', name:'Systemic Dissemination', desc:'Pada galur tertentu, bakteri membajak sel makrofag sebagai kendaraan untuk menyebar melalui sistem limfatik menuju hati dan limpa, memicu demam enterik/tifoid.'},
];

const FUNFACTS = [
  {icon:'droplet', title:'Dosis Infeksius yang Rapuh', desc:'Salmonella butuh 100 ribu–1 juta sel bakteri untuk menembus asam lambung sehat — tapi ambang ini turun drastis pada penderita asam lambung rendah.'},
  {icon:'eye', title:'Tak Terdeteksi Indra', desc:'Kontaminasi Salmonella tidak mengubah rasa, bau, atau tampilan makanan, sehingga sulit dikenali tanpa kewaspadaan ekstra.'},
  {icon:'clock', title:'Bertahan Berhari-hari', desc:'Bakteri ini bisa bertahan hidup di permukaan kering seperti talenan dan spons selama berjam-jam hingga berhari-hari.'},
  {icon:'chicken', title:'Pembawa Tanpa Gejala', desc:'Unggas yang tampak sehat secara klinis pun bisa menjadi asymptomatic carrier tanpa menunjukkan tanda sakit sama sekali.'},
  {icon:'thermo', title:'Satu Angka Penentu: 75°C', desc:'Memasak daging unggas hingga suhu internal minimal 75°C adalah satu-satunya cara memastikan bakteri mati total.'},
  {icon:'wave', title:'Bahaya di Balik Kran', desc:'Mencuci ayam mentah di bawah kran justru meningkatkan risiko — percikan air kontaminan bisa menyebar hingga radius 1 meter.'},
];

const SUMBER = [
  {icon:'chicken', title:'Unggas & Telur Mentah', desc:'Reservoir utama — saluran cerna unggas menjadi tempat tinggal alami bakteri Salmonella.'},
  {icon:'milk', title:'Daging & Susu Tidak Dipasteurisasi', desc:'Produk hewani mentah atau setengah matang menyimpan risiko kontaminasi yang signifikan.'},
  {icon:'knife', title:'Kontaminasi Silang Alat Masak', desc:'Biofilm menempel di pori-pori talenan kayu dan spons yang jarang disterilkan.'},
  {icon:'droplet2', title:'Air atau Es Batu Tercemar', desc:'Sumber air yang tidak terjamin kebersihannya dapat menjadi jalur penularan tersembunyi.'},
  {icon:'leaf', title:'Sayur & Buah Mentah', desc:'Produk segar yang tercemar pupuk kandang atau air irigasi tidak higienis berisiko membawa bakteri.'},
  {icon:'paw', title:'Hewan Peliharaan', desc:'Reptil, unggas hias, dan beberapa hewan peliharaan lain dapat menjadi pembawa (carrier) Salmonella.'},
];

const ICONS = {
  head:'<circle cx="12" cy="8" r="5"/><path d="M9 21v-4M15 21v-4"/>',
  pulse:'<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  stomach:'<path d="M8 3c0 3-3 3-3 7a7 7 0 0 0 14 0c0-2-1-3-2-3s-2 2-4 2-2-3-5-6Z"/>',
  abdomen:'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>',
  droplet:'<path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13Z"/>',
  knife:'<path d="M4 20 18 6M14 2l8 8-4 4-8-8Z"/>',
  snowflake:'<path d="M12 2v20M4 7l16 10M20 7 4 17M2 12h20"/>',
  flame:'<path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 1 1 2 2 2 0-3-2-4-2-8 1 1 3 0 3 0Z"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  chicken:'<path d="M12 3c3 0 5 2 5 5 0 2-1 3-1 3l3 2-3 1 1 3-3-1-1 3-2-3-2 3-1-3-3 1 1-3-3-1 3-2s-1-1-1-3c0-3 2-5 5-5Z"/>',
  thermo:'<rect x="10" y="3" width="4" height="12" rx="2"/><circle cx="12" cy="18" r="3"/>',
  wave:'<path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>',
  milk:'<path d="M9 2h6l1 4-2 2v11a2 2 0 0 1-2 2h-0a2 2 0 0 1-2-2V8L8 6l1-4Z"/>',
  droplet2:'<path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13Z"/>',
  leaf:'<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z"/><path d="M4 20 14 10"/>',
  paw:'<circle cx="7" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="8" r="2"/><path d="M6 15a5 5 0 0 1 12 0c0 3-3 4-6 4s-6-1-6-4Z"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  lock:'<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  target:'<path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/>',
};
function iconSvg(name, cls){ return '<svg class="'+(cls||'icon')+'" viewBox="0 0 24 24">'+(ICONS[name]||ICONS.check)+'</svg>'; }

/* ================= STATE ================= */
const state = {
  screeningDone:false,
  symptoms:{}, behaviors:{},
  openRegion:null, openZone:null,
  activePhase:0, result:null,
};
SYMPTOMS.forEach(s=>state.symptoms[s.id]=false);
BEHAVIORS.forEach(b=>state.behaviors[b.id]=false);

/* ================= GATEWAY ================= */
const gatewayCheck = document.getElementById('gatewayCheck');
const gatewayBtn = document.getElementById('gatewayBtn');
gatewayCheck.addEventListener('change', ()=>{ gatewayBtn.disabled = !gatewayCheck.checked; });
gatewayBtn.addEventListener('click', ()=>{
  document.getElementById('gateway').classList.add('hidden');
  document.body.style.overflow='';
});

/* ================= TOAST ================= */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2800);
}

/* ================= NAV / VIEW SWITCH ================= */
function switchView(view){
  if(view==='hasil' && !state.screeningDone){
    showToast('Selesaikan screening terlebih dahulu untuk melihat hasil.');
    return;
  }
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  window.scrollTo({top:0, behavior:'smooth'});
}
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>switchView(btn.dataset.view));
});

/* ================= EDUKASI TABS ================= */
document.querySelectorAll('.edu-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.edu-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.edu-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-'+tab.dataset.tab).classList.add('active');
  });
});

/* ---- Pathogenesis timeline ---- */
function renderTimeline(){
  const track = document.getElementById('timelineTrack');
  track.innerHTML = PATHOGEN_PHASES.map((p,i)=>
    `<div class="tl-node glass ${i===state.activePhase?'active':''}" data-i="${i}">
      <div class="tl-num">${p.tag}</div>
      <div class="tl-name">${p.name}</div>
      <div class="tl-tag">Klik untuk detail</div>
    </div>`).join('');
  track.querySelectorAll('.tl-node').forEach(n=>{
    n.addEventListener('click', ()=>{ state.activePhase = parseInt(n.dataset.i); renderTimeline(); renderTlDetail(); });
  });
}
function renderTlDetail(){
  const p = PATHOGEN_PHASES[state.activePhase];
  document.getElementById('tlDetail').innerHTML = `
    <div class="tl-detail-eyebrow"><div class="tl-detail-badge">${state.activePhase+1}</div><div class="eyebrow" style="margin:0">${p.tag}</div></div>
    <h4>${p.name}</h4><p>${p.desc}</p>`;
}
renderTimeline(); renderTlDetail();

/* ---- Fun facts & sumber grids ---- */
function renderInfoGrid(elId, data){
  document.getElementById(elId).innerHTML = data.map(d=>
    `<div class="info-card glass reveal in-view"><div class="ic-icon">${iconSvg(d.icon)}</div><h5>${d.title}</h5><p>${d.desc}</p></div>`).join('');
}
renderInfoGrid('funfactGrid', FUNFACTS);
renderInfoGrid('sumberGrid', SUMBER);

/* ================= SOMATIC MATRIX ================= */
function renderRegionPanels(){
  const wrap = document.getElementById('regionPanels');
  wrap.innerHTML = REGION_ORDER.map(rKey=>{
    const r = REGIONS[rKey];
    const items = SYMPTOMS.filter(s=>s.region===rKey);
    const selectedCount = items.filter(s=>state.symptoms[s.id]).length;
    const isOpen = state.openRegion===rKey;
    return `<div class="region-panel glass ${isOpen?'expanded':''}" data-region="${rKey}">
      <div class="rp-head" data-toggle="${rKey}">
        <div class="rp-head-left"><div class="rp-icon">${iconSvg(r.icon)}</div><h5>${r.label}</h5></div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="rp-count">${selectedCount}/${items.length}</span>
          <svg class="rp-chevron icon" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
      <div class="rp-body"><div class="rp-body-inner">
        ${items.map(s=>`<label class="check-row"><input type="checkbox" data-symptom="${s.id}" ${state.symptoms[s.id]?'checked':''}><span class="cr-label">${s.label}</span><span class="cr-points">+${s.points}</span></label>`).join('')}
      </div></div>
    </div>`;
  }).join('');

  wrap.querySelectorAll('[data-toggle]').forEach(h=>{
    h.addEventListener('click', ()=>{
      const key = h.dataset.toggle;
      state.openRegion = state.openRegion===key ? null : key;
      renderRegionPanels(); syncHotspots();
    });
  });
  wrap.querySelectorAll('input[data-symptom]').forEach(cb=>{
    cb.addEventListener('change', ()=>{
      state.symptoms[cb.dataset.symptom] = cb.checked;
      renderRegionPanels(); syncHotspots(); updateProgress();
    });
  });
}
function syncHotspots(){
  document.querySelectorAll('.hotspot').forEach(hs=>{
    const region = hs.dataset.region;
    const hasSel = SYMPTOMS.some(s=>s.region===region && state.symptoms[s.id]);
    hs.classList.toggle('open', state.openRegion===region);
    hs.classList.toggle('has-selection', hasSel);
  });
}
document.querySelectorAll('.hotspot').forEach(hs=>{
  const activate = ()=>{
    const key = hs.dataset.region;
    state.openRegion = state.openRegion===key ? null : key;
    renderRegionPanels(); syncHotspots();
    document.getElementById('regionPanels').scrollIntoView({behavior:'smooth', block:'nearest'});
  };
  hs.addEventListener('click', activate);
  hs.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); activate(); }});
});

/* ================= BIOSAFETY BLUEPRINT ================= */
function renderZoneGrid(){
  const grid = document.getElementById('zoneGrid');
  grid.innerHTML = ZONE_ORDER.map(zKey=>{
    const z = ZONES[zKey];
    const items = BEHAVIORS.filter(b=>b.zone===zKey);
    const selectedCount = items.filter(b=>state.behaviors[b.id]).length;
    const isOpen = state.openZone===zKey;
    return `<div class="zone-card glass ${isOpen?'open':''}" data-zone="${zKey}">
      <div class="zone-card-top"><div class="zone-icon">${iconSvg(z.icon)}</div><span class="rp-count">${selectedCount}/${items.length}</span></div>
      <h5>${z.label}</h5>
    </div>`;
  }).join('');
  grid.querySelectorAll('.zone-card').forEach(c=>{
    c.addEventListener('click', ()=>{
      const key = c.dataset.zone;
      state.openZone = state.openZone===key ? null : key;
      renderZoneGrid(); renderZonePanels();
      document.getElementById('zonePanels').scrollIntoView({behavior:'smooth', block:'nearest'});
    });
  });
}
function renderZonePanels(){
  const wrap = document.getElementById('zonePanels');
  if(!state.openZone){ wrap.innerHTML=''; return; }
  const zKey = state.openZone; const z = ZONES[zKey];
  const items = BEHAVIORS.filter(b=>b.zone===zKey);
  wrap.innerHTML = `<div class="zone-panel glass expanded">
    <div class="rp-head"><div class="rp-head-left"><div class="rp-icon">${iconSvg(z.icon)}</div><h5>${z.label}</h5></div></div>
    <div class="rp-body expanded"><div class="rp-body-inner">
      ${items.map(b=>`<label class="check-row"><input type="checkbox" data-behavior="${b.id}" ${state.behaviors[b.id]?'checked':''}><span class="cr-label">${b.label}</span><span class="cr-points">+${b.points}</span></label>`).join('')}
    </div></div></div>`;
  wrap.querySelectorAll('input[data-behavior]').forEach(cb=>{
    cb.addEventListener('change', ()=>{
      state.behaviors[cb.dataset.behavior] = cb.checked;
      renderZoneGrid(); renderZonePanels(); updateProgress();
    });
  });
}

function updateProgress(){
  const sCount = SYMPTOMS.filter(s=>state.symptoms[s.id]).length;
  const bCount = BEHAVIORS.filter(b=>state.behaviors[b.id]).length;
  document.getElementById('progSymptom').textContent = sCount+'/10';
  document.getElementById('progBehavior').textContent = bCount+'/10';
}

renderRegionPanels(); syncHotspots(); renderZoneGrid(); renderZonePanels(); updateProgress();

/* ================= THERMAL PROCESSING + SCORING ================= */
function computeScore(){
  let score = 0; const selS=[], selB=[];
  SYMPTOMS.forEach(s=>{ if(state.symptoms[s.id]){ score+=s.points; selS.push(s); } });
  BEHAVIORS.forEach(b=>{ if(state.behaviors[b.id]){ score+=b.points; selB.push(b); } });
  const highSpecial = state.symptoms.diareDarah && state.symptoms.dehidrasi;
  let category;
  if(score>65 || highSpecial) category='tinggi';
  else if(score>=36) category='sedang';
  else category='rendah';
  return {score, category, selS, selB, highSpecial};
}

const THERMAL_STATUSES = [
  'Mengompilasi data gejala...',
  'Memetakan rantai transmisi dapur...',
  'Merumuskan indeks risiko...'
];
document.getElementById('processBtn').addEventListener('click', runThermalProcessing);

function runThermalProcessing(){
  const overlay = document.getElementById('thermalOverlay');
  const valEl = document.getElementById('thermalVal');
  const statusEl = document.getElementById('thermalStatus');
  const ringFg = document.getElementById('thermalRingFg');
  const circumference = 2*Math.PI*96;
  overlay.classList.add('show');
  document.body.style.overflow='hidden';
  const duration = 4000; const start = performance.now();
  statusEl.textContent = THERMAL_STATUSES[0];

  function frame(now){
    const elapsed = Math.min(now-start, duration);
    const t = elapsed/duration;
    const temp = 25 + t*(75-25);
    valEl.textContent = Math.round(temp);
    const offset = circumference*(1-t);
    ringFg.style.strokeDashoffset = offset;
    const stageIdx = Math.min(2, Math.floor(t*3));
    statusEl.textContent = THERMAL_STATUSES[stageIdx];
    if(elapsed < duration){ requestAnimationFrame(frame); }
    else{ finishProcessing(overlay); }
  }
  requestAnimationFrame(frame);
}

function finishProcessing(overlay){
  setTimeout(()=>{
    overlay.classList.remove('show');
    document.body.style.overflow='';
    state.result = computeScore();
    state.screeningDone = true;
    document.getElementById('navHasil').classList.remove('locked');
    renderHasil();
    switchView('hasil');
  }, 350);
}

/* ================= HASIL RENDER ================= */
const RISK_META = {
  rendah:{label:'Risiko Rendah', color:'var(--risk-low)', title:'Household Ecosystem Clear', closing:'Ekosistem rumah tangga Anda tergolong aman. Pertahankan kebiasaan baik ini secara konsisten.'},
  sedang:{label:'Risiko Sedang', color:'var(--risk-mid)', title:'Rantai Kontaminasi Terdeteksi', closing:'Terdapat rantai kontaminasi silang yang perlu diputus. Bersihkan seluruh permukaan dapur dengan disinfektan dan air panas.'},
  tinggi:{label:'Risiko Tinggi', color:'var(--risk-high)', title:'Sistem Biosekuriti Dapur Gagal Total', closing:'Indikasi kuat paparan terkonfirmasi. Prioritaskan konsultasi medis segera sebelum menindaklanjuti rekomendasi dapur.'},
};

function renderHasil(){
  const r = state.result; if(!r) return;
  const meta = RISK_META[r.category];
  const circumference = 2*Math.PI*82;
  const badge = document.getElementById('riskBadge');
  badge.textContent = meta.label;
  badge.style.background = meta.color;
  document.getElementById('riskTitle').textContent = meta.title;
  document.getElementById('riskClosing').textContent = meta.closing;
  document.getElementById('scoreVal').textContent = '0';
  const sgFg = document.getElementById('sgFg');
  sgFg.style.stroke = meta.color;
  sgFg.style.strokeDashoffset = circumference;

  requestAnimationFrame(()=>{
    sgFg.style.strokeDashoffset = circumference*(1-Math.min(r.score,100)/100);
    animateNumber(document.getElementById('scoreVal'), 0, r.score, 1100);
  });

  document.getElementById('hasilBanner').classList.toggle('show', r.category==='tinggi');

  const bdS = document.getElementById('bdSymptoms');
  bdS.innerHTML = r.selS.length ? r.selS.map(s=>`<div class="bd-row">${s.label}<b>+${s.points}</b></div>`).join('')
    : '<div class="empty-note">Tidak ada gejala yang dipilih.</div>';
  const bdB = document.getElementById('bdBehaviors');
  bdB.innerHTML = r.selB.length ? r.selB.map(b=>`<div class="bd-row">${b.label}<b>+${b.points}</b></div>`).join('')
    : '<div class="empty-note">Tidak ada perilaku berisiko yang dipilih.</div>';

  const recoLockNote = document.getElementById('recoLockNote');
  const recoList = document.getElementById('recoList');
  const recoSub = document.getElementById('recoSub');
  if(r.category==='tinggi'){
    recoSub.textContent = 'Fitur rekomendasi dapur dikunci sementara — prioritaskan konsultasi medis terlebih dahulu.';
    recoLockNote.innerHTML = `<div class="reco-lock-overlay">${iconSvg('lock')}<p>Rekomendasi dapur disembunyikan sementara. Konsultasi dokter adalah prioritas utama Anda saat ini.</p></div>`;
    recoList.className = 'reco-list reco-locked';
  } else {
    recoSub.textContent = 'Langkah konkret berdasarkan hasil penapisan Anda.';
    recoLockNote.innerHTML = '';
    recoList.className = 'reco-list';
  }
  const tips = r.selB.length ? r.selB.map(b=>b.tip) : ['Kebiasaan dapur Anda sudah menerapkan praktik biosekuriti dasar dengan baik. Pertahankan!'];
  recoList.innerHTML = tips.map(tip=>`<div class="reco-item"><div class="reco-icon">${iconSvg('check')}</div><p>${tip}</p></div>`).join('');
}

function animateNumber(el, from, to, duration){
  const start = performance.now();
  function step(now){
    const t = Math.min((now-start)/duration, 1);
    el.textContent = Math.round(from + (to-from)*t);
    if(t<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function resetScreening(){
  SYMPTOMS.forEach(s=>state.symptoms[s.id]=false);
  BEHAVIORS.forEach(b=>state.behaviors[b.id]=false);
  state.openRegion=null; state.openZone=null;
  renderRegionPanels(); syncHotspots(); renderZoneGrid(); renderZonePanels(); updateProgress();
  switchView('screening');
  showToast('Screening direset. Silakan mulai kembali.');
}

/* ================= SCROLL REVEAL ================= */
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in-view'); revealObserver.unobserve(en.target); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
