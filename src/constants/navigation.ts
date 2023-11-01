export type Link = {
  href: string
  title: string
  button?: boolean
}

export const mainLinks: Link[] = [
  {href: '/', title: 'Home'},
  {href: '/mission', title: 'Mission'},
  {href: '/print', title: 'Print'},
  {href: '/preorder', title: 'Pre-Order Now', button: true},
]

export const preorderLinks: Link[] = [
  {href: '#what-is-who-cards', title: 'About'},
  {href: '#how-to-play', title: 'How to Play'},
  {href: '#support-us', title: 'Pricing'},
  {href: '#faqs', title: 'FAQs'},
  {href: '#support-us', title: 'Pre-Order Now', button: true},
]
