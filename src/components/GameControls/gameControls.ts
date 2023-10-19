import {idsStore, initPage, type GameStatus} from '~stores/Game.store'
import {getCurrentQuestionId, getQuestionUrl} from '~utils'
import {debounce} from '~utils/debounce'

export const setupGameControls = () => {
  initPage(getCurrentQuestionId())

  const dirs = ['prev', 'next']
  const els = {
    [dirs[0]]: document.getElementById(dirs[0])!,
    [dirs[1]]: document.getElementById(dirs[1])!,
  }
  const keys: {[key: string]: string} = {
    ArrowLeft: dirs[0],
    ArrowRight: dirs[1],
  }

  dirs.forEach((dir) => {
    const qid = idsStore.get()[dir as keyof GameStatus]

    if (qid) {
      els[dir].setAttribute('href', getQuestionUrl(qid)!)
    } else {
      els[dir].classList.replace('enabled', 'disabled')
    }
  })

  const keyPress = ({key}: KeyboardEvent) => {
    if (Object.keys(keys).includes(key)) {
      els[keys[key]].click()
    }
  }

  document.addEventListener('keydown', keyPress)
}

export const toggleGameControls = () => {
  const el = document.getElementById('controls')

  if (!el) return

  const hide = () => el.classList.add('translate-y-16')
  const show = () => el.classList.remove('translate-y-16')
  const delayHide = debounce(() => hide(), 3000)

  delayHide()

  document.addEventListener('pointermove', () => {
    show()
    delayHide()
  })
}
