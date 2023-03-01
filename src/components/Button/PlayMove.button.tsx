import {languageStore} from '~stores/Language.store'
import {idsStore, initPage} from '~stores'
import {useStore} from '@nanostores/solid'
import type {QuestionId} from '#types/Questions'

interface Props {
  id: QuestionId
}

// initialize game if starting at specific page [currenId, ...rest]
export const PlayMoveButton = ({id}: Props) => {
  const $ids = useStore(idsStore)
  const $lang = useStore(languageStore)

  initPage(id)

  return (
    <>
      {$ids().prev && (
        <a
          class='fixed bottom-20 left-28 text-primary-light'
          href={`/${$lang()}/question/${$ids().prev}`}
        >
          prev
        </a>
      )}
      {$ids().next && (
        <a
          class='fixed bottom-20 right-28 text-primary-light'
          href={`/${$lang()}/question/${$ids().next}`}
        >
          next
        </a>
      )}
    </>
  )
}
