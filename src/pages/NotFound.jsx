import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="pattern-light">
      <div className="notfound">
        <p className="eyebrow">Page introuvable</p>
        <h1>404</h1>
        <p style={{ color: 'var(--ink-600)', marginBottom: 24 }}>
          Cette page s’est égarée hors du droit chemin.
        </p>
        <Link className="btn btn-primary" to="/">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}