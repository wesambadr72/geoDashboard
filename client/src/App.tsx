import { useState } from 'react'
import { ApiResponse } from 'shared'
import { Button } from './components/ui/button'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {
 return (
  <div className='flex justify-center items-center h-screen w-[100vw]  text-center'>
    <div className='container bg-orange-300/70 my-auto border border-primary p-4 rounded-md text-center'>
    <h1 className='text-primary text-3xl font-bold font-michroma text-center mt-10'>Hello to GeoDashboard</h1> 
  </div>
  </div>
 )
}

export default App
