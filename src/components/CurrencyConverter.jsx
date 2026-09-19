import { useState } from 'react'
import { currencies, rates, convertCurrency, fmtCurrency } from '../data/currencies'

export default function CurrencyConverter({ defaultFrom = 'EUR' }) {
  const [amount, setAmount] = useState('')
  const [from, setFrom] = useState(defaultFrom)
  const [to, setTo] = useState('USD')

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const result = amount === '' ? 0 : convertCurrency(amount, from, to)
  const rate = rates[to] / rates[from]

  return (
    <div className="calc-shell conv-shell mt-40">
      <h3 className="conv-title">
        Convertisseur de devises
      </h3>
      <p className="conv-sub">
        Convertissez vos montants entre {from} et {to} — même si votre situation
        est exprimée dans une autre devise.
      </p>

      <div className="conv-grid">
        <div className="field">
          <label htmlFor="conv-amount">Montant</label>
          <input
            id="conv-amount"
            type="number"
            min="0"
            step="100"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="conv-from">De</label>
          <select
            id="conv-from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="conv-to">Vers</label>
          <select
            id="conv-to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="conv-swap">
        <button type="button" className="btn btn-outline-dark" onClick={swap}>
          ⇅ Inverser la paire
        </button>
      </div>

      <div className="result-box">
        <div className="result-line">
          <span>
            1 {from} = {rate.toLocaleString('fr-FR', { maximumFractionDigits: 4 })}{' '}
            {to}
          </span>
          <strong>{fmtCurrency(1, to, 4)}</strong>
        </div>
        <div className="result-line">
          <span>
            {amount === '' ? '0' : Number(amount).toLocaleString('fr-FR')} {from}
          </span>
          <strong>{fmtCurrency(amount === '' ? 0 : amount, from, 2)}</strong>
        </div>
        <div className="result-line total">
          <span>{to}</span>
          <strong>{fmtCurrency(result, to, 2)}</strong>
        </div>
      </div>

      <p className="conv-note">
        Taux indicatifs (base EUR) et non contractuels : actualisez-les avec le
        dernier cours avant une transaction réelle.
      </p>
    </div>
  )
}