'use client'
import React, { useState, useEffect } from 'react'
import SideBar from '@/components/SideBar.jsx'
import PanelTest from '@/components/PanelTest'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Page() {
  const [projectsData, setProjectsData] = useState(null)
  const router = useRouter()
  const [userToken, setUserToken] = useState(null)

  useEffect(() => {
    const token = Cookies.get('userToken')
    setUserToken(token)
    if (!token) {
      router.push('/auth/login')
    }
  }, [])

  const extractProjects = (data) => {
    setProjectsData(data)
  }

  return (
    userToken ? (
      <main className='flex'>
        <SideBar sendProjectsData={extractProjects} />
        <PanelTest projectData={projectsData} />
      </main>
    ) : null
  )
}
