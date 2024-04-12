'use client'
import Dados from "@/components/ui/dados";
import Pizza from "@/components/ui/pizza";
import { useEffect } from "react";
import { useState } from "react";
import SidebarMenu from "@/components/ui/sidebarmenu";

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
        <div className={`${darkMode && "dark"}`}>
            <div className="flex h-[100vh] w-full items-center justify-center space-x-16 dark:bg-slate-50 bg-neutral-950">
               <SidebarMenu /> 
                <div className="w-[80%] border-slate-50 border-2 dark:border-black items-center space-y-2 flex flex-col justify-center rounded-[20px] h-[93vh]">
                    <div className="relative left-5 w-full items-center flex justify-center">
                        <Dados />
                    </div>
                    <div className="w-[52%] relative ">
                        <Pizza />
                    </div>
                </div>
            </div>
        </div>
        
    )
}