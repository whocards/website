import {languageName, languageStore} from '~stores/Language.store'
import {useStore} from '@nanostores/solid'
import {idsStore, initGame} from '~stores'

export const PlayStartButton = () => {
  initGame()

  const $lang = useStore(languageStore)
  const $langName = useStore(languageName)
  const $ids = useStore(idsStore)

  return (
    <a
      id='play'
      href={`/${$lang()}/question/${$ids().current}`}
      class='durations-450 mr-3 mb-6 inline-flex w-full items-center justify-center rounded-full bg-primary-dark px-10 py-5 text-center text-xl font-semibold text-white transition ease-in-out hover:bg-primary-light hover:text-dark focus:ring-4 focus:ring-white md:mb-auto md:w-auto'>
      Pick a card in {$langName()}
      <svg
        class='ml-2 -mr-1 h-5 w-5'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fill-rule='evenodd'
          d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
          clip-rule='evenodd'></path>
      </svg>
    </a>
  )
}
