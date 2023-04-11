import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Auth from './screens/Auth'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Auth />
  )
}

export default App
