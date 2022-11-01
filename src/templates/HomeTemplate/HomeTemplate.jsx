import React from 'react'
import HeaderHome from '../../Components/HeaderHome/HeaderHome'
import {Outlet} from 'react-router-dom'
export default function HomeTemplate() {
  return (
    <div>
        <HeaderHome/>
        <Outlet></Outlet>
        <footer className='bg-dark text-white p-5 text-center'>Footer</footer>
    </div>
  )
}
