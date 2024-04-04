'use client'
import { TextField, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { auth } from '../../api/services/firebase.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function page() {

    const [credentials, setCredentials] = useState({
        displayName: '',
        screenName: '',
        email: '',
        password: ''
    })
    const router = useRouter()


    const changeUser = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    const registerUser = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password
            );
            await updateProfile(user.user, {
                displayName: credentials.displayName,
                screenName: credentials.screenName,
                photoURL: 'https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712102400&semt=ais' // Aquí puedes elegir qué campo deseas para screenName
            });
            console.log('User', user)
            router.push('/auth/login')
        }
        catch (error) {
            console.log('Error', error)
        }
    }

    return (
        <div className='h-screen w-screen text-white flex flex-col items-center justify-center'>
            <div className='flex flex-col w-[500px] p-[10px] gap-[20px]'>
                <picture className='flex justify-center items-center'>
                    <source srcSet="/logo.png" type="image/png" />
                    <img className='w-[300px]' src="/logo.png" alt="logo" />
                </picture>
                <div className='w-full flex justify-between gap-4'>

                    <input className='w-1/2 border p-2 rounded-md text-foreground' required name='displayName' type="text" placeholder='Nombre y Apellido' onChange={changeUser} />
                    <input className='w-1/2 border p-2 rounded-md text-foreground' required name='screenName' type="text" placeholder='Usuario' onChange={changeUser} />

                </div>

                <input className='border p-2 rounded-md text-foreground' required name='email' type="text" placeholder='Correo' onChange={changeUser} />
                <input className='border p-2 rounded-md text-foreground' required name='password' type="password" placeholder='Contrasena' onChange={changeUser} />

                <Button
                    onClick={registerUser}
                    type='submit'
                    className='cursor-pointer'
                    variant="solid"
                    color='ruby'
                    size={'3'}>

                    Registrarse

                </Button>



            </div>


        </div>
    )
}
