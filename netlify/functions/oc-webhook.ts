import type {Handler} from '@netlify/functions'
import {serialize} from 'object-to-formdata'
import {env} from '~env-secrets'
import {db, schema, type PurchaseCreate} from '~server/db'
import {graphQLClient, userEmailQuery, type UserWithEmail} from '~server/graphql'
import type {Contribution} from '~types/contributions'

const handledTypes = ['collective.transaction.created']

const handler: Handler = async (event, context) => {
  // validate auth
  const authToken = event.queryStringParameters?.auth_token
  if (authToken !== env.WEBHOOK_AUTH_TOKEN) {
    console.error('INVALID AUTH TOKEN')
    return {statusCode: 401}
  }
  // validate method
  if (event.httpMethod !== 'POST') {
    console.error('INVALID METHOD')
    return {statusCode: 405}
  }

  // validate and parse body
  if (!event.body) {
    console.error('NO BODY')
    return {statusCode: 400}
  }

  console.log('=================')
  console.log('handling webhook')
  console.log(event.body)

  const body = JSON.parse(event.body) as Contribution
  if (!handledTypes.includes(body.type)) {
    console.error('INVALID TYPE')
    return {statusCode: 200}
  }

  // get contribution type
  const {description} = body.data.transaction
  const regex = /\(([^)]+)\)/
  const matches = regex.exec(description)
  const contributionType = matches?.[1] ?? description

  console.log('contributionType', contributionType)

  // get users email
  const user = await graphQLClient.request<UserWithEmail>(userEmailQuery, {
    slug: body.data.fromCollective.slug,
  })
  const email = user.individual.emails[0]

  const purchase: PurchaseCreate = {
    id: body.data.transaction.uuid,
    name: body.data.fromCollective.name,
    slug: body.data.fromCollective.slug,
    email: email,
    price: body.data.transaction.amountInHostCurrency,
    netPrice: body.data.transaction.netAmountInHostCurrency,
    date: new Date(body.data.transaction.createdAt).toISOString(),
    category: contributionType,
    addressProvided: false,
  }

  // add to DB and sheets
  const [dbEntry, sheetEntry] = await Promise.allSettled([
    db.insert(schema.purchase).values(purchase).returning(),
    fetch(env.SHEET_URL, {
      method: 'POST',
      body: serialize(purchase),
    }).then((res) => res.json()),
  ])

  console.log({dbEntry, sheetEntry})

  console.log('=================')
  return {statusCode: 200}
}

export {handler}
