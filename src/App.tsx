import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountryList from './components/CountryList'

function App() {

  return (
    <>
      <div>
        <h1>Country List</h1>
        <CountryList />
      </div>
    </>
  )
}

export default App
