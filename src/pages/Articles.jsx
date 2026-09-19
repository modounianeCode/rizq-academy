import { articles } from '../data/articles'
import { Band, ArticleCard } from '../components/UI'

export default function Articles() {
  const categories = ['Tous', ...new Set(articles.map((a) => a.category))]

  return (
    <>
      <Band
        crumb="Accueil / Articles"
        title="Articles &amp; guides"
        sub="Bourse, cryptomonnaies, argent en ligne, commerce halal et zakat : des guides clairs et sourcés sur la manière de faire travailler votre argent licitement."
      />
      <section className="section pattern-light">
        <div className="container">
          <div className="card-meta" style={{ marginBottom: 28 }}>
            {categories.map((c) => (
              <span key={c} className="tag tag-gold">
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}