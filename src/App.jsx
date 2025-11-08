import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className='h-screen  flex flex-col justify-center items-center gap-10'>
      <Outlet></Outlet>
    </div>
    
  )
}
