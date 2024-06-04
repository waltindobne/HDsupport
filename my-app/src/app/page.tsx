"use client"
import Header from "@/components/ui/header";
import Content from "@/app/Home/page";
import TextContent from "@/components/ui/textcontent";
import { useEffect, useState } from "react";
import { CircleCheck, CircleGauge, Moon, Rocket, ShieldCheck, Sun } from "lucide-react";

export default function Home() {
 
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
  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="Home dark:bg-slate-50 bg-neutral-950 h-[100vh]
      ] w-[100%] items-center flex-col justify-center">
        <Content />
          {/*<button onClick={toggleDarkMode} className="ml-5 text-center flex justify-center items-center absolute w-10 h-10 bottom-16 right-26 bg-white text-dark dark:text-white dark:bg-neutral-900 rounded-full"> 
            {darkMode ? <Sun/> : <Moon/>} 
          </button> */}
      </div>
    </div>
    
  );
}
