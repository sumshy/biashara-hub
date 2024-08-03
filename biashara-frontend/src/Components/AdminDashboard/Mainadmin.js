import React from 'react'
import SideNav from './SideNav'
import TopA from './TopA'
import Mainpage from './Mainpage'

function Mainadmin() {
  return (
    <div className='dashboard-container'>
     <SideNav/>
        <div className="main-content">
            <TopA/>
            <br></br>
            <Mainpage/>
        </div>
    </div>
  )
}

export default Mainadmin