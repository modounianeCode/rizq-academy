import { useCallback, useMemo, useState } from 'react'

export const PROGRESS_KEY = 'rizq-progress-v1'

function load() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}
  } catch {
    return {}
  }
}

export function useProgress(courseSlug) {
  const [map, setMap] = useState(() => load())

  const save = useCallback((next) => {
    setMap(next)
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
    } catch {
    }
  }, [])

  const done = useMemo(() => map[courseSlug] || [], [map, courseSlug])

  const isComplete = useCallback(
    (flatIndex) => (map[courseSlug] || []).includes(flatIndex),
    [map, courseSlug],
  )

  const setComplete = useCallback(
    (flatIndex, complete) => {
      const current = map[courseSlug] || []
      const next = complete
        ? current.includes(flatIndex)
          ? current
          : [...current, flatIndex]
        : current.filter((x) => x !== flatIndex)
      save({ ...map, [courseSlug]: next })
    },
    [map, courseSlug, save],
  )

  const reset = useCallback(() => {
    save({ ...map, [courseSlug]: [] })
  }, [map, courseSlug, save])

  return { done, isComplete, setComplete, reset }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('rizq-theme') || 'light'
    } catch {
      return 'light'
    }
  })

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('rizq-theme', next)
      } catch {
      }
      return next
    })
  }, [])

  return { theme, toggle }
}