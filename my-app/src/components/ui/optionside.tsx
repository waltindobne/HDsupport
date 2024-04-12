'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
const Optionside: React.FC<{ title: string; svg: React.FC, path: string}> = ({ title, svg: Icon, path }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false)
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
      <div onClick={() => router.push(path)} className="flex dark:border-black cursor-pointer space-x-3 mt-3 w-[full] border-2 justify-center rounded-[10px] items-center border-slate-50 text-white p-[10px]">
        <Icon/>
        <h1  className="text-white  dark:text-black w-[100px] font-bold">{title}</h1>  
      </div>
    </div>
    
  );
}

export default Optionside;