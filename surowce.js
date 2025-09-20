// surowce.js
let lastCalculation = {};

document.addEventListener('DOMContentLoaded', function () {
  const dyn = document.getElementById('dynamicInput');
  const width = document.getElementById('width');
  if (dyn)   dyn.addEventListener('input', checkForCalculations);
  if (width) width.addEventListener('input', checkForCalculations);
});

function toggleMode() {
  const mode = document.querySelector('input[name="calculationMode"]:checked').value;
  const label = document.getElementById("inputLabel");
  const input = document.getElementById("dynamicInput");
  if (!label || !input) return;

  input.value = "";
  if (mode === "weight") {
    label.textContent = "Całkowita waga surowca (kg):";
    input.setAttribute("step", "0.1");
  } else {
    label.textContent = "Metry (mb):";
    input.setAttribute("step", "1");
  }

  const prevMat = lastCalculation.material;
  const prevDen = lastCalculation.density;
  lastCalculation = {};
  if (prevMat) lastCalculation.material = prevMat;
  if (prevDen) lastCalculation.density = prevDen;

  const res = document.getElementById("result");
  if (res) res.innerText = "";
}

function filterMaterials() {
  const inputEl = document.getElementById('search');
  const resultsDiv = document.getElementById('search-results');
  if (!inputEl || !resultsDiv) return;

  const q = inputEl.value.toLowerCase();
  if (q.length < 2) { resultsDiv.innerHTML = ''; return; }

  const materials = [
{ "name": "8216781 Thermal Eco 300 RH9X HG65", "value": "0.144" },
{ "name": "8216828 Thermal Eco 300 RP51 HG65", "value": "0.144" },
{ "name": "8222362 Thermal Eco 200 RR23 HG65", "value": "0.144" },
{ "name": "8243572 Raflacoat Plus-FSC RH9X HG65", "value": "0.153" },
{ "name": "8243589 Raflacoat Plus FSC RP51 HG65", "value": "0.153" },
{ "name": "8244371 Thermal Top P200 RH9X HG65", "value": "0.151" },
{ "name": "8244401 Thermal Top P200 RP51 HG65", "value": "0.151" },
{ "name": "8255728 Raflacoat RH9X PET23", "value": "0.127" },
{ "name": "8279939 Raflacoat RP51 PET23", "value": "0.127" },
{ "name": "8279977 Raflacoat Plus RR23 HG65", "value": "0.15" },
{ "name": "8280317 PP WHITE FTC 60/RP37/HD-FSC", "value": "0.0" },
{ "name": "8280454 PP Clear FTC 50/RP37/HD70WH", "value": "0.0" },
{ "name": "8280768 PE White 85/RP37/HD70FS", "value": "0.0" },
{ "name": "8291498 Vellum TTR-FSC RP51 HG65", "value": "0.143" },
{ "name": "8291535 Vellum TTR-FSC RH9X HG65", "value": "0.143" },
{ "name": "8369760 Thernal Top P 200 / RR23", "value": "0.151" },
{ "name": "CO111 MC Primecoat FSC R5000N-BG40BR", "value": "0.153" },
{ "name": "AA036 TRANSFER VELLUM FSC R5000N-BG40BR", "value": "0.138" },
{ "name": "AA335 EPIQUE FSC S2047N-BG45WH IMP FSC", "value": "0.2" },
{ "name": "AA639 PET WHITE S8020", "value": "0.2" },
{ "name": "AA644 TRANSF PET MATT CHR TOP S8020-BG42WH", "value": "0.2" },
{ "name": "AC628 THERMAL PP100 TOP WHITE S2045N-BG40BR", "value": "0.14" },
{ "name": "AG494 PP Matt White R5000N-BG45WH", "value": "0.3" },
{ "name": "AH989 PE85 Top White C3/BG40WH", "value": "0.0" },
{ "name": "AI544 Rustique Blanc FSC S2047N-BG45WH", "value": "0.16" },
{ "name": "AI566 THERMAL PP100 TOP WHITE C3-BG40WH FSC", "value": "0.0" },
{ "name": "AJ112 Transfer Vellum FSC S2045N-BG40BR", "value": "0.138" },
{ "name": "AL597 PP60 Top White S692N-BG40WH FSC", "value": "0.124" },
{ "name": "AN588 THERMAL 200HD PLUS C2075", "value": "0.151" },
{ "name": "AN589 MC PRIMECOAT C2075", "value": "0.151" },
{ "name": "AN751 TRANSFER VELLUM FSC C2075N-BG40BR", "value": "0.0" },
{ "name": "ANTALIS Adestor A251 półbłysk", "value": "0.153" },
{ "name": "ANTALIS Adestor HM półbłysk", "value": "0.153" },
{ "name": "IMA Semi gloss HM", "value": "0.153" },
{ "name": "IMA ECO HM", "value": "0.141" },
{ "name": "IMA ECO REM", "value": "0.141" },
{ "name": "IMA TOP REM", "value": "0.151" },
{ "name": "IMA TOP HM", "value": "0.151" },
{ "name": "ANTALIS Adestor HM vellum", "value": "0.153" },
{ "name": "ANTALIS Adestor RA67", "value": "0.153" },
{ "name": "ANTALIS Adestor SP12 półbłysk", "value": "0.153" },
{ "name": "Antalis Laser A251", "value": "0.17" },
{ "name": "Antalis Thermal eco akryl", "value": "0.146" },
{ "name": "Antalis Thermal eco HM10", "value": "0.146" },
{ "name": "AP515 MC PRIMECOAT FSC S2000N-PET23", "value": "0.13" },
{ "name": "AT093 Thermal 200GP FSC R5000N-BG40BR", "value": "0.145" },
{ "name": "AU020 MC PRIMECOAT FSC S2025N-PET23", "value": "0.13" },
{ "name": "AU564 MARTELE BLANC FSC S2047N-BG45WH IMP FSC", "value": "0.183" },
{ "name": "AX452 PP Top White C3-BG40WH", "value": "0.14" },
{ "name": "BC679 Transfer Vellum FSC S2000NG-BG40BR", "value": "0.138" },
{ "name": "BJ993 MC FSC S2000NG-BG40BR", "value": "0.138" },
{ "name": "BJ995 MC FSC S2045N-BG40BR", "value": "0.151" },
{ "name": "BK645 Thermal Eco BPA Free S2000NG-BG40BR", "value": "0.139" },
{ "name": "BM312 Thermal Eco BPA Free S2045N-BG40BR", "value": "0.141" },
{ "name": "BM313 Thermal Eco BPA Free R5000N-BG40BR", "value": "0.139" },
{ "name": "BS770 Thermal 200HD Plus FSC S2045N-BG40BR", "value": "0.151" },
{ "name": "BU455 TRANSFER PET MT WH TC6 S8002-BG42WH", "value": "0.16" },
{ "name": "Coated 80 AP904 YG60", "value": "0.153" },
{ "name": "Coated 80 AR805 YG60", "value": "0.153" },
{ "name": "COATED 80 FSC™ / FH21 / YG60", "value": "0.153" },
{ "name": "COATED 80 FSC™ / RP3000 / YG60", "value": "0.153" },
{ "name": "COATED GLOSS OPAQUE BLACK FSC™ / FH21 / YG60", "value": "0.3" },
{ "name": "COVER OPAQUE MIX", "value": "0.3" },
{ "name": "ETP 130G", "value": "0.13" },
{ "name": "ETP 150G", "value": "0.15" },
{ "name": "ETP 170G", "value": "0.17" },
{ "name": "ETP 200G", "value": "0.2" },
{ "name": "ETP 250G", "value": "0.25" },
{ "name": "FASSON INKJET MAT S2012", "value": "0.2" },
{ "name": "THERMAL ECO BPA FREE FSC™ / RF20 / YG60", "value": "0.139" },
{ "name": "FLUORO GREEN AP904", "value": "0.15" },
{ "name": "FLUORO ORANGE AP904", "value": "0.15" },
{ "name": "FLUORO RED AP904", "value": "0.15" },
{ "name": "FLUORO YELLOW AP904", "value": "0.15" },
{ "name": "IMA Vellum HM", "value": "0.153" },
{ "name": "IMA VESTCHEMA TOP AKRYL", "value": "0.0" },
{ "name": "INTERCOAT 7650 K6D P6", "value": "0.124" },
{ "name": "INTERCOAT 7650 K6D T7", "value": "0.124" },
{ "name": "JET GLOSS POLCOAT", "value": "0.2" },
{ "name": "JUJO TOP 182G", "value": "0.182" },
{ "name": "KANZAN KPR415", "value": "0.17" },
{ "name": "LASER-COPY 70  FSC™ / P1000 / WK60", "value": "0.17" },
{ "name": "PE White ANTALIS", "value": "0.157" },
{ "name": "PE White Raflatac RP37", "value": "0.157" },
{ "name": "Polcoat ECO 170g", "value": "0.17" },
{ "name": "Polcoat INKJET MAT", "value": "0.2" },
{ "name": "Polcoat KRAFT", "value": "0.2" },
{ "name": "Polcoat PP INKJET MAT", "value": "0.2" },
{ "name": "PP White akryl ANTALIS", "value": "0.124" },
{ "name": "PP White akryl ANTALIS / PET", "value": "0.124" },
{ "name": "Herma PP White 62xpc", "value": "0.124" },
{ "name": "PP White PRO TYRE POLCOAT", "value": "0.15" },
{ "name": "PP White T7 Intercoat", "value": "0.0" },
{ "name": "RADIAL GREEN RP51", "value": "0.15" },
{ "name": "RAFLATAC PE MATT WHITE RP37", "value": "0.15" },
{ "name": "RI-707/60 PP Gloss Clear TC8 AP901 WG62", "value": "0.132" },
{ "name": "Antalis FILM OPP GL TRANSLU PP CLEAR", "value": "0.132" },
{ "name": "RI-7093/60 PP Gloss Clear TC8 AP901PET30", "value": "0.14" },
{ "name": "RI-754/60 PP Cavitated White Tyre RP2001", "value": "0.16" },
{ "name": "PP TCX GLOSS WHITE CAV 60 / AP901 / WG62", "value": "0.124" },
{ "name": "RI-837/85 PE Gloss Clear TC8 AP901 WG62", "value": "0.0" },
{ "name": "RI-837/85 PE Gloss Clear TC8 AR801 WG62", "value": "0.155" },
{ "name": "RI-837/85 PE Gloss White TC8 AP901 WG62", "value": "0.157" },
{ "name": "Robuskin 200 HDPE", "value": "0.2" },
{ "name": "SIHL PICOFILM P 150", "value": "0.2" },
{ "name": "Synthermal P200 RH9X", "value": "0.14" },
{ "name": "HERMA Thermal Eco 62DPS", "value": "0.146" },
{ "name": "HERMA Thermal Eco 62GPT", "value": "0.146" },
{ "name": "THERMAL ECO BPA FREE FSC™ / FH21 / YG60", "value": "0.146" },
{ "name": "Thermal Eco HSN RP3000 YG60", "value": "0.146" },
{ "name": "THERMAL LAM 230", "value": "0.15" },
{ "name": "Thermal PP RP1002", "value": "0.14" },
{ "name": "THERMAL TOP PHENOL FREE FSC™ / FH21 / YG60", "value": "0.151" },
{ "name": "THERMAL TOP PHENOL FREE FSC™ / RF20 / YG60", "value": "0.151" },	
{ "name": "Tickettherm PRO 100 SIHL", "value": "0.1" },
{ "name": "Tickettherm PRO 220 SIHL", "value": "0.22" },
{ "name": "Transferboard 220", "value": "0.22" },
{ "name": "Tyre Polcoat", "value": "0.2" },
{ "name": "TYRE RP1001", "value": "0.2" },
{ "name": "HERMAwhite vellum 62D", "value": "0.155" },
{ "name": "Vellum SC AP904 YG60", "value": "0.143" },
{ "name": "VELLUM SC FSC™ / FH21 / YG60", "value": "0.143" },
{ "name": "Vellum SC RP3000 YG60", "value": "0.143" },
{ "name": "Vestchema eco hotmelt", "value": "0.146" },
{ "name": "Vestchema ECO REMOVABLE", "value": "0.146" },
{ "name": "Vestchema Semi gloss acrylic perma", "value": "0.0" },
{ "name": "Vestchema top akryl", "value": "0.151" },
{ "name": "HERMA Thermal TOP 62GPT", "value": "0.151" },
{ "name": "HERMA Thermal TOP 62DPS", "value": "0.151" },
{ "name": "SYN-DURABLE 120", "value": "0.120" },
{ "name": "SYN-DURABLE 190", "value": "0.200" }	
];

  resultsDiv.innerHTML = '';
  materials
    .filter(m => m.name.toLowerCase().includes(q))
    .forEach(m => {
      const div = document.createElement('div');
      div.textContent = m.name;
      div.onclick = function() {
        document.getElementById('search').value = m.name;
        const manual = document.getElementById('manualEntry');
        if (manual) manual.value = '';
        resultsDiv.innerHTML = '';
        lastCalculation.material = m.name;
        lastCalculation.density = m.value;
        checkForCalculations();
      };
      resultsDiv.appendChild(div);
    });
}

