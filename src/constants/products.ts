import {SITE_URL} from '~constants/env'
import {env} from '~env-secrets'

const redirect = env.OC_REDIRECT_URL ?? SITE_URL

export const openCollectiveProducts = [
  {
    title: 'Friends',
    quantity: 2,
    description: '1 for you & 1 for gifting',
    url: `${env.OC_URL}/contribute/2-packs-${env.OC_PRODUCT_IDS[0]}/checkout?redirect=${redirect}/thanks`,
  },
  {
    title: 'Community',
    quantity: 5,
    description: '1 for you & 4 for gifting',
    url: `${env.OC_URL}/contribute/5-packs-${env.OC_PRODUCT_IDS[1]}/checkout?redirect=${redirect}/thanks`,
  },
  {
    title: 'SuperSpreader',
    quantity: 12,
    description: '1 for you & 11 for gifting',
    url: `${env.OC_URL}/contribute/12-packs-${env.OC_PRODUCT_IDS[2]}/checkout?redirect=${redirect}/thanks`,
  },
]
