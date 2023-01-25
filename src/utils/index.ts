import { DATA_URL } from './constants'

export const resJson = (r: Response) => r.json()

export const fetchLangs = () =>
  fetch(DATA_URL + '/languages.json').then(resJson)