function checkForCalculations() {
  const mode = document.querySelector('input[name="calculationMode"]:checked')?.value;
  const width = parseFloat(document.getElementById('width')?.value || '');
  const val   = parseFloat(document.getElementById('dynamicInput')?.value || '');
  const resEl = document.getElementById('result');
  if (!mode || !resEl) return;

  if (mode === 'weight') {
    if (lastCalculation.density && val && width) {
      calculate(lastCalculation.density, val, width);
    }
  } else {
    if (val && width) {
      lastCalculation.result = val;
      resEl.innerText = "mb: " + val;

      if (lastCalculation.density && parseFloat(lastCalculation.density) > 0) {
        const eq = (val * parseFloat(lastCalculation.density) * width / 1000) + 0.5;
        resEl.innerText += " (równoważna waga: " + eq.toFixed(2) + " kg)";
      }
    }
  }
}

function calculate(density, totalWeight, width) {
  const resEl = document.getElementById('result');
  if (!resEl) return;
  const result = (totalWeight - 0.5) / density / width * 1000;
  lastCalculation.result = Math.ceil(result / 10) * 10;
  resEl.innerText = "mb: " + lastCalculation.result;
}

function sendDataToSheet() {
  disableSubmit('calcForm');

  const mode = document.querySelector('input[name="calculationMode"]:checked')?.value;

  // 🔧 MIEJSCE (radio)
  const locInput = document.querySelector('input[name="location"]:checked');
  lastCalculation.location = locInput ? locInput.value : '';

  lastCalculation.width    = parseFloat(document.getElementById('width')?.value || '');
  lastCalculation.material = (document.getElementById('search')?.value || '') || (document.getElementById('manualEntry')?.value || '');
  lastCalculation.timestamp = new Date().toISOString();
  lastCalculation.calculationMode = mode;

  const dynVal = parseFloat(document.getElementById('dynamicInput')?.value || '');

  if (mode === 'weight') {
    lastCalculation.weight = dynVal;
    lastCalculation.meters = lastCalculation.result;
  } else {
    lastCalculation.meters = dynVal;
    if (lastCalculation.density && parseFloat(lastCalculation.density) > 0) {
      lastCalculation.weight = (lastCalculation.meters * parseFloat(lastCalculation.density) * lastCalculation.width / 1000) + 0.5;
    }
  }

  const required = lastCalculation.location && lastCalculation.width && lastCalculation.material;
  const modeOk   = (mode === 'weight' && lastCalculation.weight) || (mode === 'meters' && lastCalculation.meters);

  if (required && modeOk) {
sendToGoogleSheet(
  'https://script.google.com/macros/s/AKfycbzl0z5AvE_bmJ8hLWm-4ULkUqx0P2q8WlDPsW8Je7NfNho6kIWL0hmKqKxVPZR4yf7Z/exec',
  { ...lastCalculation, sheet: "surowce" },
  () => {
    alert("Dane zostały wysłane!");
    resetSurowceForm();
    enableSubmit('calcForm');
  },
  (error) => {
    alert("Błąd: " + error);
    enableSubmit('calcForm');
  }
);

  } else {
    alert("Proszę uzupełnić wszystkie wymagane dane przed wysłaniem.");
  }
}

function resetSurowceForm() {
  resetForm('calcForm', () => {
    const resEl = document.getElementById("result");
    if (resEl) resEl.innerText = "";
    lastCalculation = {};
    toggleMode();
  });
}

/* ⬇️ Wystaw do globalnego scope dla inline-handlerów w HTML */
window.toggleMode = toggleMode;
window.filterMaterials = filterMaterials;
window.sendDataToSheet = sendDataToSheet;
window.resetSurowceForm = resetSurowceForm;



