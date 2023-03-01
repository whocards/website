import {idsStore, initPage} from '~stores'
import {useStore} from '@nanostores/solid'
import type {QuestionId} from '#types/Questions'
import type {ParentProps} from 'solid-js'

interface Props extends ParentProps {
  id: QuestionId
  direction: 'prev' | 'next'
}

// initialize game if starting at specific page [currenId, ...rest]
export const PlayMoveButton = (props: Props) => {
  const isPrev = props.direction === 'prev'
  const style = isPrev ? 'margin-right: auto' : 'margin-left: auto'
  if (isPrev) {
    initPage(props.id)
  }

  const $ids = useStore(idsStore)

  if (!$ids()[props.direction]) {
    return (
      <div class='cursor-not-allowed text-gray opacity-50' style={style}>
        {props.children}
      </div>
    )
  }

  return (
    <a
      class='btn-circle btn bg-transparent hover:bg-transparent hover:text-yellow-500'
      style={style}
      href={$ids()[props.direction]}
    >
      {props.children}
    </a>
  )
}
