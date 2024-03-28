import React from 'react'

function Navbar(){
    return(
        <nav className='bg-purple-200'>
            <div className='px-80 flex justify-between items-center h-12'>

            <div className="logo font-bold">
                <span className='text-green-800'>&lt;</span>
                Pass 
                <span className='text-green-800'>Manager/&gt;</span>
            </div>
            <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold' href="/">Home</a>
                    <a className='hover:font-bold' href="/">About</a>
                    <a className='hover:font-bold' href="/">Contact</a>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;