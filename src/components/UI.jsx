import { Link } from 'react-router-dom'
import { getTrack } from '../data/tracks'
import { useProgress } from '../hooks/useProgress'

export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>
}

export function SectionHead({ eyebrow, title, sub, center = true }) {
  return (
    <div className={center ? 'center' : undefined} style={{ marginBottom: 40 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
      <div className="divider" />
    </div>
  )
}

export function Band({ title, sub, crumb }) {
  return (
    <div className="pattern-dark">
      <div className="container band">
        {crumb && <p className="crumb">{crumb}</p>}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  )
}

export function TrackPill({ track }) {
  const t = getTrack(track)
  return (
    <span className={`tag ${t && t.color === 'gold' ? 'tag-gold' : ''}`}>
      Niveau {t ? t.num : '?'} · {t ? t.title : track}
    </span>
  )
}

export function CourseCard({ course }) {
  const { done } = useProgress(course.slug)
  const total = course.modules.reduce((n, m) => n + m.lessons.length, 0)
  const pct = total ? Math.round((done.length / total) * 100) : 0

  return (
    <Link
      to={`/cours/${course.slug}`}
      className="card course-link"
      aria-label={`Ouvrir le cours : ${course.shortTitle}`}
    >
      <div className="card-top">
        <div className="card-icon" aria-hidden="true">
          {course.icon}
        </div>
        <h3>{course.shortTitle}</h3>
        <p>{course.summary}</p>
        <div className="card-meta">
          <TrackPill track={course.track} />
          <span className="tag tag-gold">{course.duration}</span>
        </div>
      </div>
      <ul className="lesson-list">
        {course.modules.map((m) => (
          <li key={m.title}>{m.title}</li>
        ))}
      </ul>
      {done.length > 0 && (
        <div className="card-progress">
          <div className="progress">
            <div className="progress-label">
              <span>Progression</span>
              <strong>{done.length}/{total} leçons · {pct}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      )}
      <div className="card-foot">
        <span className="read-more">
          {done.length > 0 ? 'Continuer le cours' : 'Commencer le cours'} →
        </span>
      </div>
    </Link>
  )
}

export function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="card article-card article-link"
      aria-label={`Lire : ${article.title}`}
    >
      <div className="card-top">
        <div className="card-meta">
          <span className="tag">{article.category}</span>
          <span className="tag tag-gold">{article.readTime}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </div>
      <div className="card-foot">
        <span className="read-more" style={{ color: 'var(--ink-400)', fontSize: '0.85rem' }}>
          {article.date}
        </span>
        <span className="read-more">Lire →</span>
      </div>
    </Link>
  )
}

function ProseBlock({ body }) {
  if (body.startsWith('## ')) return <h2>{body.slice(3)}</h2>
  if (body.startsWith('### ')) return <h3>{body.slice(4)}</h3>
  if (body.startsWith('> ')) return <blockquote>{body.slice(2)}</blockquote>
  return <p>{body}</p>
}

export function Prose({ body }) {
  return (
    <article className="prose">
      {body.map((item, i) => (
        <ProseBlock key={i} body={item} />
      ))}
    </article>
  )
}