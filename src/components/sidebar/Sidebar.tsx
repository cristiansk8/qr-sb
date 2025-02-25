'use client'
import React from 'react'
import Image from 'next/image'
import { IoLogoReact, } from "react-icons/io5"
import { SidebarMenuItem } from './SidebarMenuItem';
import { MdOutlineSkateboarding } from "react-icons/md";
import { IoQrCode } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import Link from 'next/link';


const menuItems = [
  {
    path: '/dashboard/user/profile',
    icon: <MdOutlineSkateboarding size={40} />,
    title: 'Perfil',
    subTitle: 'editar perfil'
  },
  {
    path: '/dashboard/user/qerres',
    icon: <IoQrCode size={40} />,
    title: 'QRs',
    subTitle: 'Generados'
  },
]


export const Sidebar = () => {
  const { data: session, status } = useSession();


  return (
    <div id="menu"
      className="bg-gray-900 min-h-auto lg:min-h-screen z-10 text-slate-300 w-full max-w-[400px] left-0 overflow-y-auto md:w-64">

      {/* Logo y Título */}

      <div id="logo" className="my-4 px-4 md:px-6 cursor-pointer">
        <Link href="/">
          <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
            <IoLogoReact className="text-blue-500 w-6 h-6 md:w-8 md:h-8 mr-2" />
            <span>Qerre</span>
            <span className="text-blue-500">2025</span>
          </h1>
        </Link>
      </div>


      {/* Perfil del usuario */}
      <div id="profile" className="px-4 md:px-6 py-6 md:py-10">
        <p className="text-slate-500 text-sm md:text-base">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          {status === "loading" ? (
            <p>Cargando...</p> // Evita errores de hidratación
          ) : (
            <>
              <Image
                className="rounded-full w-10 h-10 md:w-12 md:h-12"
                src={session?.user?.image || "/logo.png"}
                alt="User avatar"
                width={50}
                height={50}
              />
              <span className="text-sm md:text-base font-bold">
                {session?.user?.name}
              </span>
            </>
          )}
        </a>
      </div>

      {/* Menú de navegación */}
      <div id="nav" className="w-full px-4 md:px-6">
        {menuItems.map(item => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>

  )
}
