import { useState } from 'react'
import { Band } from '../components/UI'
import CurrencyConverter from '../components/CurrencyConverter'
import { currencies, fmtCurrency } from '../data/currencies'

export default function MudarabahCalculator() {
  const [currency, setCurrency] = useState('USD')
  const [capital, setCapital] = useState(10000)
  const [profit, setProfit] = useState(2000)
  const [ratio, setRatio] = useState(50)

  const investorShare = (profit * ratio) / 100
  const entrepreneurShare = profit - investorShare

  const fmt = (n) => fmtCurrency(n, currency, 0)

  return (
    <>
      <Band
        crumb="Accueil / Outils / Mudarabah"
        title="Calculateur de mudarabah"
        sub="Dans une mudarabah, l’investisseur apporte le capital, l’entrepreneur apporte l’effort. Le profit se partage selon le ratio convenu ; la perte pèse sur l’investisseur."
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
                Choisissez la devise dans laquelle le capital et le profit sont
                exprimés.
              </div>
            </div>

            <div className="input-row">
              <div className="field">
                <label htmlFor="capital">Capital investi ({currency})</label>
                <input
                  id="capital"
                  type="number"
                  min="0"
                  step="500"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                />
              </div>
              <div className="field">
                <label htmlFor="profit">Profit réalisé ({currency})</label>
                <input
                  id="profit"
                  type="number"
                  min="0"
                  step="100"
                  value={profit}
                  onChange={(e) => setProfit(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="ratio">Part de l’investisseur</label>
              <div className="slider-input">
                <input
                  id="ratio"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={ratio}
                  onChange={(e) => setRatio(Number(e.target.value))}
                />
                <output>{ratio} % : {100 - ratio} %</output>
              </div>
              <div className="help">
                À gauche : la part de l’investisseur ; l’entrepreneur reçoit le reste.
                Les répartitions courantes sont 50/50, 60/40 et 70/30.
              </div>
            </div>

            <div className="result-box">
              <div className="result-line">
                <span>L’investisseur (rabb al-mal) reçoit</span>
                <strong>{fmt(investorShare)}</strong>
              </div>
              <div className="result-line">
                <span>L’entrepreneur (mudarib) reçoit</span>
                <strong>{fmt(entrepreneurShare)}</strong>
              </div>
              <div className="result-line total">
                <span>Profit total</span>
                <strong>{fmt(profit)}</strong>
              </div>
              <p
                style={{
                  marginTop: 14,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 185, 129, 0.08)',
                  color: 'var(--ink-600)',
                  fontSize: '0.92rem',
                }}
              >
                Rappel : si l’entreprise ne fait aucun profit, personne ne se voit
                devoir un rendement fixe — c’est précisément ce qui rend ce contrat
                sans intérêt.
              </p>
            </div>
          </div>

          <CurrencyConverter defaultFrom={currency} />
        </div>
      </section>
    </>
  )
}