'use client'
import { React, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TextField, MagnifyingGlassIcon, Button } from '@radix-ui/themes'
import { FaBox, FaPlus } from "react-icons/fa6";
import ModalProject from '@/components/ModalProject.jsx';

import data from '@/DB/projects.json'

export default function SideBar({ sendProjectsData }) {

  const router = useRouter()

  const [projects, setProjects] = useState(data.proyectos)
  const [focus, setFocus] = useState(null)
  const [togleFocus, setTogleFocus] = useState(false)
  const [toggleModal, setToggleModal] = useState(false);

  const handleFocus = (index) => {
    setTogleFocus(!togleFocus)
    setFocus(index)
    
  }

  const handleOpenModal = () => {
    setToggleModal(true);
    console.log(toggleModal);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
  };

  return (
    <nav className="flex flex-col w-80 h-screen border-r  text-gray-700 p-2 gap-10" >
      <div className="flex items-center  h-24 gap-5 border-b border-1 border-hray-500">
        <picture>
          <source srcSet="/logo.png" type="image/png" />
          <img className="w-[60px]" src="/logo.png" alt="logo" />
        </picture>
        <div className='flex flex-col '>
          <h1 className=" text-2xl text-foreground">Steven Victoria</h1>
          <h1 className="text-1xl text-foreground">Desarrollador</h1>
        </div>

      </div>

      <div className='flex-1 flex flex-col gap-2'>

        <div className='flex justify-between'>
          <span className='text-foreground'>Proyectos</span>
          <button onClick={()=> handleOpenModal()}  className='p-1 rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground'><FaPlus /></button>
        </div>
        <div>

          <TextField.Input size={'3'} placeholder="Search the docs…" color='ruby' />

        </div>
        <ul className="pt-2 flex flex-col gap-2 cursor-pointer">
          {
            projects.map((project, index) => (
              <li
                key={index}
                onClick={() => {
                  sendProjectsData(project);
                  handleFocus(index);
                }}
                className={`flex items-center gap-2 p-2 border border-1 ${focus === index ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} hover:bg-primary hover:text-primary-foreground rounded-md`}
              > <FaBox />
                {project.nombre}
              </li>

            ))
          }
        </ul>

      </div>

      <button

        onClick={() => { router.push('/auth/login') }}
        className='cursor-pointer p-2 bg-primary text-primary-foreground rounded-md'>
        Cerrar Sesion

      </button>



      <ModalProject openModal={toggleModal} closeModal={handleCloseModal}/>


    </nav>
  )
}
