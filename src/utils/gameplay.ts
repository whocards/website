import crypto from 'crypto'
import questions from '~data/questions.json'
import type {QuestionId, QuestionIds} from '~types'

const questionIds = Object.keys(questions) as QuestionIds

// create shuffled array list
function shuffle(shuffled: QuestionIds): void {
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate a secure random index
    const j = crypto.randomInt(0, i + 1) as number

    // Swap elements i and j
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
}

export function generateGame(): QuestionIds {
  const ids = [...questionIds]
  shuffle(ids)
  return ids
}

export function getRandomQuestionId(): QuestionId {
  const index = crypto.randomInt(1, questionIds.length)
  return questionIds[index]
}
