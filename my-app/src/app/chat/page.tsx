'use client'
import Dados from "@/components/ui/dados";
import Pizza from "@/components/ui/pizza";
import { useEffect } from "react";
import { useState } from "react";
import SidebarMenu from "@/components/ui/sidebarmenu";
import SidebarMenuResponse from "@/components/ui/sidebarmenuResponse";
import MenuChat from "@/components/ui/sideMenuChamados";
import Chat from "@/components/ui/chat";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    nome: string;
    email: string;
    cargo: string;
}

export default function Graficos(){
    const [userData, setUserData] = useState<User | null>(null);
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    const router = useRouter();
    
	const fetchDataUser = async (token: string | null) => {
        try {
            const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Usuario/BuscarPorTokenJWT/${token}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data; // Retorne os dados da resposta
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };
    useEffect(() => {
        if (token) {
          fetchDataUser(token)
            .then((data) => {
              setUserData(data);
              if (data.cargo !== "HelpDesk" && data.cargo !== "RH" && data.cargo !== "Funcionario") {
                router.push('/login');
              }
            })
            .catch((error) => {
              console.log('Erro ao buscar dados do usuário:', error);
            });
        } else {
          console.log('Token não está presente no localStorage');
          router.push('/login');
        }
      }, [token]);
    
    return(
        <div className="">
            <div className="flex h-[98vh] w-full items-start space-x-16 bg-neutral-950 pr-[50px] max-[820px]:space-x-2 max-[820px]:pr-2 max-[820px]:flex-col max-[820px]:items-center">
               <SidebarMenu /> 
               <SidebarMenuResponse />
                <div className="w-full border-slate-50 mt-[20px] border-2 dark:border-black flex rounded-[20px] h-[93vh]">
                    <Chat/>
                </div>
            </div>
        </div>
        
    )
}