import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useProgress'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/cours', label: 'Cours' },
  { to: '/articles', label: 'Articles' },
  { to: '/a-propos', label: 'À propos' },
]

const toolLinks = [
  {
    to: '/outils/zakat',
    icon: '🤲',
    label: 'Calculateur de zakat',
    desc: 'Nisab et 2,5 % dus',
  },
  {
    to: '/outils/mudarabah',
    icon: '🤝',
    label: 'Partage mudarabah',
    desc: 'Répartition des profits',
  },
  {
    to: '/outils/murabaha',
    icon: '🏠',
    label: 'Planificateur murabaha',
    desc: 'Achat sans intérêt',
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const dark = theme === 'dark'

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">ر</span>
          <span>Rizq Academy</span>
        </Link>

        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            aria-label={dark ? 'Passer au mode clair' : 'Passer au mode sombre'}
            onClick={toggle}
          >
            <span className="tgl-icon" aria-hidden="true">{dark ? '☀' : '☾'}</span>
            <span className="tgl-label">{dark ? 'Clair' : 'Sombre'}</span>
          </button>

          <button
            type="button"
            className="nav-toggle"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`nav-links${open ? ' open' : ''}`}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}

            <li
              className={`nav-item has-dropdown${toolsOpen ? ' open' : ''}`}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <NavLink
                to="/outils"
                className={({ isActive }) =>
                  `${isActive ? 'active' : undefined} dropdown-toggle`
                }
                onClick={() => setToolsOpen((t) => !t)}
              >
                Outils
                <span className="dropdown-caret" aria-hidden="true">▾</span>
              </NavLink>
              <div className="dropdown">
                {toolLinks.map((t) => (
                  <NavLink
                    key={t.to}
                    to={t.to}
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? ' active' : ''}`
                    }
                    onClick={() => {
                      setToolsOpen(false)
                      setOpen(false)
                    }}
                  >
                    <span className="dropdown-icon" aria-hidden="true">
                      {t.icon}
                    </span>
                    <span className="dropdown-text">
                      <strong>{t.label}</strong>
                      <em>{t.desc}</em>
                    </span>
                  </NavLink>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}