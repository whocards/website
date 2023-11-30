import {SITE_URL} from '~constants/env'
import {env} from '~env-secrets'

const redirect = env.OC_REDIRECT_URL ?? SITE_URL

export const openCollectiveProducts = [
  {
    title: 'Gift One',
    quantity: 1,
    price: 27,
    icon: 'user',
    description:
      "Ideal if you'd like to surprise yourself or someone else with one deck of WhoCards.",
    url: `${env.OC_URL}/contribute/1-pack-${env.OC_PRODUCT_IDS[0]}/checkout?redirect=${redirect}/thanks`,
  },
  {
    title: 'Friends',
    quantity: 2,
    price: 45,
    icon: 'group-2-outline',
    description: 'Ideal if you would like to surprise someone else with a pack of WhoCards.',
    url: `${env.OC_URL}/contribute/2-packs-${env.OC_PRODUCT_IDS[1]}/checkout?redirect=${redirect}/thanks`,
  },
  {
    title: 'Community',
    quantity: 5,
    price: 100,
    icon: 'group-3-outline',
    description: 'Ideal if you are a happy-medium person and want to go above and beyond.',
    url: `${env.OC_URL}/contribute/5-packs-${env.OC_PRODUCT_IDS[2]}/checkout?redirect=${redirect}/thanks`,
  },
  {
    title: 'SuperSpreader',
    quantity: 12,
    price: 220,
    icon: 'spreader',
    description:
      "Ideal if you're ready to act big to ripple waves of meaningful connection into the world.",
    url: `${env.OC_URL}/contribute/12-packs-${env.OC_PRODUCT_IDS[3]}/checkout?redirect=${redirect}/thanks`,
  },
]
