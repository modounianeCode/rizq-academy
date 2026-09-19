import { useState } from 'react'
import { Band } from '../components/UI'
import CurrencyConverter from '../components/CurrencyConverter'
import {
  currencies,
  goldDefaults,
  silverDefaults,
  fmtCurrency,
} from '../data/currencies'

const GOLD_NISAB_GRAMS = 85
const SILVER_NISAB_GRAMS = 595

export default function ZakatCalculator() {
  const [currency, setCurrency] = useState('EUR')
  const [basis, setBasis] = useState('gold')
  const [cash, setCash] = useState('')
  const [gold, setGold] = useState('')
  const [investments, setInvestments] = useState('')
  const [trade, setTrade] = useState('')
  const [debt, setDebt] = useState('')
  const [goldPrice, setGoldPrice] = useState(goldDefaults.EUR)
  const [silverPrice, setSilverPrice] = useState(silverDefaults.EUR)

  const changeCurrency = (e) => {
    const code = e.target.value
    setCurrency(code)
    setGoldPrice(goldDefaults[code] ?? 70)
    setSilverPrice(silverDefaults[code] ?? 0.8)
  }

  const num = (v) => (v === '' ? 0 : Number(v))
  const assets = num(cash) + num(gold) + num(investments) + num(trade)
  const net = Math.max(0, assets - num(debt))
  const goldNisab = goldPrice * GOLD_NISAB_GRAMS
  const silverNisab = silverPrice * SILVER_NISAB_GRAMS
  const nisab = basis === 'gold' ? goldNisab : silverNisab
  const zakatDue = net >= nisab ? net * 0.025 : 0
  const eligible = net >= nisab

  const fmt = (n) => fmtCurrency(n, currency, 2)

  return (
    <>
      <Band
        crumb="Accueil / Outils / Zakat"
        title="Calculateur de zakat"
        sub="Estimez votre nisab et votre zakat en moins de deux minutes. La zakat est due à 2,5 % sur la richesse au-dessus du nisab, détenue une année lunaire."
      />

      <section className="section pattern-light">
        <div className="container">
          <div className="calc-shell">
            <div className="field">
              <label htmlFor="currency">Devise de calcul</label>
              <select
                id="currency"
                value={currency}
                onChange={changeCurrency}
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <div className="help">
                Choisissez la devise dans laquelle vous détenez votre richesse.
              </div>
            </div>

            <div className="field">
              <span className="field-label">Nisab basé sur</span>
              <div className="basis-toggle">
                <label>
                  <input
                    type="radio"
                    name="basis"
                    value="gold"
                    checked={basis === 'gold'}
                    onChange={() => setBasis('gold')}
                  />
                  <span>Or (85 g)</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="basis"
                    value="silver"
                    checked={basis === 'silver'}
                    onChange={() => setBasis('silver')}
                  />
                  <span>Argent (595 g)</span>
                </label>
              </div>
              <div className="help">
                La zakat est due dès que votre richesse nette atteint le nisab.
                {basis === 'silver' &&
                  ' Le nisab en argent (595 g) est plus bas : la zakat devient due plus tôt.'}
              </div>
            </div>

            <div className="input-row">
              <div className="field">
                <label htmlFor="cash">Espèces et comptes bancaires ({currency})</label>
                <input
                  id="cash"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="gold">Or et argent ({currency})</label>
                <input
                  id="gold"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0"
                  value={gold}
                  onChange={(e) => setGold(e.target.value)}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="field">
                <label htmlFor="investments">Investissements / actions ({currency})</label>
                <input
                  id="investments"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="trade">Stock de marchandises (valeur actuelle, {currency})</label>
                <input
                  id="trade"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="field">
                <label htmlFor="debt">Dettes échues cette année ({currency})</label>
                <input
                  id="debt"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0"
                  value={debt}
                  onChange={(e) => setDebt(e.target.value)}
                />
                <div className="help">
                  Retirez l’argent que vous devez réellement rembourser dans les 12 mois.
                </div>
              </div>
              <div className="field">
                {basis === 'gold' ? (
                  <>
                    <label htmlFor="goldPrice">Prix de l’or ({currency}/gramme)</label>
                    <input
                      id="goldPrice"
                      type="number"
                      min="1"
                      step="1"
                      value={goldPrice}
                      onChange={(e) => setGoldPrice(Number(e.target.value))}
                    />
                    <div className="help">
                      Nisab or = 85 g × prix. Consultez un site de cotation pour le cours du jour.
                    </div>
                  </>
                ) : (
                  <>
                    <label htmlFor="silverPrice">Prix de l’argent ({currency}/gramme)</label>
                    <input
                      id="silverPrice"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={silverPrice}
                      onChange={(e) => setSilverPrice(Number(e.target.value))}
                    />
                    <div className="help">
                      Nisab argent = 595 g × prix. Consultez un site de cotation pour le cours du jour.
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="result-box">
              <div className="result-line">
                <span>Total des biens zakatables</span>
                <strong>{fmt(assets)}</strong>
              </div>
              <div className="result-line">
                <span>Moins les dettes dues</span>
                <strong>-{fmt(debt)}</strong>
              </div>
              <div className="result-line">
                <span>Base zakatable nette</span>
                <strong>{fmt(net)}</strong>
              </div>
              <div className="result-line nisab-line">
                <span>
                  Nisab or (85 g) {basis === 'gold' ? '(retenu)' : ''}
                </span>
                <strong>{fmt(goldNisab)}</strong>
              </div>
              <div className="result-line nisab-line">
                <span>
                  Nisab argent (595 g) {basis === 'silver' ? '(retenu)' : ''}
                </span>
                <strong>{fmt(silverNisab)}</strong>
              </div>
              <div className="result-line total">
                <span>Zakat due (2,5 %)</span>
                <strong>{fmt(zakatDue)}</strong>
              </div>
              <p
                style={{
                  marginTop: 14,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: eligible
                    ? 'rgba(201, 162, 39, 0.12)'
                    : 'rgba(16, 185, 129, 0.08)',
                  color: 'var(--ink-600)',
                  fontSize: '0.92rem',
                }}
              >
                {eligible
                  ? 'Votre richesse dépasse le nisab : la zakat est due sur ce montant s’il est resté au-dessus du nisab pendant une année lunaire.'
                  : 'Votre richesse est sous le nisab : aucune zakat n’est due. Continuez à suivre vos chiffres au fil de la croissance de votre épargne.'}
              </p>
            </div>
          </div>

          <CurrencyConverter defaultFrom={currency} />

          <div className="mt-40 quote-block" style={{ padding: '24px 0' }}>
            <blockquote style={{ color: 'var(--emerald-800)', fontSize: '1.3rem' }}>
              « Prends de leurs biens une aumône par laquelle tu les purifies et les bénis. »
            </blockquote>
            <cite style={{ color: 'var(--gold-600)' }}>— Coran 9:103</cite>
          </div>
        </div>
      </section>
    </>
  )
}