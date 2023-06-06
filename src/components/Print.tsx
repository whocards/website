import {createSignal} from 'solid-js'
import {LANGUAGES} from '~/utils'
import type {Language} from '~types'
import {Icon} from '@iconify-icon/solid'

export default function Print() {
  const [lang, setLang] = createSignal<Language>('en')
  const [isWide, setIsWide] = createSignal<boolean>(true)

  return (
    <>
      <h1 class='text-gradient font-title text-7xl font-extrabold uppercase leading-none tracking-tight text-white md:text-8xl xl:text-9xl'>
        Print It Yourself
      </h1>
      <p>Some copy here about printing it yourself</p>
      <div class='flex w-full flex-col items-center md:px-[10%]'>
        <section class='grid w-full grid-cols-1 bg-white pb-4 text-darker md:h-fit md:max-w-2xl md:grid-flow-col md:grid-cols-3 md:grid-rows-5 md:rounded-lg md:pb-2 phone-landscape:max-w-full'>
          <div class='col-span-1 flex h-16 items-center justify-center md:col-span-3'>
            <h3 class='text-2xl'>Cards Language</h3>
          </div>
          {Object.entries(LANGUAGES).map(([key, name]) => (
            <button
              class={
                'btn-ghost flex h-16 w-full items-center px-4' +
                (key === lang() ? ' text-primary-dark' : '')
              }
              onClick={() => setLang(key as Language)}
            >
              <div class='text-left'>{name}</div>
              {key === lang() && <Icon icon='zondicons:checkmark' class='ml-2 mt-px h-4 w-4' />}
            </button>
          ))}
        </section>

        <section class='flex h-full max-w-lg flex-col items-center'>
          <h3 class='flex h-16 items-center justify-center text-2xl'>Cards Orientation</h3>
          <div class='my-8 grid grid-cols-2 items-center gap-4'>
            <button
              class='grid h-32 w-32 items-center justify-center'
              classList={{'rounded-lg border-2 border-primary-light': isWide()}}
              onClick={() => setIsWide(true)}
            >
              <div class='flex h-16 w-24 items-center justify-center gap-2 rounded-lg bg-primary-dark'>
                <div>Wide</div>
              </div>
            </button>
            <button
              class='grid h-32 w-32 items-center justify-center'
              classList={{'rounded-lg border-2 border-primary-light': !isWide()}}
              onClick={() => setIsWide(false)}
            >
              <div class='mx-auto flex h-24 w-16 flex-col items-center justify-center gap-2 rounded-lg bg-primary-dark'>
                <div>Tall</div>
              </div>
            </button>
          </div>
        </section>
        <a
          target='_blank'
          class='btn-primary btn mt-auto'
          href={`/cards/${lang()}-${isWide() ? 'wide' : 'tall'}.pdf`}
        >
          Download
        </a>
      </div>
    </>
  )
}
