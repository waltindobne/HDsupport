'use client'
import { useEffect, useState } from "react";
export default function Loading(){
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
            <div className="bg-neutral-950 dark:bg-slate-50 h-[100vh] w-[100%] flex items-center justify-center">
                <div className="h-[100px] bg-transparent flex items-center justify-center w-full">
                <div className="loading-wave bg-transparent">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                </div>
                </div>
            </div>
        </div>
    );
}