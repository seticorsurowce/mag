// etykiety.js
let mode = 'przyjecie';

function setMode(selected) {
  mode = selected;
  document.querySelectorAll('.form-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('.form-button.' + selected).classList.add('active');
}

function updatePreview() {
  const val = document.getElementById('indeks').value.trim();
  let out = val;
  if (val.includes("|")) {
    out = val.split("|").pop().trim();
  }
  document.getElementById('indeks-preview').innerText = out ? `Indeks: ${out}` : "";
}

function handleSubmit(event) {
  disableSubmit('etykietyForm');

  event.preventDefault();

  const formData = new FormData(event.target);
  let indeksRaw = formData.get('indeks');
  let indeks = indeksRaw;
  if (indeksRaw.includes("|")) {
    indeks = indeksRaw.split("|").pop().trim();
  }

  const data = {
    typ: mode,
    indeks: indeks,
    kar: formData.get('kar'),
    ilosc: formData.get('ilosc'),
    jednostka: formData.get('jednostka'),
    timestamp: new Date().toISOString()
  };

  let sheetName = mode === 'przyjecie' ? 'przyjecia_imp' : 'wydania_imp';

  sendToGoogleSheet(
    'https://script.google.com/macros/s/AKfycbyO7tq1OsI48-P2jgT__hoLEepjzrlVLEzJ-_mhS6pWf68LZOZhPQK2c0WaXkyfTsmS/exec',
    { sheet: sheetName, ...data },
    () => {
      alert("Dane zostały wysłane!");
      enableSubmit('etykietyForm');
      resetForm("etykietyForm", () => {
        document.getElementById('indeks-preview').innerText = "";
      });
    },
    (error) => alert("Błąd: " + error);
    enableSubmit('etykietyForm');
  );
}

