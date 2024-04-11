'use client'
 // Supondo que useClient esteja definido nesta localização

import CardChamados from "@/components/ui/cardchamados";
import Dados from "@/components/ui/dados";
import SidebarMenu from "@/components/ui/sidebarmenu";
import { useEffect, useState } from "react";
import Pizza from "@/components/ui/pizza";
import axios from "axios";
import HeaderDash from "@/components/ui/headerdash";

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

  useEffect(() => {
    async function fetchChamados() {
      try {
        const response = await 
        axios.get('https://localhost:7299/api/Conversa/Dados-Chamados-Dashboard');
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
    <div className="bg-neutral-950 h-[100vh] flex-row flex items-center justify-around">
      <SidebarMenu />
      <div className="w-full relative bottom-[37px] space-y-10 flex flex-col items-center justify-center">
        <div className="flex space-x-3">
          {data.map((item) => (
            <CardChamados key={item.title} title={item.title} dados={item.dados} />
          ))}
        </div>
        <div className="w-full items-center justify-center space-x-3 flex flex-row">
          <Dados />
          <Pizza />
        </div>
      </div>
    </div>
  );
}
