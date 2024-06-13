"use client"
import { useState, useEffect } from "react"; 
import axios from 'axios'; 
import Link from "next/link"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "./button"; 
 
import { useRouter } from 'next/navigation'; 
import Box from '@mui/material/Box'; 
 
const ConfirmarEmail = () => { 
  const router = useRouter(); 
  const [novaSenha, setNovaSenha] = useState(''); 
  const [confirmarSenha, setConfirmarSenha] = useState(''); 
  
 
  const handleLogin = async (e: any) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post(`https://localhost:7299/api/Usuario/Login?email=${email}&senha=${senha}`);  
       
      // Extract token from response body 
      const token = response.data.token; 
   
      // Save token to local storage 
      localStorage.setItem('token', token); 
       
      // Logic to redirect user after successful login 
      console.log('Login successful:', response.data); 
      router.push('/dashmenu'); // Example of redirecting after successful login 
    } catch (error) {  
      console.error('Error logging in:', error);  
    }  
  }; 
  
  const esqueceuSenha = () => {
    router.push('/recuperacao')
  }
 
  const [darkMode, setDarkMode] = useState(false);  
 
  const toggleDarkMode = () => {  
    const newMode = !darkMode; 
    setDarkMode(newMode); 
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled'); 
  }; 
 
  useEffect(() => { 
    const storedMode = localStorage.getItem('darkMode'); 
    if (storedMode === 'enabled'){ 
      setDarkMode(true); 
    } 
  }, []); 
 
  return ( 
    <div className={`${darkMode && "dark"}`}> 
      <div className="flex flex-col bg-black h-[100vh] justify-center items-center">
        <div className="text-white flex text-center text-3xl font-bold mb-3 dark:text-black">
		Enviar email de confirmação
        </div>

        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <div className="flex items-center max-sm:w-[380px] justify-center text-neutral-300 dark:bg-slate-300 dark:text-black w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input 
              type="email"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Informe seu email" 
              className="border-none h-60px" 
              required
            /> 
            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-at-sign relative right-5 "><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
          </div> 

          <Button type="submit" className="dark:bg-gradient-to-r  max-sm:w-[380px] dark:from-black dark:to-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-lg w-[500px] h-[50px] mt-6 transition-all ease-in-out duration-1000 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-500 ">
            Confirmar
          </Button>
        </form>
      </div> 
    </div> 
  ); 
} 
 
export default ConfirmarEmail; 