import React from 'react';
import SidebarToggle from './NavBar/SidebarToggle';
import NavbarMenu from './NavBar/NavbarMenu';
import { Offline, Online } from "react-detect-offline";

const Navbar: React.FC = () => {
  return (
    <>
        <header className="flex-shrink-0 border-b">
            <div className="flex items-center justify-between p-2">
                {/* Navbar left */}
                <SidebarToggle />
                <div className="text-green-500">
                  <Online>Online</Online>
                </div>
                <div className="text-red-500">
                  <Offline>Offline</Offline>
                </div>
                {/*  Navbar right */}
                <NavbarMenu />
            </div>
        </header>   
    
    </>
  )
}

export { Navbar }