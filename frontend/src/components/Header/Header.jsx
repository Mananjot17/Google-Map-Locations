import React from 'react'
import GravitiLogo from "../../assets/GravitiLogo.png"

function Header() {
  return (
    <div className='bg-white px-4 py-2 md:px-10 md:py-2'>
        <div>
            <img src={GravitiLogo} alt="GravitiLogo" className='h-10'/>
        </div>
    </div>
  )
}

export default Header