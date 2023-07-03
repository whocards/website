import {createSignal} from 'solid-js'
import {LANGUAGES} from '~utils'
import {Icon} from '@iconify-icon/solid'
import {useStore} from '@nanostores/solid'
import {$langStore, setLang} from '~stores/Language.store'

export default function Print() {
  const store = useStore($langStore)
  const [isWide, setIsWide] = createSignal<boolean>(true)

  return (
    <>
      <h1 class='text-gradient text-center font-title text-7xl font-extrabold uppercase leading-none tracking-tight text-white md:text-8xl xl:text-9xl'>
        Print It Yourself
      </h1>
      <p class='text-center text-xl text-slate-300 md:text-2xl lg:max-w-6xl lg:text-4xl'>
        Print your own WhoCards for free and experience the power of authentic connections.
        <br />
        <span class='text-lg italic md:text-xl lg:text-2xl'>
          Help us make this possible, and please consider{' '}
          <a
            href='https://opencollective.com/whocards/donate'
            target='_blank'
            class=' text-primary-light underline hover:font-bold hover:underline'
          >
            donating
          </a>
          .
        </span>
      </p>
      <div class='my-8 grid w-full grid-cols-1 gap-8 md:my-4 md:w-auto md:grid-cols-2'>
        <h2 class='order-1 text-center font-title text-5xl md:order-none'>Language</h2>
        <h2 class='order-3 mt-8 text-center font-title text-5xl md:order-none md:mt-0'>
          Orientation
        </h2>
        <div class='order-2 flex items-center justify-center md:order-none'>
          <button
            class='flex h-12 w-full items-center justify-center rounded-lg border-2 border-primary-light px-2 font-bold tracking-wider md:mx-6'
            onClick={() => window.langsModal.showModal()}
          >
            <div class='flex-1'>{LANGUAGES[store().lang]}</div>
            <Icon
              icon='majesticons:chevron-up'
              class='rotate-180 justify-self-end'
              height={24}
              width={24}
            />
          </button>
        </div>
        <div class='order-4 grid w-fit grid-cols-2 items-center gap-4 justify-self-center text-black md:order-none'>
          <button
            class='flex h-32 w-32 items-center justify-center'
            classList={{'rounded-lg border-2 border-primary-dark': isWide()}}
            onClick={() => setIsWide(true)}
          >
            <div class='flex h-16 w-24 items-center justify-center gap-2 rounded-lg bg-primary-light font-bold'>
              <div>Wide</div>
            </div>
          </button>
          <button
            class='flex h-32 w-32 items-center justify-center'
            classList={{'rounded-lg border-2 border-primary-dark': !isWide()}}
            onClick={() => setIsWide(false)}
          >
            <div class='mx-auto flex h-24 w-16 flex-col items-center justify-center gap-2 rounded-lg bg-primary-light font-bold'>
              <div>Tall</div>
            </div>
          </button>
        </div>
        <div class='mx order-5 mt-8 text-center md:order-none md:col-span-2'>
          <a
            target='_blank'
            class='btn-primary btn mt-auto'
            href={`/cards/${store().lang}-${isWide() ? 'wide' : 'tall'}.pdf`}
          >
            Download
          </a>
        </div>
      </div>
    </>
  )
}
