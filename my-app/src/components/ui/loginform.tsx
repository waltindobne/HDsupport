import { useState, useEffect } from "react"; 
import axios from 'axios'; 
import Link from "next/link"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "./button"; 
 
import { useRouter } from 'next/navigation'; 
import Box from '@mui/material/Box'; 
 
const LoginForm = () => { 
  const router = useRouter(); 
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState(''); 
  
 
  const handleLogin = async (e: any) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post(`https://hd-support-api.azurewebsites.net/api/Usuario/Login?email=${email}&senha=${senha}`);  
       
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
          Login com o Help Desk
        </div>

        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <div className="flex items-center max-sm:w-[380px] justify-center text-neutral-300 dark:bg-slate-300 dark:text-black w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu E-mail" 
              className="border-none h-60px" 
              required
            /> 
            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-at-sign relative right-5 "><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
          </div> 
         
          <div className="flex items-center justify-center max-sm:w-[380px] dark:bg-slate-300 dark:text-black text-neutral-300 w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input

              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Informe sua senha" 
              className="border-none h-60px" 
              required
            /> 
              
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole relative  right-5"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
          </div>

         

          <Button type="submit" className="dark:bg-gradient-to-r  max-sm:w-[380px] dark:from-black dark:to-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-lg w-[500px] h-[50px] mt-10 transition-all ease-in-out duration-1000 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-500 ">
            Login
          </Button>
  
          <div className="text-white relative max-sm:bottom-[0px] text-center mt-3">
            <span className="text-blue-200 font-bold">
              Não possui conta? {" "}
              <Link href="/register" className="text-sky-400 font-bold dark:text-black">
                Registre-se
              </Link>
            </span>
          </div>
        </form>
      </div> 
    </div> 
  ); 
} 
 
export default LoginForm; 