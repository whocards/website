import {donationUrl, websiteNextUrl} from './urls'

export type Link = {
  href: string
  title: string
  button?: boolean
  icon?: string
  play?: boolean
  external?: boolean
}

export const mainLinks: Link[] = [
  {href: '/#what-is-whocards', title: 'About'},
  {href: '/play', title: 'Play', play: true},
  {href: '/print', title: 'Print'},
  {href: donationUrl, title: 'Donate', external: true},
  {href: '/#support-us', title: 'Order Now', button: true},
]

export const preorderLinks: Link[] = [
  {href: '/#what-is-whocards', title: 'About'},
  {href: '/#how-to-play', title: 'How to Play'},
  {href: '/#support-us', title: 'Pricing'},
  {href: '/#faqs', title: 'FAQs'},
  {href: '/#support-us', title: 'Order Now', button: true},
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

export const legalLinks: Link[] = [
  {title: 'Contact', href: '/contact'},
  {title: 'Privacy Policy', href: '/legal/pp'},
  {title: 'Login', href: websiteNextUrl},
]
