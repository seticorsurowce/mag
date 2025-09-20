function handleSubmit(event) {
  event.preventDefault();
  disableSubmit('etykietyForm');

  const formData = new FormData(event.target);
  let indeksRaw = formData.get('indeks');
  let indeks = indeksRaw.includes("|") ? indeksRaw.split("|").pop().trim() : indeksRaw;

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
      resetForm("etykietyForm", () => {
        document.getElementById('indeks-preview').innerText = "";
      });
      enableSubmit('etykietyForm');
    },
    (error) => {
      alert("Błąd: " + error);
      enableSubmit('etykietyForm');
    }
  );
}
