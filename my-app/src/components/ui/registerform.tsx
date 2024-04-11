'use client'
import "./styles.scss";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import Link from "next/link";
import { Checkbox } from "./checkbox";
import { useEffect, useState } from "react";
import { CircleCheck, CircleGauge, Moon, Rocket, ShieldCheck, Sun } from "lucide-react";
import axios from 'axios'; 
import { useRouter } from 'next/navigation'; 
import { Space_Grotesk } from "next/font/google";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';


export default function LoginForm() { 
  const [redirecionar, setRedirecionar] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openErro, setOpenErro] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nome, setNome] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  


  
  const router = useRouter(); 

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setSenha(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError('A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número, com no mínimo 8 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError('Insira um endereço de e-mail válido.');
    } else {
      setEmailError('');
    }
  };
 
  const handleNavigation = () => { 
    router.push('/login') 
  } 
 
  const handleRegister = async (e : any) => { 
    e.preventDefault(); 
 
    try { 
      const response = await axios.post('https://hd-api.azurewebsites.net/api/Usuario/Registro', { 
        nome,
        email,
        senha,
      }); 
 
      // Redireciona para a página de login após o cadastro bem-sucedido 
     setOpen(true);
      setRedirecionar(true);
      setTimeout(() => {
        router.push('/login')
      }, 2000);
    } catch (error) { 
      console.error('Erro ao fazer um cadastro:', error); 
      setOpenErro(true); 
      setTimeout(() => {
        router.push('/register')
      }, 2000);
    } 
  };  
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
          <div className="min-h-full w-full flex justify-center items-center">
              <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="absolute min-h-full w-full   h-[250px] flex justify-center items-center"
          >
        <Box className="absolute bg-white w-[350px] rounded-xl h-[300px] flex flex-col justify-center items-center">
        <div className="main-container">
          <div className="check-container">
            <div className="check-background">
              <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div className="check-shadow"></div>
          </div>
        </div>
        <h1 className="text-green-500 text-xl">Cadastro realizado com sucesso!</h1>
        </Box>
      </Modal>
        </div>

        <div className="min-h-full w-full flex justify-center items-center">
              <Modal
            open={openErro}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="absolute min-h-full w-full   h-[250px] flex justify-center items-center"
          >
        <Box className="absolute bg-white w-[350px] rounded-xl h-[300px] flex flex-col justify-center items-center">
        <div className="failure-container">
          <div className="failure-container">
            <div className="failure-background">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </div>
            <div className="failure-shadow"></div>
          </div>
        </div>
        <h1 className="text-red-500 text-xl">Erro ao realizar cadastro</h1>
        </Box>
      </Modal>
        </div>


      <div className=" min-h-screen  bg-black flex-wrap-reverse dark:bg-neutral-100 flex justify-center items-center flex-row ">
      <div className="text-white max-sm:hidden max-sm:top-[120px] relative flex flex-col max-sm:items-center justify-center mr-16 mb-[140px]">
        <h1 className="font-bold text-5xl w-[500px] relative max-sm:left-[50px] max-sm:text-3xl max-sm:w-[380px] dark:text-black ">Comece agora com <span className="bg-gradient-to-r from-cyan-500 to-blue-800 inline-block text-transparent bg-clip-text">HD support</span></h1>
        <p className="w-[500px] relative max-sm:left-[50px] max-sm:w-[380px] mt-4 dark:text-black">A equipe de aprendizes do BNE tem o prazer de apresentar um projeto inovador e eficiente desenvolvido para aprimorar o funcionamento do Help Desk.
          </p> 
          <ul className="flex flex-col max-sm:flex-row max-sm:space-x-5">
          <li className="mt-3 flex space-x-1"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradiente1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket">
              <defs>
                <linearGradient id="gradiente1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="1" />
                  <stop offset="100%" stopColor="blue" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg> <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-800 font-bold"> Rápido</p>
          </li>
          <li className="mt-3 space-x-1 flex"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradiente2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check">
              <defs>
                <linearGradient id="gradiente2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="1" />
                  <stop offset="100%" stopColor="blue" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-800 font-bold"> Seguro</p>
          </li>
          <li className="mt-3 space-x-1 flex"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradiente3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-gauge">
              <defs>
                <linearGradient id="gradiente3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="1" />
                  <stop offset="100%" stopColor="blue" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7"/><circle cx="12" cy="12" r="2"/><path d="M13.4 10.6 19 5"/>
            </svg>
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-800 font-bold"> Eficiente</p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col relative max-sm:top-[10px] justify-center items-center">
        <div className="text-white text-center text-3xl font-bold mb-3 dark:text-black">
          Crie sua conta!
        </div>

        <form action="post" className="flex flex-col items-center" onSubmit={handleRegister}>
        <div className=" flex items-center max-sm:w-[380px] justify-center dark:bg-slate-300 dark:text-black text-neutral-500  w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input value={nome} onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome de usuário" 
              className="border-none h-60px" 
            /> 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user  relative right-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div> 

          <div className=" flex items-center max-sm:w-[380px] justify-center text-neutral-500 dark:bg-slate-300 dark:text-black w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input 
              type="email"
              value={email} onChange={handleEmailChange}
              placeholder="Digite seu E-mail" 
              className="border-none h-60px" 
              required
            /> 
             
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-at-sign relative right-5 "><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
          </div> 
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
 
          
          <div className="flex items-center justify-center max-sm:w-[380px] dark:bg-slate-300 dark:text-black text-neutral-500 w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input
              value={senha}  onChange={handlePasswordChange}
              placeholder="Informe sua senha" 
              className="border-none h-60px" 
            /> 
               
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock-keyhole relative  right-5"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
          </div>
          {passwordError && <div style={{ color: 'red', width: 500}}>{passwordError}</div>}



          <Button type="submit" className="dark:bg-gradient-to-r  max-sm:w-[380px] dark:from-black dark:to-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-lg w-[500px] h-[50px] mt-10 transition-all ease-in-out duration-1000 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-500 ">
            Criar conta
          </Button>
          
          <Button onClick={handleOpen}>aaaa</Button>
          <div className="text-white relative max-sm:bottom-[20px] text-center mt-3">
            <span className="text-neutral-500 font-bold">
              Já possui conta? {" "}
              <Link href="/login" className="text-white animate-pulse font-bold dark:text-black">
                Entre agora
              </Link>
            </span>
          </div>
        </form>
      </div>

    </div>
    <button onClick={toggleDarkMode} className="ml-5 text-center flex justify-center items-center absolute w-10 h-10 bottom-16 right-26 bg-white text-dark dark:text-white dark:bg-neutral-900 rounded-full"> 
        {darkMode ? <Sun/> : <Moon/>} 
      </button> 
    </div>
  );
}