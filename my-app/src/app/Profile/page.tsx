"use client"
import axios from 'axios';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from "react";

export default function Profile() {
  const [profileDados, setProfileDados] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
  };

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'enabled') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Faz a requisição para a API para obter os dados do perfil
        const response = await axios.get(`https://hd-api.azurewebsites.net/api/Usuario/Buscar-Usuario-Por-ID/${}`); // Substitua '1' pelo ID do usuário desejado
        const userData = response.data;
        setProfileDados(userData); // Atualiza o estado profileDados com os dados recebidos da API
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="min-h-screen h-full bg-black dark:bg-white">
        <div className="justify-center items-center flex">
          <div className="border-2 rounded-[20px] mt-10 w-4/5">
            <div className="flex ml-8 items-center w-[638px] h-[136px] border-slate-50">
              {/* SVG code removed for brevity */}
              <div className="ml-2">
                {profileDados && (
                  <div key={profileDados.id}>
                    <h1 className="font-bold text-white dark:text-black">{profileDados.nome}</h1>
                    <h3 className="text-[#2F76FF] font-bold">{profileDados.cargo}</h3>
                    <h3 className="text-white dark:text-[#8C8C8C] ">{profileDados.email}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Remaining JSX code removed for brevity */}
        <button onClick={toggleDarkMode} className="ml-5 text-center flex justify-center items-center absolute w-10 h-10 bottom-16 right-26 bg-white text-dark dark:text-white dark:bg-neutral-900 rounded-full">
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
}
