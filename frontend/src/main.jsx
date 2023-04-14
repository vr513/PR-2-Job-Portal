import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  primary:"#E1EDEC",
  blackGray:"#666666"
}
const theme = extendTheme({colors})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>

  </React.StrictMode>,
)
