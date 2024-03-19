'use client'
import {React, useState} from 'react'
import SideBar from '@/components/SideBar.jsx'
import PanelTest from '@/components/PanelTest'
export default function page() {

  const [projectsData, setProjectsData] = useState()


  const extractProjects = data => {
    setProjectsData(data)  
   
  }

  return (
    <main className='flex'>
        <SideBar sendProjectsData={extractProjects} />
        <PanelTest projectData={projectsData} />
    </main>
  )
}
