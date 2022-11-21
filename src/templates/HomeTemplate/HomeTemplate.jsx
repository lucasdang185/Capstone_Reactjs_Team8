import React from 'react'
import HeaderHome from '../../Components/HeaderHome/HeaderHome'
import FooterHome from '../../Components/FooterHome/FooterHome'
import {Outlet} from 'react-router-dom'
export default function HomeTemplate() {
  return (
    <div>
        <HeaderHome/>
        <Outlet></Outlet>
        <FooterHome/>
    </div>
  )
}
