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
  {href: '/preorder#what-is-who-cards', title: 'About'},
  {href: '/preorder#how-to-play', title: 'How to Play'},
  {href: '/preorder#support-us', title: 'Pricing'},
  {href: '/preorder#faqs', title: 'FAQs'},
  {href: '/preorder#support-us', title: 'Pre-Order Now', button: true},
]
