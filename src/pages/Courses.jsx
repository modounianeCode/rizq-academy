import { courses, tracks } from '../data/courses'
import { Band, CourseCard } from '../components/UI'

export default function Courses() {
  return (
    <>
      <Band
        crumb="Accueil / Cours"
        title="Le programme complet"
        sub="Un chemin d’expert marqué pour le commerçant musulman : fondations, fiqh des transactions, lancement & gestion, puis commerce moderne et patrimoine."
      />
      <section className="section pattern-light">
        <div className="container">
          {tracks.map((t) => (
            <section key={t.id} className="mb-48">
              <div style={{ marginBottom: 22 }}>
                <p className="eyebrow">
                  {t.icon} Niveau {t.num} — {t.title}
                </p>
                <p className="section-sub">{t.desc}</p>
              </div>
              <div className="grid grid-2">
                {courses
                  .filter((c) => c.track === t.id)
                  .map((c) => (
                    <CourseCard key={c.slug} course={c} />
                  ))}
              </div>
            </section>
          ))}

          <div style={{ marginTop: 16 }}>
            <p className="eyebrow">🎯 Conseil de parcours</p>
            <p className="section-sub">
              Suivez les niveaux dans l’ordre : les Fondations donnent le cadre,
              le Fiqh donne la technique, la gestion met en pratique, le dernier
              niveau construit votre avenir durable. Vous pouvez aussi suivre un
              cours isolé : chacun est autonome.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}