import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditProfile() {
    const location = useLocation()
    const [fullName, setFullName] = useState();
    const [pNumber, setpNumber] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    return (
        <div className='flex flex-col'>
            <form className='flex flex-col m-4'>
                <input type="text" onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" required />
                <input type="text" onChange={(e) => setpNumber(e.target.value)} placeholder="Enter phone number" minLength={10} maxLength={10} />
                <input type="email" defaultValue={email} placeholder="Enter your email" disabled />
                <textarea placeholder='Enter your address'></textarea>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>Submit</button>
            </form>
        </div >
    )
}