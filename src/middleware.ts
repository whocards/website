import {defineMiddleware} from 'astro:middleware'
import {getRandomQuestionId} from '~utils/gameplay-server'

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname === '/play') {
    return context.redirect(context.url.origin + '/en/question/' + getRandomQuestionId())
  }

  if (context.url.pathname.endsWith('/play')) {
    return context.redirect(
      context.url.origin +
        context.url.pathname.replace('play', 'question') +
        '/' +
        getRandomQuestionId()
    )
  }

  return next()
})
