import {useSanityClient, groq, createImageBuilder} from 'astro-sanity'
import type {SanityPage} from '~types/Sanity'

export const usePagesCMS = async (): Promise<SanityPage[]> =>
  await useSanityClient().fetch(groq`*[_type == "page"]`)

export const usePageLinksCMS = async () =>
  await useSanityClient().fetch(
    groq`*[_type == "page" && includeInMenu]{title, "href": '/' + url.current}`
  )

// @ts-ignore
export const imageBuilder = createImageBuilder(useSanityClient())

export const urlForImage = (source: any) => imageBuilder.image(source)
