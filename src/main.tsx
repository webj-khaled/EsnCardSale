// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Elements } from '@stripe/react-stripe-js'; // 1. Import Elements
import stripePromise from './stripe'; // 2. Import the stripe promise you created
import App from './App'
import './index.css'

// Add this console.log to verify the script is running
console.log('React app is loading...')

// Make sure you're selecting the correct root element
const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      {/* 3. Wrap your App with Elements provider */}
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </StrictMode>
  )
} else {
  console.error('Failed to find root element')
}