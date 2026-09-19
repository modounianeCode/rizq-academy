import { Link } from 'react-router-dom'
import { Band } from '../components/UI'

const tools = [
  {
    to: '/outils/zakat',
    icon: '🤲',
    title: 'Calculateur de zakat',
    desc: 'Ajoutez espèces, or, argent, stock et investissements ; retirez vos dettes ; voyez instantanément le nisab et votre 2,5 % dû.',
    link: 'Calculer ma zakat →',
  },
  {
    to: '/outils/mudarabah',
    icon: '🤝',
    title: 'Partage de profit mudarabah',
    desc: 'Fixez le capital, le profit et le ratio entre investisseur et entrepreneur — voyez exactement comment les récompenses se partagent.',
    link: 'Partager le profit →',
  },
  {
    to: '/outils/murabaha',
    icon: '🏠',
    title: 'Planificateur murabaha',
    desc: 'Chiffrez un bien acheté coût-plus et payable à terme — la façon licite d’acquérir une maison ou un équipement sans intérêt.',
    link: 'Chiffrer la vente →',
  },
]

export default function Tools() {
  return (
    <>
      <Band
        crumb="Accueil / Outils"
        title="Outils pratiques"
        sub="La finance islamique est faite pour se pratiquer, pas seulement pour s’étudier. Utilisez ces calculateurs pour vérifier votre zakat et chiffrer des transactions conformes avec de vrais chiffres."
      />
      <section className="section pattern-light">
        <div className="container">
          <div className="grid grid-3">
            {tools.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="calc-card calc-link"
                aria-label={`Ouvrir : ${t.title}`}
              >
                <div className="card-top">
                  <div className="card-icon" aria-hidden="true">
                    {t.icon}
                  </div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
                <div className="card-foot">
                  <span className="read-more">{t.link}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}