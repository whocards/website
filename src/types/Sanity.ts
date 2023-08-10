export interface SanityPage {
  _createdAt: string
  _rev: string
  _type: string
  textSections: TextSection[]
  _updatedAt: string
  image: Image
  includeInMenu: boolean
  _id: string
  title: string
  url: {
    current: string
  }
}

export interface TextSection {
  image?: Image
  _type: string
  imageLayoutSmall: 'top' | 'bottom'
  imageLayout: 'top' | 'left' | 'bottom' | 'right'
  _key: string
  paragraphs: string[]
  title: string
}

export interface Image {
  asset: Asset
  _type: string
  alt: string
}

export interface Asset {
  _ref: string
  _type: string
}
