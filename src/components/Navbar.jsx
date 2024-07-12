import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} height='20px' width='20px' className='navbar_logo'></img>
      {/* <link>Home</link> */}
      <div className='navbar_text_2'><Link to='/' style={{color:'#FFD700'}}>Home</Link></div>
      <a className='navbar_text_1' href='https://www.linkedin.com/in/siddharth-mishra03/'>About Me</a>
      <a className='navbar_text_3' href=''>Something</a>
      
    </div>
  )
}

export default Navbar;