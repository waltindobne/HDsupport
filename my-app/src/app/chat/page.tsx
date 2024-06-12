'use client'
import Dados from "@/components/ui/dados";
import Pizza from "@/components/ui/pizza";
import { useEffect } from "react";
import { useState } from "react";
import SidebarMenu from "@/components/ui/sidebarmenu";
import SidebarMenuResponse from "@/components/ui/sidebarmenuResponse";
import MenuChat from "@/components/ui/sideMenuChamados";
import Chat from "@/components/ui/chat";

export default function Graficos(){
    const [darkMode, setDarkMode] = useState(false); 
 
    const toggleDarkMode = () => { 
        setDarkMode(!darkMode); 

        const newMode = !darkMode;

        setDarkMode(newMode);

        localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled')
    } 

    useEffect(() => {

      const storedMode = localStorage.getItem('darkMode');
      if (storedMode === 'enabled'){
        setDarkMode(true);
      }
    },

    []);

    
    return(
        <div className="">
            <div className="flex h-[98vh] w-full items-start space-x-16 dark:bg-slate-50 bg-neutral-950 pr-[50px] max-[820px]:space-x-2 max-[820px]:pr-2 max-[820px]:flex-col max-[820px]:items-center">
               <SidebarMenu /> 
               <SidebarMenuResponse />
                <div className="w-full border-slate-50 mt-[20px] border-2 dark:border-black flex rounded-[20px] h-[93vh]">
                    <Chat/>
                </div>
            </div>
        </div>
        
    )
}