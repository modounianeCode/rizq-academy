import { Link } from 'react-router-dom'
import { Band, SectionHead } from '../components/UI'

const values = [
  {
    icon: '📚',
    title: 'Apprendre pas à pas',
    text: 'Pas de jargon, pas de présupposés. Chaque concept s’appuie sur le précédent, pour que le vrai débutant ne se noie jamais.',
  },
  {
    icon: '🤲',
    title: 'Enraciné dans les sources',
    text: 'Le contenu suit le Coran, la Sunna authentique et l’école majoritaire (AAOIFI quand c’est pertinent). Les divergences sont signalées franchement.',
  },
  {
    icon: '🧭',
    title: 'Pratique, pas théorique',
    text: 'Chaque leçon finit par une action : une habitude, un registre, un calculateur. Le savoir qui ne s’applique pas est un savoir pas encore acquis.',
  },
  {
    icon: '💚',
    title: 'Gratuit et accessible',
    text: 'Demander la science qui profite ne devrait rien coûter. L’académie reste gratuite — et ses outils vous aident à apprendre à donner, aussi.',
  },
]

export default function About() {
  return (
    <>
      <Band
        crumb="Accueil / À propos"
        title="Pourquoi Rizq Academy ?"
        sub="Une petite académie, gratuite, sur un grand sujet : gagner sa vie comme l’Islam l’enseigne."
      />

      <section className="section pattern-light">
        <div className="container">
          <SectionHead
            eyebrow="Notre but"
            title="Parce que la richesse est un dépôt"
            sub="Les musulmans ont besoin de clarté sur le gagne-pain licite, la finance conforme et l’investissement halal. Trop souvent, ce savoir est soit enfoui dans des livres savants, soit dilué en slogans. Rizq Academy se tient entre les deux : fidèle à une science solide, et écrite pour qu’un vrai débutant puisse agir le jour même."
          />

          <div className="divider" style={{ margin: '18px 0 32px' }} />

          <div className="grid grid-4" style={{ marginBottom: 56 }}>
            {values.map((v) => (
              <div className="card" key={v.title}>
                <div className="card-top">
                  <div className="card-icon" aria-hidden="true">
                    {v.icon}
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-2">
            <div className="card">
              <div className="card-top">
                <h3>Pour l’apprenant curieux</h3>
                <p>
                  Si l’écriture et l’enseignement font partie de vos plaisirs,
                  l’académie est structurée pour être extensible : les fichiers de
                  données des cours et des articles sont de simples listes — ajouter
                  une leçon ou un article prend quelques minutes.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-top">
                <h3>Pour l’investisseur sérieux</h3>
                <p>
                  Les outils donnent de vrais chiffres : seuils de nisab, zakat sur
                  les investissements, partages de profit en mudarabah et prix
                  murabaha. Utilisez-les pour passer vos propres chiffres chaque
                  année.
                </p>
              </div>
            </div>
          </div>

          <div className="center mt-40">
            <Link className="btn btn-primary" to="/cours">
              Commencer le premier cours
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}