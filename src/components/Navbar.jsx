import React from 'react'
import logo from '../assets/logo.svg'

const Navbar = () => {
    return (
        <div className='logo bg-slate-700 h-16 w-full flex items-center text-white px-20 justify-between'>
            <span className='text-xl flex items-center gap-2'>
                <img src={logo} alt="logo" width={40} />
                KeyShield
            </span>
            <div className='menu'>

                <lord-icon
                    src="https://cdn.lordicon.com/ipnwkgdy.json"
                    trigger="hover"
                    colors="primary:#ffffff">
                </lord-icon>

            </div>

            <div className='navlinks flex gap-4'>
                <a href="https://shiv-chauhan.netlify.app/" target='_blank' className='nav-link'>About Developer</a>
                <a href="https://github.com/shivchauhan795/KeyShield" className='nav-link'>Contribute</a>
            </div>
        </div>
    )
}

export default Navbar
