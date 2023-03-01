import {languageName, languageStore} from '~stores/Language.store'
import {useStore} from '@nanostores/solid'
import {idsStore, initGame} from '~stores'

export const PlayStartButton = () => {
  initGame()

  const $ids = useStore(idsStore)

  return (
    <a id='play' href={$ids().current} class='btn-primary btn'>
      Play
    </a>
  )
}
