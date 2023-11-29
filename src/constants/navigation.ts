export type Link = {
  href: string
  title: string
  button?: boolean
  icon?: string
}

export const mainLinks: Link[] = [
  {href: '/', title: 'Home'},
  {href: '/mission', title: 'Mission'},
  {href: '/print', title: 'Print'},
  {href: '/gift', title: 'Order Now', button: true},
]

export const preorderLinks: Link[] = [
  {href: '/gift#what-is-whocards', title: 'About'},
  {href: '/gift#how-to-play', title: 'How to Play'},
  {href: '/gift#support-us', title: 'Pricing'},
  {href: '/gift#faqs', title: 'FAQs'},
  {href: '/gift#support-us', title: 'Order Now', button: true},
]

export const socialLinks: Link[] = [
  {icon: 'mdi:linkedin', title: 'Linkedin', href: 'https://www.linkedin.com/company/whocards'},
  // { icon: 'mdi:twitter', href: 'https://twitter.com/whocards' },
  {icon: 'entypo-social:facebook', title: 'Facebook', href: 'https://facebook.com/whocards'},
  {icon: 'mdi:instagram', title: 'Instagram', href: 'https://instagram.com/who_cards'},
]

export const contactLinks: Link[] = [
  ...socialLinks,
  {icon: 'mdi:email', title: 'Email', href: 'mailto:hello@whocards.cc'},
  {icon: 'mdi:github', title: 'Github', href: 'https://github.com/whocards'},
]

export const legalLinks: Link[] = [{title: 'Privacy Policy', href: '/legal/pp'}]
