export const currencies = [
  { code: 'EUR', label: 'Euro (€)' },
  { code: 'USD', label: 'Dollar US ($)' },
  { code: 'XOF', label: 'FCFA (XOF)' },
  { code: 'GBP', label: 'Livre sterling (£)' },
  { code: 'MAD', label: 'Dirham marocain (MAD)' },
  { code: 'GNF', label: 'Franc guinéen (GNF)' },
  { code: 'CAD', label: 'Dollar canadien (CAD)' },
  { code: 'CHF', label: 'Franc suisse (CHF)' },
  { code: 'SAR', label: 'Riyal saoudien (SAR)' },
]

// Taux de référence INDICATIFS (base EUR). À actualiser selon les cours du marché.
export const rates = {
  EUR: 1,
  USD: 1.14,
  XOF: 655.957,
  GBP: 0.86,
  MAD: 10.4,
  GNF: 9800,
  CAD: 1.55,
  CHF: 0.95,
  SAR: 4.27,
}

export const goldDefaults = {
  EUR: 70,
  USD: 85,
  XOF: 46000,
  GBP: 60,
  MAD: 850,
  GNF: 730000,
  CAD: 115,
  CHF: 75,
  SAR: 320,
}

export const silverDefaults = {
  EUR: 0.8,
  USD: 0.98,
  XOF: 530,
  GBP: 0.7,
  MAD: 9.8,
  GNF: 8400,
  CAD: 1.35,
  CHF: 0.86,
  SAR: 3.7,
}

export function convertCurrency(amount, from, to) {
  if (!rates[from] || !rates[to]) return Number(amount)
  return (Number(amount) / rates[from]) * rates[to]
}

export function fmtCurrency(n, currency, digits = 0) {
  return Number(n).toLocaleString('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits: digits,
  })
}