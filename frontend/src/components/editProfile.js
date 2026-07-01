import React from 'react'

export default function EditProfile() {
    return (
        <div className='flex flex-col'>
            <form className='flex flex-col m-4'>
                <input type="text" placeholder="Enter your name" required />
                <input type="text" placeholder="Enter phone number" minLength={10} maxLength={10} />
                <input type="email" placeholder="Enter your email" disabled />
                <textarea placeholder='Enter your address'></textarea>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>Submit</button>
            </form>
        </div >
    )
}