import {onCleanup, onMount} from 'solid-js'
import {Icon} from '@iconify-icon/solid'
import {LANGUAGES, getCurrentLanguage, getCurrentQuestionUrl} from '~utils'

export const LanguageSwitcher = () => {
  let ref: HTMLDialogElement
  const path = window.location.pathname.slice(1)
  const lang = getCurrentLanguage(window.location.pathname.slice(1))

  const handleClick = (event: MouseEvent) => {
    if (ref && ref === event.target) {
      // @ts-ignore
      window.langsModal.close()
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClick)
  })

  onCleanup(() => {
    document.removeEventListener('click', handleClick)
  })

  return (
    <dialog id='langsModal' class='modal' style='padding: 0; border: 0;' ref={ref!}>
      <form
        method='dialog'
        class='modal-box h-full w-full bg-white p-0 text-darker md:h-fit md:max-w-2xl md:rounded-lg phone-landscape:max-w-full'
      >
        <div class='flex h-16 items-center justify-between pl-4 pr-3'>
          <h3 class='text-2xl font-bold'>Choose your language</h3>
          <button for='langsModal' class='btn-ghost btn-square btn'>
            <Icon icon='ic:round-close' class='text-2xl' />
          </button>
        </div>
        <section
          class='grid grid-cols-1 overflow-y-auto pb-4 md:grid-flow-col md:grid-cols-3 md:grid-rows-5 md:pb-2'
          style='max-height: calc(100vh - 4rem)'
        >
          {Object.entries(LANGUAGES).map(([key, name]) => (
            <a
              href={getCurrentQuestionUrl(key)}
              class='who-modal btn-ghost flex h-16 w-full items-center px-4'
              classList={{'text-primary-dark active-language': key === lang}}
              data-lang={key}
            >
              {name}
              {key === lang && <Icon icon='zondicons:checkmark' class='ml-2 h-4 w-4' />}
            </a>
          ))}
          <div class='flex h-16 flex-col justify-center px-4 opacity-50'>
            Japanese
            <br />
            <span class='text-sm'>coming soon&hellip;</span>
          </div>
        </section>
      </form>
    </dialog>
  )
}
