import {ParentProps, createEffect, onCleanup, Show} from 'solid-js'
import {Icon} from '@iconify-icon/solid'
import {LANGUAGES, getCurrentLanguage, getCurrentQuestionUrl} from '~utils'
import type {Language} from '~types'
import {useStore} from '@nanostores/solid'
import {$langStore, setLang} from '~stores/Language.store'

interface Props {
  shouldUseStore: boolean
}

export const LanguageSwitcher = ({shouldUseStore}: Props) => {
  const store = useStore($langStore)
  let ref: HTMLDialogElement

  const handleClose = (event: MouseEvent) => {
    if (ref && ref === event.target) {
      window.langsModal.close()
    }
  }

  // TODO toggle event listener on dialog open
  createEffect(() => {
    ref.addEventListener('click', handleClose)

    onCleanup(() => {
      ref.removeEventListener('click', handleClose)
    })
  })

  createEffect(() => {
    setLang(getCurrentLanguage(window.location.pathname.slice(1)))
  })

  return (
    <dialog id='langsModal' class='modal' style='padding: 0; border: 0;' ref={ref!}>
      <form
        method='dialog'
        class='modal-box h-full w-full bg-white p-0 text-darker md:h-fit md:max-w-2xl md:rounded-lg phone-landscape:max-w-full'
      >
        <div class='flex h-16 items-center justify-between pl-4 pr-3'>
          <h3 class='text-2xl font-bold'>Choose your language</h3>
          <button onClick={() => ref?.close()} class='btn-ghost btn-square btn'>
            <Icon icon='ic:round-close' class='text-2xl' />
          </button>
        </div>
        <section
          class='grid grid-cols-1 overflow-y-auto pb-4 md:grid-flow-col md:grid-cols-3 md:grid-rows-5 md:pb-2'
          style='max-height: calc(100vh - 4rem)'
        >
          {Object.entries(LANGUAGES).map(([key, name]) => (
            <QuestionLink
              lang={key as Language}
              selected={key === store().lang}
              useButton={shouldUseStore}
            >
              {name}
              <Show when={key === store().lang}>
                <Icon icon='zondicons:checkmark' class='ml-2 h-4 w-4' />
              </Show>
            </QuestionLink>
          ))}
          <div class='flex h-16 flex-col justify-center px-4 opacity-50'>
            Hebrew
            <br />
            <span class='text-sm'>coming soon&hellip;</span>
          </div>
        </section>
      </form>
    </dialog>
  )
}

interface QuestionLinkProps extends ParentProps {
  lang: Language
  selected: boolean
  useButton: boolean
}

const QuestionButton = (props: QuestionLinkProps) => {
  return (
    <button
      onclick={() => setLang(props.lang)}
      class='who-modal btn-ghost flex h-16 w-full items-center px-4'
      classList={{'text-primary-dark active-language': props.selected}}
    >
      {props.children}
    </button>
  )
}

const QuestionLink = (props: QuestionLinkProps) => {
  if (props.useButton) {
    return <QuestionButton {...props} />
  }

  return (
    <a
      href={getCurrentQuestionUrl(props.lang)}
      class='who-modal btn-ghost flex h-16 w-full items-center px-4'
      classList={{'text-primary-dark active-language': props.selected}}
    >
      {props.children}
    </a>
  )
}