import { Link } from 'react-router-dom'
import { courses, tracks } from '../data/courses'
import { articles } from '../data/articles'
import { SectionHead, ArticleCard, CourseCard } from '../components/UI'

function EyebrowCenter({ icon, label }) {
  return (
    <p className="eyebrow" style={{ color: 'var(--gold-400)' }}>
      {icon} {label}
    </p>
  )
}

export default function Home() {
  const featuredArticles = articles.slice(0, 3)

  return (
    <>
      {/* Héro */}
      <section className="pattern-dark hero">
        <div className="container">
          <span className="bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
          <h1>
            Gagnez, investissez et donnez <em>à la manière de l’islam</em>
          </h1>
          <p className="lede">
            Rizq Academy vous apprend le commerce en Islam, la finance conforme
            et l’investissement licite — pas à pas, à partir de zéro. Des cours
            gratuits, des articles clairs, et des calculateurs pour votre argent
            et votre zakat.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" to="/cours">
              Commencer à apprendre
            </Link>
            <Link className="btn btn-outline" to="/outils">
              Essayer les calculateurs
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <strong>13</strong>
              <span>Cours complets</span>
            </div>
            <div className="stat">
              <strong>4</strong>
              <span>Niveaux de progression</span>
            </div>
            <div className="stat">
              <strong>78</strong>
              <span>Leçons ciblées</span>
            </div>
            <div className="stat">
              <strong>2,5%</strong>
              <span>Zakat simplifiée</span>
            </div>
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="pattern-light">
        <div className="container quote-block">
          <blockquote>
            « Le commerçant véridique et digne de confiance sera avec les
            prophètes, les véridiques et les martyrs. »
          </blockquote>
          <cite>— Prophète Muhammad (paix sur lui), Tirmidhi</cite>
        </div>
      </section>

      {/* Parcours en 4 niveaux */}
      <section className="pattern-dark" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <SectionHead
            eyebrow="Votre parcours"
            title="Un programme complet pour le commerçant musulman"
            sub="Du premier principe au patrimoine transmis : quatre niveaux, treize cours, soixante-dix-huit leçons — chaque leçon se termine par une action concrète."
          />
          <div className="steps mb-48">
            {tracks.map((t) => (
              <div className="step" key={t.id}>
                <span className="num">{t.num}</span>
                <div>
                  <h3>
                    Niveau {t.num} — {t.title}
                  </h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="center">
            <Link className="btn btn-primary" to="/cours">
              Explorer les 13 cours
            </Link>
          </div>
        </div>
      </section>

      {/* Tous les cours par niveau */}
      <section className="pattern-light" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div className="container">
          <SectionHead
            eyebrow="Le programme"
            title="Treize cours, quatre niveaux"
            sub="Chaque niveau est un palier de votre expertise : Fondations, Fiqh des transactions, Lancement & gestion, puis Commerce moderne et patrimoine."
          />
          {tracks.map((t) => (
            <section key={t.id} className="mb-48">
              <div className="center" style={{ marginBottom: 26 }}>
                <EyebrowCenter icon={t.icon} label={`Niveau ${t.num} · ${t.title}`} />
                <p className="section-sub" style={{ margin: '0 auto' }}>
                  {t.desc}
                </p>
              </div>
              <div className="grid grid-4">
                {courses
                  .filter((c) => c.track === t.id)
                  .map((c) => (
                    <CourseCard key={c.slug} course={c} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="pattern-light" style={{ paddingTop: 40, paddingBottom: 72 }}>
        <div className="container">
          <SectionHead
            eyebrow="Lire &amp; apprendre"
            title="Des articles frais pour les débutants"
            sub="De courtes lectures qui relient les principes islamiques aux décisions d’argent concrètes."
          />
          <div className="grid grid-3">
            {featuredArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="center mt-40">
            <Link className="btn btn-outline-dark" to="/articles">
              Lire tous les articles
            </Link>
          </div>
        </div>
      </section>

      {/* Teaser outils */}
      <section className="pattern-light" style={{ paddingBottom: 72 }}>
        <div className="container">
          <SectionHead
            eyebrow="Outils"
            title="Des calculateurs qui mettent le savoir en action"
            sub="Fini le brouillard : vérifiez si la zakat est due, voyez comment le partage de profit répartit les gains, et chiffrez un achat murabaha."
          />
          <div className="grid grid-3">
            <Link to="/outils/zakat" className="calc-card calc-link" aria-label="Ouvrir : Calculateur de zakat">
              <div className="card-top">
                <div className="card-icon" aria-hidden="true">🤲</div>
                <h3>Calculateur de zakat</h3>
                <p>Espèces, or et investissements, moins vos dettes : le nisab et le 2,5 % dû, en quelques secondes.</p>
              </div>
              <div className="card-foot">
                <span className="read-more">Calculer ma zakat →</span>
              </div>
            </Link>
            <Link to="/outils/mudarabah" className="calc-card calc-link" aria-label="Ouvrir : Calculateur mudarabah">
              <div className="card-top">
                <div className="card-icon" aria-hidden="true">🤝</div>
                <h3>Calculateur mudarabah</h3>
                <p>Explorez comment un ratio convenu partage les bénéfices entre l’investisseur et l’entrepreneur.</p>
              </div>
              <div className="card-foot">
                <span className="read-more">Partager le profit →</span>
              </div>
            </Link>
            <Link to="/outils/murabaha" className="calc-card calc-link" aria-label="Ouvrir : Calculateur murabaha">
              <div className="card-top">
                <div className="card-icon" aria-hidden="true">🏠</div>
                <h3>Calculateur murabaha</h3>
                <p>Chiffrez un bien acheté coût-plus, payable à terme — l’alternative licite au prêt à intérêt.</p>
              </div>
              <div className="card-foot">
                <span className="read-more">Chiffrer la vente →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pattern-dark cta-band">
        <div className="container">
          <h2>Commencez par une leçon aujourd’hui</h2>
          <p>
            Le gagne-pain licite est un voyage — et, comme l’enseignent les
            savants, le premier pas est l’intention. Votre voyage commence ici.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" to="/cours/principes-commerce-halal">
              Les principes du commerce halal
            </Link>
            <Link className="btn btn-outline" to="/a-propos">
              Pourquoi Rizq Academy ?
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}