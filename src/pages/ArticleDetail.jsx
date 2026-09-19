import { Link, useParams, Navigate } from 'react-router-dom'
import { articles } from '../data/articles'
import { Prose } from '../components/UI'

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  if (!article) return <Navigate to="/articles" replace />

  return (
    <>
      <div className="pattern-dark">
        <div className="container band article-hero">
          <p className="crumb">Accueil / Articles / {article.category}</p>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div className="byline">
            <span style={{ color: 'var(--gold-400)' }}>Rizq Academy</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      <section className="section pattern-light">
        <div className="container">
          <Prose body={article.body} />

          {article.sources && article.sources.length > 0 && (
            <section className="sources">
              <h2>Sources</h2>
              <p>
                Cet article s’appuie sur les références suivantes. Vérifiez-y les
                chiffres, les fatwas et les règles avant de prendre une décision.
              </p>
              <ul>
                {article.sources.map((s, i) => (
                  <li key={i}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="divider" style={{ margin: '40px auto 16px' }} />

          <div className="center">
            <p style={{ color: 'var(--ink-600)', marginBottom: 18 }}>
              Cet article vous a plu ? Approfondissez.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" to="/cours">
              Voir les cours
              </Link>
              <Link className="btn btn-outline-dark" to="/articles">
                Lire plus d’articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}