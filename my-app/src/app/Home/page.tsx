"use client"
import Grafico from "../../components/ui/grafico"; 
import { useEffect, useState } from "react"; 
import { CircleGauge, Moon, Rocket, ShieldCheck, Sun } from "lucide-react"; 
import Header from '@/components/ui/header' 
import TextContent from "@/components/ui/textcontent"; 
 
export default function Content() { 
   
  const [darkMode, setDarkMode] = useState(false);  
  
  const toggleDarkMode = () => {  
    setDarkMode(!darkMode);  
 
    const newMode = !darkMode; 
 
    setDarkMode(newMode); 
 
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled') 
  }  
 
  useEffect(() => { 
    const storedMode = localStorage.getItem('darkMode'); 
    if (storedMode === 'enabled') { 
      setDarkMode(true); 
    } 
  }, []); 
 
  return ( 
    <div className="h-screen overflow-hidden">  
      <Header />  
      <div className="flex justify-around items-center max-w-[90%] mb-10 flex-wrap w-[100%] border-2 max-sm:h-[500px] border-slate-50 rounded-[20px] bg-neutral-950 dark:border-neutral-950 dark:bg-slate-50 h-[75vh] m-auto mt-5" style={{ overflow: "hidden" }}> 
        <div className="flex justify-around items-center flex-wrap max-w-[90%]"> 
          <div className="flex items-center justify-around flex-col max-w-[50%]"> 
            <h1 className="text-slate-50 max-sm:mb-20 max-sm:text-[20px] max-sm:w-[350px]  max-sm:text-center dark:text-neutral-950 text-[30px] w-[100%] font-black md:w-[500px]"> 
              <span className="rounded-[20px] "> 
                <span className=" bg-gradient-to-r from-cyan-500 to-blue-700 inline-block text-transparent bg-clip-text ">Bem-vindo ao</span> 
              </span> Help Desk. Simplificando o Gerenciamento de Recursos Empresariais 
            </h1> 
            <h1 className="text-[15px] max-sm:w-[350px] max-sm:left-[3px] max-sm:text-[15px] rounded-br-[20px] border-slate-50 border-2 rounded-l-[20px] solid p-[20px] relative right-[50px] bg-blue-700 dark:border-neutral-950 text-slate-200  w-[90%] md:w-[500px] md:ml-20 md:mt-10"> 
              Mantenha controle total sobre todos os funcionários da Employer. Do inventário à manutenção, o Help Desk permite que você acompanhe e gerencie cada dispositivo de forma eficiente. 
            </h1> 
          </div> 
          <div className="flex max-sm:hidden items-center max-w-[500px] rounded-[30px] justify-center"> 
            <Grafico /> 
          </div> 
        </div> 
      </div> 
    </div>
  ); 
}