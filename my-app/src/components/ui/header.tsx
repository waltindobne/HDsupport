"use client"
import '@/components/ui/header.css'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { CircleGauge, Moon, Rocket, ShieldCheck, Sun } from "lucide-react";
import { Button } from "./button";

export default function Header(){

    const router = useRouter();

    const handleLogin = () =>{
        router.push("/login");
    }
    const handleToDash = () => {
        router.push("dashmenu");
    }
    const handleNavigation = () =>{

        router.push("/");
    }
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
        <div className={`${darkMode && "dark"}`} >
            <div className="Header space-x-1 flex items-center justify-center w-[100%]">
            <header className="w-[80%] border-2 max-sm:justify-between max-sm:w-[80%]  h-[60px] items-center rounded-[20px] mt-5 justify-around  p-[35px] flex dark:border-neutral-950 bg-neutral-950 dark:bg-slate-50">
                <div className="text-neutral-950  justify-start flex items-start relative max-sm:left-0 left-10">
                    <Button className='bg-neutral-950 dark:bg-slate-50  text-slate-50 dark:text-neutral-950  border-none outline-none shadow-none' onClick={handleNavigation}><h1 className='text-[30px] font-black bg-trasparent w-[125px] '>Help desk</h1></Button>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rocket-takeoff text-slate-50 dark:text-neutral-950 relative bottom-1" viewBox="0 0 16 16">
                        <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"/>
                        <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z"/>
                        <path d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                    </svg>
                </div>
                <div className="text-slate-50 dark:text-neutral-950 space-x-3 flex items-center">
                    <div className='sign  dark:text-slate-50 bg-neutral-950 w-[100px] h-[30px] flex item-center justify-center rounded-[6px] cursor-pointer text-white hover:bg-slate-50 hover:border-2 hover:border-neutral-950 hover:text-neutral-950 outline-none'>
                        <button onClick={handleLogin} >Login</button>
                    </div>
                    
                        <button onClick={handleToDash} >Dashmenu</button>
                    
                </div>
            </header>
            </div>
            <button onClick={toggleDarkMode} className="ml-5 text-center flex justify-center items-center absolute w-10 h-10 bottom-16 right-26 bg-white text-dark dark:text-white dark:bg-neutral-900 rounded-full"> 
        {darkMode ? <Sun/> : <Moon/>} 
      </button> 
        </div>
        
    );
}