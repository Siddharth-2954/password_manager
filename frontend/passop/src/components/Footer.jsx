import React from 'react'

function Footer(){
    return(
        <div className='flex flex-col justify-center items-center'>
            <div className='text-2xl flex justify-center fixed bottom-0 bg-purple-100 w-full p-1'>
                <div className='px-16 text-green-900'>
                <span>&lt;</span>
                <span className='text-black'>Pass</span>
                <span>Manager/</span>
                <span>&gt;</span>
                </div>
                <div>Created by D23IT177 Bharadia Siddharth</div>
            </div>
        </div>
    );
};

export default Footer;