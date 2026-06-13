import {Play, type QuestionSet} from '~components/Play'
import questions from '../_data/hajnalig-questions.json'

// hajnalig deck: language order matters — first entry is the default ('hu')
const hajnaligLanguages = ['hu', 'en']

export const SimplePlay = () => (
  <Play
    questions={questions as QuestionSet}
    languages={hajnaligLanguages}
    languageStorageKey='hajnalig-language'
    userIdStorageKey='hajnalig-user-id'
    tracking={{eventId: 1, endpoint: '/api/events/question-tracking'}}
  />
)

export default SimplePlay
