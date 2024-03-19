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
          <article className='z-20 flex flex-col p-2 items-center w-[650px] h-[430px] bg-white border-[2px] border-[#e44465] rounded-lg shadow-lg '>
            <div className='relative w-full flex flex-col justify-center items-center p-5'>

              <button className='text-2xl absolute right-4 top-2' onClick={() => closeModal()}><FaXmark /></button>

              <span className='text-3xl font-bold '>Agregar Proyecto</span>
              <form className=' flex flex-col p-5 gap-2 w-full' action="">
                <label className='font-bold' htmlFor="">Nombre del Proyecto:</label>
                <TextField.Input color='ruby' size={'3'}  />
                <label className='font-bold' htmlFor="">Desarrolladores:</label>
                <TextField.Input color='ruby' size={'3'} />
                <label className='font-bold' htmlFor="">Descripcion del Proyecto:</label>
                <TextArea color='ruby' className='mb-[5px]'/>
                <Button size={'3'} color='ruby'>Confirmar</Button>
              </form>



            </div>
          </article>
        </div>

      }
    </>

  )
}
