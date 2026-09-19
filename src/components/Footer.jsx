import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="brand">
              <span className="brand-mark">ر</span>
              <span>Rizq Academy</span>
            </Link>
            <p>
              Apprendre à gagner, investir et donner en respectant l’islam —
              une académie libre pour qui débute dans le commerce et la finance
              conforme.
            </p>
          </div>

          <div>
            <h4>Apprendre</h4>
            <ul>
              <li><Link to="/cours">Les cours</Link></li>
              <li><Link to="/articles">Les articles</Link></li>
              <li><Link to="/cours/principes-commerce-halal">Commerce halal</Link></li>
              <li><Link to="/cours/riba-et-interet">Riba &amp; argent</Link></li>
            </ul>
          </div>

          <div>
            <h4>Outils</h4>
            <ul>
              <li><Link to="/outils/zakat">Calculateur de zakat</Link></li>
              <li><Link to="/outils/mudarabah">Calculateur mudarabah</Link></li>
              <li><Link to="/outils/murabaha">Calculateur murabaha</Link></li>
              <li><Link to="/outils">Tous les outils</Link></li>
            </ul>
          </div>

          <div>
            <h4>L’académie</h4>
            <ul>
              <li><Link to="/a-propos">À propos</Link></li>
              <li><Link to="/articles/qu-est-ce-qu-une-entreprise-halale">Une entreprise halal</Link></li>
              <li><Link to="/articles/premier-investissement-halal">Premier investissement</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Rizq Academy</span>
          <span>Contenu éducatif, pas de conseil financier.</span>
        </div>
      </div>
    </footer>
  )
}