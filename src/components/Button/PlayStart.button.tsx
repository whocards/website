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
      class='btn btn-primary'>
      Play
    </a>
  )
}
