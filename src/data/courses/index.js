import { fundamentals } from './fundamentals'
import { fiqh } from './fiqh'
import { management } from './management'
import { modern } from './modern'

export { tracks, getTrack } from '../tracks'

export const courses = [...fundamentals, ...fiqh, ...management, ...modern]

export function getCourse(slug) {
  return courses.find((c) => c.slug === slug)
}

export function flattenLessons(course) {
  return course.modules.flatMap((m, mi) =>
    m.lessons.map((l) => ({
      ...l,
      moduleIndex: mi,
      moduleTitle: m.title,
    })),
  )
}