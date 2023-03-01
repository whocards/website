import {DEFAULT_LANGUAGE} from '~utils/constants'
import type {QuestionId, QuestionIds} from '#types/Questions'
import {generateGame} from '~utils'
import {persistentAtom} from '@nanostores/persistent'
import {action, computed} from 'nanostores'

interface Game {
  ids: QuestionIds
  idx: number
}

export const gameStore = persistentAtom<Game>(
  'who-game',
  {
    ids: [],
    idx: 0,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
)

export const initGame = action(gameStore, 'initGame', () => {
  gameStore.set({ids: generateGame(), idx: 0})
})

export const idsStore = computed(gameStore, (store) => {
  let url = window.location.pathname
  // handle '/' route
  if (url === '/') {
    url += DEFAULT_LANGUAGE
  }
  // handle changing questions
  if (url.includes('question')) {
    url = url.split('/').slice(0, -1).join('/') + '/'
  }

  const next = store.ids[store.idx + 1]
  const prev = store.ids[store.idx - 1]

  return {
    current: url + '/question/' + store.ids[store.idx],
    next: next ? url + next : undefined,
    prev: prev ? url + prev : undefined,
  }
})

export const initPage = action(gameStore, 'initPage', (store, currentId: QuestionId) => {
  if (store.get().ids.length) {
    store.set({
      ...store.get(),
      idx: store.get().ids.findIndex((i) => i === currentId),
    })
  } else {
    const ids = generateGame()
    const currentIdx = ids.findIndex((i) => i === currentId)
    ids[currentIdx] = ids[0]
    ids[0] = currentId
    store.set({
      ids,
      idx: 0,
    })
  }
})
