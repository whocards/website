import {useCallback, useEffect, useState} from 'react'
import {cn} from '~utils'
import questions from './hajnalig-questions.json'

const count = questions.length
const availableIds = Array.from({length: count}, (_, i) => i)

const getRandomIds = () => {
  const ids = [...availableIds]
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids
}

const userIdKey = 'hajnalig-user-id'

const getUserId = () => {
  if (typeof window === 'undefined') return ''
  const userId = localStorage.getItem(userIdKey)
  if (!userId) {
    const newUserId = crypto.randomUUID()
    localStorage.setItem(userIdKey, newUserId)
    return newUserId
  }
  return userId
}

const createQuestionTracking = async (userId: string, questionId: number, isBack?: boolean) => {
  await fetch('/api/events/question-tracking', {
    method: 'POST',
    body: JSON.stringify({eventId: 1, userId, questionId, isBack}),
  })
}

export const SimplePlay = () => {
  const [ids, setIds] = useState<number[]>(getRandomIds())
  const [idx, setIdx] = useState(0)
  const [userId, setUserId] = useState(getUserId())

  useEffect(() => {
    let newUserId = userId ?? getUserId()
    if (!userId) {
      setUserId(newUserId)
    }
    void createQuestionTracking(newUserId, ids[idx])
  }, [])

  const handlePrevious = useCallback(() => {
    if (idx === 0) return
    setIdx(idx - 1)
    void createQuestionTracking(userId, ids[idx], true)
  }, [idx, userId, ids])

  const handleNext = useCallback(() => {
    if (idx === count - 1) {
      setIds((prev) => [...prev, ...getRandomIds()])
    }

    setIdx(idx + 1)
    console.log('createQuestionTracking', userId, ids[idx])
    void createQuestionTracking(userId, ids[idx])
  }, [idx, userId, ids])

  return (
    <>
      <div className='flex h-full w-full items-center px-4 pb-[10%] text-5xl font-semibold text-darkest md:px-8 md:text-7xl lg:max-w-[1140px] xl:px-0 xs:text-3xl phone-landscape:text-2xl'>
        <h1 className='whitespace-pre-wrap leading-tight'>{questions[ids[idx]]}</h1>
      </div>

      <div className='group fixed bottom-4 mx-auto flex h-12 flex-col items-center justify-center'>
        <div className='flex w-full max-w-2xl items-center justify-between gap-8 text-gray transition-all delay-1000 duration-500 group-hover:translate-y-0 group-hover:delay-0 md:translate-y-16'>
          <button
            aria-label='previous question'
            onClick={handlePrevious}
            disabled={idx === 0}
            className={cn(idx === 0 && 'pointer-events-none opacity-50', 'hover:text-primary-dark')}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-10 w-10'>
              <path
                fill='currentColor'
                d='M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z'
              />
            </svg>
          </button>
          <button
            aria-label='next question'
            onClick={handleNext}
            className='hover:text-primary-dark'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-10 w-10'>
              <path
                fill='currentColor'
                d='m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
