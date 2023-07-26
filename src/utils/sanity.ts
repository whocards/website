import {useSanityClient, groq} from 'astro-sanity'

export const usePagesCMS = async () => await useSanityClient().fetch(groq`*[_type == "page"]`)

export const usePageLinksCMS = async () =>
  await useSanityClient().fetch(
    groq`*[_type == "page" && includeInMenu]{title, "href": url.current}`
  )
