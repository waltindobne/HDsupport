'use client'
 // Supondo que useClient esteja definido nesta localização

import CardChamados from "@/components/ui/cardchamados";
import Dados from "@/components/ui/dados";
import SidebarMenuResponse from "@/components/ui/sidebarmenuResponse";
import SidebarMenu from "@/components/ui/sidebarmenu";
import { useEffect, useState } from "react";
import Pizza from "@/components/ui/pizza";
import axios from "axios";
import HeaderDash from "@/components/ui/headerdash";
import { Moon, Sun } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState([
    {
      title: 'Concluidos',
      dados: 0,
    },
    {
      title: 'Abertos',
      dados: 0,
    },
    {
      title: 'Pendentes',
      dados: 0,
    },
  ]);
  

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

  useEffect(() => {
    async function fetchChamados() {
      try {
        const response = await axios.get('https://localhost:7299/api/Conversa/Dados-Chamados-Dashboard');
        setData(response.data);

        // Atualiza os dados com os valores recebidos da API
        setData([
          {
            title: 'Concluidos',
            dados: response.data[2] || 0, // concluido
          },
          {
            title: 'Abertos',
            dados: response.data[0] || 0, // aberto
          },
          {
            title: 'Pendentes',
            dados: response.data[1] || 0, // pendente
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchChamados();
  }, []);

  return (
    <div className="">
      <div className="bg-neutral-950 dark:bg-white min-h-screen h-[100vh] flex max-[700px]:flex-col items-start justify-around overflow-hidden max-[750px]:overflow-visible">
      <SidebarMenu/>      
      <SidebarMenuResponse/>      
      <div className="w-full mt-[77px] relative bottom-[37px] space-y-12 flex flex-col items-center justify-center max-[1160px]:flex-col max-[1160px]:items-start max-[1160px]:space-y-0 max-[600px]:flex-col max-[1000px]:mt-[60px]">
        <div className="flex space-x-3 max-[1160px]:space-x-0 max-[1160px]:ml-[30px] max-[600px]:mb-3  max-[600px]:mx-auto max-[600px]:flex-row max-[600px]:space-y-0 max-[600px]:space-x-1 max-[450px]:flex-col max-[450px]:space-x-0 items-center justify-center max-[600px]:w-full mr-7 ">
          {data.map((item) => (
            <CardChamados key={item.title} title={item.title} dados={item.dados} />
          ))}
        </div>
        <div className="w-full items-center justify-center flex flex-row max-[1160px]:flex-col-reverse max-[600px]:mt-[10px] max-[820px]:ml-3 max-[600px]:ml-0">
          <Dados />
          <Pizza />
        </div>
      </div>
    </div>
    </div>
  );
}
