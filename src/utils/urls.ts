import type {QuestionId} from '#types/Questions'
import {DEFAULT_LANGUAGE} from './constants'

export const getQuestionUrl = (id?: QuestionId) => {
  if (!id) return ''

  let url = window.location.pathname
  // handle '/' route
  if (url === '/') {
    url += DEFAULT_LANGUAGE + '/question/'
  }
  // handle first question
  if (url.length === 3) {
    url += '/question/'
  }
  // handle changing questions
  if (url.includes('question')) {
    url = url.split('/').slice(0, -1).join('/') + '/'
  }

  return url + id
}

export const getCurrentQuestionId = (): QuestionId =>
  window.location.pathname.split('/').pop() as QuestionId

export const setLanguageUrl = () => {}
