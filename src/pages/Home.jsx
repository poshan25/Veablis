import React from 'react'
import Nav from './Nav'
import UserProducts from './UserProducts'
import Verify from '../components/Verify'
import TabooOrganics from './TabooOrganics'
import User from '../components/User'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
        {/* <Nav/> */}
        {/* <UserProducts/> */}

        <TabooOrganics/>
        <User/>
        <Footer/>
        {/* <Verify/> */}
    </div>
  )
}

export default Home