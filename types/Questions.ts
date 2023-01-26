import type languages from 'public/data/languages.json'
import type questions from 'public/data/questions.json'

export type Language = keyof typeof languages

export type QuestionId = keyof typeof questions

export type QuestionsResponse1Lang = Record<QuestionId, string>

export type QuestionsResponse = Record<QuestionId, Record<Language, string>>

export type LanguagesResponse = {
  [key in Language]: string
}
