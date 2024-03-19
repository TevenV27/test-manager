'use client'
import { TextField, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { auth } from '../../api/services/firebase.js'
export default function page() {
 
  const router = useRouter()
  console.log("Verify",auth.config)
  return (
    <div className='h-screen w-screen text-white flex flex-col items-center justify-center'>


      <div className='flex flex-col w-[500px] bg-white p-[10px] gap-[20px]'>
        <picture className='flex justify-center items-center'>
          <source srcSet="/logo.png" type="image/png" />
          <img className='w-[300px]' src="/logo.png" alt="logo" />
        </picture>
        
          <input className='border p-2 rounded-md text-black' type="text" placeholder='Ingresa tu correo' />
          <input className='border p-2 rounded-md text-black' type="password" placeholder='Ingresa tu contrasena' />
          <Button
            onClick={() => { router.push('/board') }}
            type='submit'
            className='cursor-pointer'
            variant="solid"
            color='ruby'
            size={'3'}>

            Iniciar Sesion

          </Button>
        


      </div>


    </div>
  )
}
