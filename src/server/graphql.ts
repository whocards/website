import {GraphQLClient, gql} from 'graphql-request'
import {env} from '~env-secrets'

export const graphQLClient = new GraphQLClient(env.OC_API_URL, {
  headers: {
    'Personal-Token': env.OC_API_KEY,
  },
})

export type UserWithEmail = {
  individual: {
    id: string
    name: string
    emails: string[]
  }
}

export const userEmailQuery = gql`
  query userEmail($slug: String!) {
    individual(slug: $slug) {
      id
      name
      emails
    }
  }
`

export type OrderId = {
  order: {
    id: string
  }
}

export const orderIdFromLegacyQuery = gql`
  query order($id: Int!) {
    order(legacyId: $id) {
      id
    }
  }
`
