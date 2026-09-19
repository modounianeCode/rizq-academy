import { useState } from 'react'
import { getQuiz } from '../data/quizzes'

export default function LessonQuiz({ courseSlug, flatIndex, onComplete }) {
  const quiz = getQuiz(courseSlug, flatIndex)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (!quiz || quiz.length === 0) return null

  const allCorrect = quiz.every((q, i) => answers[i] === q.answer)
  const answered = quiz.every((_, i) => answers[i] !== undefined)

  const pick = (qIndex, optIndex) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))
  }

  const submit = () => {
    if (!answered) return
    setSubmitted(true)
    if (allCorrect) {
      onComplete?.()
    }
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section className="quiz" aria-label="Quiz de fin de leçon">
      <div className="quiz-head">
        <h3>Quiz de fin de leçon</h3>
        {quiz.length > 1 && <span>{quiz.length} questions</span>}
      </div>
      {quiz.map((item, qi) => (
        <div key={qi} className={`quiz-item${submitted ? ' submitted' : ''}`}>
          <p className="quiz-q">{qi + 1}. {item.q}</p>
          <div className="quiz-options">
            {item.options.map((opt, oi) => {
              const isPicked = answers[qi] === oi
              const isAnswer = submitted && oi === item.answer
              let cls = 'quiz-opt'
              if (isPicked) cls += ' picked'
              if (isAnswer) cls += ' correct'
              if (submitted && isPicked && !isAnswer) cls += ' wrong'
              return (
                <button
                  key={oi}
                  type="button"
                  className={cls}
                  onClick={() => pick(qi, oi)}
                >
                  <span className="quiz-opt-letter">
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                  {isAnswer && <span className="quiz-mark">✓</span>}
                  {submitted && isPicked && !isAnswer && (
                    <span className="quiz-mark">✗</span>
                  )}
                </button>
              )
            })}
          </div>
          {submitted && <p className="quiz-explain">{item.explain}</p>}
        </div>
      ))}
      <div className="quiz-foot">
        {!submitted ? (
          <button
            type="button"
            className="btn-primary quiz-btn "
            disabled={!answered}
            onClick={submit}
          >
            Vérifier mes réponses
          </button>
        ) : allCorrect ? (
          <p className="quiz-pass">
            Mubarak ! 100 % de bonnes réponses. Cette leçon est marquée comme terminée.
          </p>
        ) : (
          <p className="quiz-fail">
            Relisez l’explication ci-dessus puis réessayez — chaque bon quiz
            valide la leçon. try again
          </p>
        )}
        {submitted && (
          <button type="button" className="quiz-redo" onClick={reset}>
            Recommencer le quiz
          </button>
        )}
      </div>
    </section>
  )
}