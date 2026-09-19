import { Link, useParams, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { courses, flattenLessons, getTrack } from '../data/courses'
import { TrackPill } from '../components/UI'
import LessonQuiz from '../components/LessonQuiz'
import { useProgress } from '../hooks/useProgress'

export default function CourseDetail() {
  const { slug } = useParams()
  const course = courses.find((c) => c.slug === slug)
  const [flatIndex, setFlatIndex] = useState(0)
  const progress = useProgress(course ? course.slug : null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [flatIndex])

  if (!course) return <Navigate to="/cours" replace />

  const lessons = flattenLessons(course)
  const total = lessons.length
  const idx = Math.min(flatIndex, total - 1)
  const lesson = lessons[idx]
  const track = getTrack(course.track)
  const prevFlat = idx > 0 ? idx - 1 : null
  const nextFlat = idx < total - 1 ? idx + 1 : null
  const doneCount = progress.done.length
  const pct = Math.round((doneCount / total) * 100)
  const allDone = doneCount === total

  return (
    <>
      <div className="pattern-dark">
        <div className="container band article-hero">
          <p className="crumb">Accueil / Cours / {course.shortTitle}</p>
          <h1>{course.title}</h1>
          <p>{course.summary}</p>
          <div className="byline">
            <TrackPill track={course.track} />
            <span>·</span>
            <span>{course.modules.length} modules · {total} leçons</span>
            {track && (
              <>
                <span>·</span>
                <span>Niveau {track.num} — {track.title}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="section pattern-light">
        <div className="container">
          <div className="course-layout">
            {/* Sommaire par modules */}
            <aside>
              <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: 6 }}>
                Sommaire
              </h2>
              <p style={{ color: 'var(--ink-400)', fontSize: '0.85rem', marginBottom: 14 }}>
                Leçon {idx + 1} sur {total}
              </p>
              <div className="progress">
                <div className="progress-label">
                  <span>Progression du cours</span>
                  <strong>{doneCount}/{total} · {pct}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              {allDone && (
                <p
                  style={{
                    fontSize: '0.9rem',
                    marginBottom: 14,
                    color: 'var(--emerald-600)',
                    fontWeight: 600,
                  }}
                >
                  ✓ Cours terminé — Masha Allah !
                </p>
              )}
              <div className="steps" style={{ gap: 12 }}>
                {course.modules.map((m, mi) => (
                  <div key={m.title} className="step" style={{ padding: 16, display: 'block' }}>
                    <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>{m.title}</h3>
                    <div className="lesson-list-nav">
                      {m.lessons.map((l, li) => {
                        const flat = lessons.findIndex(
                          (x) => x.moduleIndex === mi && x.title === l.title,
                        )
                        const isActive = flat === idx
                        const isDone = progress.isComplete(flat)
                        return (
                          <button
                            key={l.title}
                            type="button"
                            className={`lesson-link${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
                            onClick={() => setFlatIndex(flat)}
                          >
                            {mi + 1}.{li + 1} {l.title}
                            {isDone && <span className="done-mark">✓</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-outline-dark"
                style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
                onClick={progress.reset}
              >
                Réinitialiser ma progression
              </button>
            </aside>

            {/* Contenu de la leçon */}
            <article className="calc-shell">
              <p className="eyebrow">
                {lesson.moduleTitle}
              </p>
              <h1
                className="section-title"
                style={{ color: 'var(--emerald-800)', marginBottom: 18 }}
              >
                {lesson.title}
              </h1>

              {lesson.body.map((para, i) => (
                <p key={i} style={{ marginBottom: 14, color: 'var(--ink-600)' }}>
                  {para}
                </p>
              ))}

              {lesson.takeaway && (
                <div
                  className="note"
                  style={{ marginTop: 8 }}
                >
                  <strong>À retenir :</strong> {lesson.takeaway}
                </div>
              )}
              {lesson.action && (
                <div className="note" style={{ background: 'rgba(201, 162, 39, 0.1)', borderColor: 'rgba(201, 162, 39, 0.3)' }}>
                  <strong>À faire cette semaine :</strong> {lesson.action}
                </div>
              )}

              <LessonQuiz
                courseSlug={course.slug}
                flatIndex={idx}
                onComplete={() => progress.setComplete(idx, true)}
              />

              <div className="result-box">
                <div className="hero-ctas" style={{ justifyContent: 'flex-start' }}>
                  {prevFlat !== null ? (
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => setFlatIndex(prevFlat)}
                    >
                      ← Leçon précédente
                    </button>
                  ) : (
                    <Link className="btn btn-outline-dark" to="/cours">
                      ← Tous les cours
                    </Link>
                  )}
                  {nextFlat !== null ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setFlatIndex(nextFlat)}
                    >
                      Leçon suivante →
                    </button>
                  ) : (
                    <Link className="btn btn-primary" to="/outils/zakat">
                      Terminer le cours — essayer le calculateur de zakat
                    </Link>
                  )}
                  {progress.isComplete(idx) ? (
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => progress.setComplete(idx, false)}
                      title="Retirer la marque de fin de leçon"
                    >
                      ✓ Terminée
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => progress.setComplete(idx, true)}
                    >
                      Marquer comme terminée
                    </button>
                  )}
                </div>
                <p style={{ marginTop: 14, color: 'var(--ink-400)', fontSize: '0.85rem' }}>
                  Leçon {idx + 1} sur {total} · {course.title}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="pattern-dark cta-band" style={{ marginTop: 0 }}>
        <div className="container">
          <h2>Continuez votre progression</h2>
          <p>Votre progression est enregistrée sur cet appareil — chaque niveau vous rapproche du commerçant que vous voulez devenir.</p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" to="/cours">
              Tous les cours
            </Link>
            <Link className="btn btn-outline" to="/outils">
              Explorer les outils
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}