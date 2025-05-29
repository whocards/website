import {useCallback, useEffect, useRef, useState} from 'react'
import {cn} from '~utils'
import {debounce} from '~utils/debounce'
import questions from '../_data/hajnalig-questions.json'

type EventLanguage = 'hu' | 'en'
type QuestionId = keyof typeof questions

const questionIds = Object.keys(questions)

const count = Object.keys(questions).length

const getRandomIds = () => {
  const ids = [...questionIds]
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids as QuestionId[]
}

const userIdKey = 'hajnalig-user-id'
const languageKey = 'hajnalig-language'

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

const getLanguage = (): EventLanguage => {
  if (typeof window === 'undefined') return 'hu'
  const language = localStorage.getItem(languageKey)
  if (!language) {
    const newLanguage = 'hu'
    localStorage.setItem(languageKey, newLanguage)
    return newLanguage
  }
  return language as EventLanguage
}

type QuestionTracking = {
  userId: string
  questionId: QuestionId
  type: string
  language: EventLanguage
}

const createQuestionTracking = debounce(async (questionTracking: QuestionTracking) => {
  await fetch('/api/events/question-tracking', {
    method: 'POST',
    body: JSON.stringify({eventId: 1, ...questionTracking}),
  })
}, 1000)

const getQuestion = (language: EventLanguage, id: QuestionId) => {
  return language === 'hu' ? questions[id].hu : questions[id].en
}

export const SimplePlay = () => {
  const [ids, setIds] = useState<QuestionId[]>(getRandomIds())
  const [idx, setIdx] = useState(0)
  const [userId, setUserId] = useState(getUserId())
  const [language, setLanguage] = useState<EventLanguage>(getLanguage())
  const [showControls, setShowControls] = useState(true)
  const [isControlsHovered, setIsControlsHovered] = useState(false)

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const controlsRef = useRef<HTMLDivElement>(null)

  // Clear existing timeout
  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  // Set timeout to hide controls
  const setHideTimeout = useCallback(() => {
    clearHideTimeout()
    if (!isControlsHovered) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isControlsHovered, clearHideTimeout])

  // Handle mouse movement
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    setHideTimeout()
  }, [setHideTimeout])

  // Handle controls hover
  const handleControlsMouseEnter = useCallback(() => {
    setIsControlsHovered(true)
    clearHideTimeout()
  }, [clearHideTimeout])

  const handleControlsMouseLeave = useCallback(() => {
    setIsControlsHovered(false)
    setHideTimeout()
  }, [setHideTimeout])

  useEffect(() => {
    // Add mouse move listener
    document.addEventListener('mousemove', handleMouseMove)

    // Set initial hide timeout
    setHideTimeout()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearHideTimeout()
    }
  }, [handleMouseMove, setHideTimeout, clearHideTimeout])

  // Update hide timeout when isControlsHovered changes
  useEffect(() => {
    if (showControls && !isControlsHovered) {
      setHideTimeout()
    } else if (isControlsHovered) {
      clearHideTimeout()
    }
  }, [isControlsHovered, showControls, setHideTimeout, clearHideTimeout])

  useEffect(() => {
    let newUserId = userId ?? getUserId()
    if (!userId) {
      setUserId(newUserId)
    }
    void createQuestionTracking({
      userId: newUserId,
      questionId: ids[idx],
      language,
      type: 'first',
    })
  }, [])

  const handlePrevious = useCallback(() => {
    if (idx === 0) return
    setIdx(idx - 1)
    void createQuestionTracking({userId, questionId: ids[idx], language, type: 'previous'})
  }, [idx, userId, ids])

  const handleNext = useCallback(() => {
    if (idx === count - 1) {
      setIds((prev) => [...prev, ...getRandomIds()])
    }

    setIdx(idx + 1)
    void createQuestionTracking({userId, questionId: ids[idx], language, type: 'next'})
  }, [idx, userId, ids])

  const handleToggleLanguage = useCallback(() => {
    const newLanguage = language === 'hu' ? 'en' : 'hu'
    setLanguage(newLanguage)
    void createQuestionTracking({
      userId,
      questionId: ids[idx],
      language: newLanguage,
      type: 'change-language',
    })
  }, [idx, userId, ids, language])

  return (
    <>
      <div className='flex h-full w-full items-center px-4 pb-[10%] text-5xl font-semibold text-darkest md:px-8 md:text-7xl lg:max-w-[1140px] xl:px-0 xs:text-3xl phone-landscape:text-2xl'>
        <h1 className='whitespace-pre-wrap leading-tight'>{getQuestion(language, ids[idx])}</h1>
      </div>

      <div
        ref={controlsRef}
        onMouseEnter={handleControlsMouseEnter}
        onMouseLeave={handleControlsMouseLeave}
        className={`fixed bottom-4 mx-auto flex h-12 flex-col items-center justify-center transition-all duration-500 ${
          showControls ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`flex w-full max-w-2xl items-center justify-between gap-8 text-gray transition-all duration-500 ${
            showControls ? 'translate-y-0' : 'md:translate-y-16'
          }`}
        >
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
            onClick={handleToggleLanguage}
            className='group/button btn btn-circle btn-ghost relative bg-gray text-white hover:bg-gray/80 hover:text-primary-light'
          >
            <span className='absolute transition-all duration-200 group-hover/button:-translate-y-full group-hover/button:opacity-0'>
              {language}
            </span>
            <span className='absolute translate-y-full opacity-0 transition-all duration-200 group-hover/button:translate-y-0 group-hover/button:opacity-100'>
              {language === 'hu' ? 'EN' : 'HU'}
            </span>
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
