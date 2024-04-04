'use client'
import { React, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { auth } from '../app/api/services/firebase.js';
import { TextField, MagnifyingGlassIcon, Button } from '@radix-ui/themes'
import { FaBox, FaPlus } from "react-icons/fa6";
import ModalProject from '@/components/ModalProject.jsx';
import data from '@/DB/projects.json'
import { FaMagnifyingGlass } from "react-icons/fa6";


export default function SideBar({ sendProjectsData }) {

  const userDisplayName = Cookies.get('userDisplayName');
  const userEmail = Cookies.get('userEmail');
  const userPhotoUrl = Cookies.get('userPhotoUrl');
  const userScreenName = Cookies.get('userScreenName');

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

  const handleDeleteCookie = () => {
    Cookies.remove('userToken');
    Cookies.remove('userDisplayName');
    Cookies.remove('userPhotoUrl');
    Cookies.remove('userEmail');
    Cookies.remove('userScreenName');
    router.push('/auth/login');
  }

  const logout = async () => {
    try {
      await auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout Error:', error.message);
      alert(error.message);
    }
  }

  return (
    <nav className="flex flex-col w-76 h-screen border-r bg-secondary text-gray-700 px-4 pb-2 gap-10" >
      <div className="flex items-center  h-24 gap-3 border-b border-1 border-hray-500">

        <picture>
          <img className="w-[60px] rounded-md shadow-lg" src={userPhotoUrl} alt="" />
        </picture>

        <div className='flex flex-col '>
          <h1 className=" text-2xl text-foreground font-bold ">{userDisplayName}</h1>
          <h1 className="text-1xl text-foreground ">Desarrollador</h1>
        </div>

      </div>

      <div className='flex-1 flex flex-col gap-2'>

        <div className='flex justify-between'>
          <span className='text-foreground'>Proyectos</span>
          <button onClick={() => handleOpenModal()} className='p-1 rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground'><FaPlus /></button>
        </div>

        <div className='flex relative w-ful'>
          <FaMagnifyingGlass className='absolute left-2 top-3 text-foreground' />
          <input
            type="text"
            placeholder="Buscar Proyecto"
            className='pl-[32px] pr-2 py-2 text-foreground w-full rounded-md'
          />


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

        onClick={handleDeleteCookie}
        className='cursor-pointer p-2 bg-primary text-primary-foreground rounded-md'>
        Cerrar Sesion

      </button>



      <ModalProject openModal={toggleModal} closeModal={handleCloseModal} />


    </nav>
  )
}
