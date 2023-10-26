import {z} from 'zod'

export const thankYouFormSchema = z.object({
  privacy: z
    .literal('on', {errorMap: () => ({message: 'Field is required'})})
    .pipe(z.preprocess((val) => !!val && val === 'on', z.boolean())),
  newsletter: z.preprocess((val) => !!val && val === 'on', z.boolean()).optional(),
})
