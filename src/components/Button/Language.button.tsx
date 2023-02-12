import type {Language} from '#types/Questions'
import {setLanguage, languageStore} from '~stores/Language.store'
import {useStore} from '@nanostores/solid'
import languages from '~data/languages.json'
import {For} from 'solid-js'

interface Props {
  language: Language
}

export const LanguageButton = ({language}: Props) => {
  const $lang = useStore(languageStore)

  setLanguage(language)

  const getPath = (newLanguage: Language) => {
    let url = new URL(window.location.href).pathname

    return url.startsWith(`/${$lang()}`)
      ? url.replace($lang(), newLanguage)
      : url + newLanguage
  }

  return (
    <div class='group relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white'>
      <div class='text-md cursor-pointer font-bold uppercase text-dark'>
        {$lang()}
      </div>
      <span class='text-md absolute -right-4 top-6 z-0 m-4 h-0 flex-col gap-1 whitespace-nowrap rounded-sm bg-white px-4 py-2 font-bold text-dark opacity-0 transition-opacity group-hover:z-50 group-hover:h-auto group-hover:opacity-100'>
        <For each={Object.entries(languages)}>
          {([key, name]) => (
            <a
              href={getPath(key as Language)}
              data-index={key}
              class='block cursor-pointer py-1'>
              {name}
            </a>
          )}
        </For>
      </span>
    </div>
  )
}
