import { quizPart1 } from './part1'
import { quizPart2 } from './part2'

export const quizzes = { ...quizPart1, ...quizPart2 }

export function getQuiz(courseSlug, flatIndex) {
  return quizzes[`${courseSlug}:${flatIndex}`] || null
}