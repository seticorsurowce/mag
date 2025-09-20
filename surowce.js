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
    // ...resztę dopiszesz
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
      },
      (error) => alert("Błąd: " + error)
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
