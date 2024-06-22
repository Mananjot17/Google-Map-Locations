import React from 'react'
import Container from './components/Container/Container.jsx'
import Header from './components/Header/Header.jsx'



function App() {

  return (
    <div className="flex flex-col h-screen">
    <Header />
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <Container />
    </div>
  </div>
  )
}

export default App
