import { useState } from 'react'
import { Band } from '../components/UI'
import CurrencyConverter from '../components/CurrencyConverter'
import { currencies, fmtCurrency } from '../data/currencies'

export default function MurabahaCalculator() {
  const [currency, setCurrency] = useState('MAD')
  const [price, setPrice] = useState(150000)
  const [margin, setMargin] = useState(5)
  const [years, setYears] = useState(20)

  const total = price * (1 + margin / 100)
  const payments = Math.max(1, years * 12)
  const monthly = total / payments

  const fmt = (n) => fmtCurrency(n, currency, 2)

  return (
    <>
      <Band
        crumb="Accueil / Outils / Murabaha"
        title="Planificateur murabaha"
        sub="Dans une murabaha, le vendeur achète le bien puis vous le revend à un prix coût-plus transparent, payable à terme. Le profit est une majoration de prix, pas un intérêt."
      />

      <section className="section pattern-light">
        <div className="container">
          <div className="calc-shell">
            <div className="field">
              <label htmlFor="currency">Devise de calcul</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <div className="help">
                Choisissez la devise dans laquelle le bien est acheté et payé à terme.
              </div>
            </div>

            <div className="field">
              <label htmlFor="price">Prix du bien ({currency})</label>
              <input
                id="price"
                type="number"
                min="0"
                step="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div className="help">
                Par exemple : le coût d’une maison, d’une voiture ou d’un équipement
                que le vendeur va acheter puis revendre.
              </div>
            </div>

            <div className="input-row">
              <div className="field">
                <label htmlFor="margin">Marge (%)</label>
                <div className="slider-input">
                  <input
                    id="margin"
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                  />
                  <output>{margin} %</output>
                </div>
              </div>
              <div className="field">
                <label htmlFor="years">Durée de paiement (ans)</label>
                <div className="slider-input">
                  <input
                    id="years"
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                  <output>{years}</output>
                </div>
              </div>
            </div>

            <div className="result-box">
              <div className="result-line">
                <span>Prix d’origine</span>
                <strong>{fmt(price)}</strong>
              </div>
              <div className="result-line">
                <span>Profit transparent (marge)</span>
                <strong>{fmt(total - price)}</strong>
              </div>
              <div className="result-line">
                <span>Prix total en murabaha</span>
                <strong>{fmt(total)}</strong>
              </div>
              <div className="result-line total">
                <span>Mensualité</span>
                <strong>{fmt(monthly)}</strong>
              </div>
              <p
                style={{
                  marginTop: 14,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(201, 162, 39, 0.12)',
                  color: 'var(--ink-600)',
                  fontSize: '0.92rem',
                }}
              >
                Le total est figé et entièrement divulgué avant la signature — pas de
                frais composés, pas d’intérêt caché. Cette transparence est l’essence
                même de la murabaha.
              </p>
            </div>
          </div>

          <CurrencyConverter defaultFrom={currency} />
        </div>
      </section>
    </>
  )
}