import { React, useEffect, useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import { TextField, TextArea, Button } from '@radix-ui/themes'
export default function ModalProject(props) {

  const { openModal, closeModal } = props;
  const [isOpenModal, setisOpenModal] = useState(openModal);

  useEffect(() => {
    setisOpenModal(openModal);
  }, [openModal])

  return (

    <>
      {

        isOpenModal &&
        <div className='z-10 absolute left-0 top-0 w-full h-full flex items-center justify-center backdrop-blur-sm'>
          <article className='z-20 flex flex-col p-2 items-center w-[650px] h-[430px] bg-background border-[2px] border-primary rounded-lg shadow-lg '>
            <div className='relative w-full flex flex-col justify-center items-center p-5'>

              <button className='text-2xl absolute right-4 top-2' onClick={() => closeModal()}><FaXmark /></button>

              <span className='text-3xl font-bold text-foreground '>Agregar Proyecto</span>
              <form className=' flex flex-col p-5 gap-2 w-full' action="">
                <label className='font-bold text-foreground' htmlFor="">Nombre del Proyecto:</label>
                <input className='border p-2 rounded-md text-foreground' type="text" />
                
                <label className='font-bold text-foreground' htmlFor="">Desarrolladores:</label>
                <input className='border p-2 rounded-md text-foreground' type="text" />
                <label className='font-bold text-foreground' htmlFor="">Descripcion del Proyecto:</label>
                <textarea className='rounder-md p-2 border' name="" id="" ></textarea>
                <Button size={'3'} color='ruby'>Confirmar</Button>
              </form>



            </div>
          </article>
        </div>

      }
    </>

  )
}
