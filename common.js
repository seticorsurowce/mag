function sendToGoogleSheet(url, payload, onSuccess, onError) {
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => {
    if (onSuccess) onSuccess();
  })
  .catch(error => {
    console.error('Error:', error);
    if (onError) onError(error);
  });
}

// Resetowanie formularza po ID
function resetForm(formId, extraClearFn = null) {
  const form = document.getElementById(formId);
  if (form) form.reset();
  if (extraClearFn) extraClearFn();
}
