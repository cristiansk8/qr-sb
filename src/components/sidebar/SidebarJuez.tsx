import React from 'react'
import Image from 'next/image'
import { IoLogoReact, IoBrowsersOutline, IoCalculator, IoFootball, IoHeartOutline } from "react-icons/io5"
import { SidebarMenuItem } from './SidebarMenuItem';
import { MdOutlineSkateboarding } from "react-icons/md";
import { GiSkateboard } from "react-icons/gi";
import { GiTrophy } from "react-icons/gi";





const menuItems = [
    {
        path: '/dashboard/jueces/profile',
        icon: <MdOutlineSkateboarding size={40} />,
        title: 'Perfil',
        subTitle: 'editar perfil'
    },
    {
        path: '/dashboard/jueces/calificate',
        icon: <GiSkateboard size={40} />,
        title: 'Trucos',
        subTitle: 'calificar trucos'
    }
]


export const SidebarJuez = () => {

    return (
        <div id="menu"
            style={{ width: '400px' }}
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64  left-0  overflow-y-scroll">

            <div id="logo" className="my-4 px-6">
                <h1 className="flex text-lg md:text-2xl font-bold text-white">
                    <div className='px-2'>
                        <IoLogoReact />
                    </div>
                    <span>Trickest</span>
                    <span className="text-blue-500">2024 Jueces</span>.</h1>
                <p className="text-slate-500 text-sm">Patina, graba y postea</p>
            </div>

            <div id="profile" className="px-6 py-10">
                <p className="text-slate-500">Bienvenido,</p>
                <a href="#" className="inline-flex space-x-2 items-center">
                    <span>
                        <Image className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
                            alt="User avatar"
                            width={50}
                            height={50} />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        Edward Tompson
                    </span>
                </a>
            </div>


            <div id="nav" className="w-full px-6">
                {
                    menuItems.map(item => (
                        <SidebarMenuItem key={item.path} {...item} />
                    ))
                }

            </div>
        </div>
    )
}
