export function formatCurrency(amount, locale = "es-AR", currency = "ARS") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    return String(amount);
  }
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("es-AR");
  } catch {
    return iso;
  }
}


