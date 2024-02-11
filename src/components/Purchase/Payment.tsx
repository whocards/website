import {Elements} from '@stripe/react-stripe-js'
import {loadStripe, type StripeElementsOptionsClientSecret} from '@stripe/stripe-js'
import {useEffect, useState} from 'react'
import {env} from '~env-secrets'
import CheckoutForm from './CheckoutForm'

const stripe = loadStripe(env.PUBLIC_STRIPE_PUBLIC_KEY)

export default function Payment() {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({count: 1}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const options: StripeElementsOptionsClientSecret = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: {
        fontFamily: 'Sohne, system-ui, sans-serif',
        fontWeightNormal: '500',
        borderRadius: '8px',
        colorBackground: '#0A2540',
        colorPrimary: '#EFC078',
        accessibleColorOnColorPrimary: '#1A1B25',
        colorText: 'white',
        colorTextSecondary: 'white',
        colorTextPlaceholder: '#727F96',
        tabIconColor: 'white',
        logoColor: 'dark',
      },
      rules: {
        '.Input, .Block': {
          backgroundColor: 'transparent',
          border: '1.5px solid var(--colorPrimary)',
        },
      },
    },
  }

  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
