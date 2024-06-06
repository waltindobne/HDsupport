'use client'
import { useEffect, useState } from "react";

const CardChamados: React.FC <{title: string; dados: number;}> = ({title, dados}) => {

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
        <div className="flex flex-col w-full">
             <div className="w-[370px] max-[1400px]:w-[300px] p-[10px] rounded-[10px] dark:border-black border-2 border-slate-50 space-y-3 h-[100px] bg-black dark:bg-white max-[1000px]:w-full max-[600px]:w-full">
                <h1 className="text-slate-50 dark:text-black">Chamados <b className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:text-black font-bold inline-block text-transparent bg-clip-text">{title}</b></h1>
                <h1 className="text-slate-50 font-bold text-[20px] dark:text-black">{dados}</h1>
            </div>
    </div>
    );
}


export default CardChamados;