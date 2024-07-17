'use client'
import Pizza from "@/components/ui/pizza";
import CardChamados from "@/components/ui/cardchamados";
import Dados from "@/components/ui/dados";
import SidebarMenuResponse from "@/components/ui/sidebarmenuResponse";
import SidebarMenu from "@/components/ui/sidebarmenu";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderDash from "@/components/ui/headerdash";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

let carregou = false;

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
  
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  const [userData, setUserData] = useState<User | null>(null);
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

  useEffect(() => {
    async function fetchChamados() {
      try {
        const response = await axios.get('https://testing-api.hdsupport.bne.com.br/api/Conversa/Dados-Chamados-Dashboard');
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


  //verificar autorização

  const fetchData = async (token: string | null) => {
    try {
        const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Usuario/BuscarPorTokenJWT/${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(response.data);
        return response.data; // Retorne os dados da resposta
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
};

useEffect(() => {
  if (token) {
    fetchData(token)
      .then((data) => {
        setUserData(data);
        if (data.cargo !== "HelpDesk" && data.cargo !== "RH") {
          router.push('/Profile');
        }else{
          carregou = true;
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

if(carregou){
  return (
    <div className="">
      <div className="bg-neutral-950 dark:bg-white min-h-screen h-[100vh] flex max-[820px]:flex-col items-start overflow-hidden max-[750px]:overflow-visible">
      <SidebarMenu/>      
      <SidebarMenuResponse/>      
      <div className="w-full mt-[77px] relative bottom-[37px] space-y-12 flex flex-col items-center justify-center max-[1160px]:flex-col max-[1160px]:items-center max-[1160px]:space-y-0 max-[600px]:flex-col max-[1000px]:mt-[60px]">
        <div className="flex space-x-3 max-[1160px]:space-x-0 max-[1160px]:ml-[30px] max-[600px]:mb-3  max-[600px]:mx-auto max-[600px]:flex-row max-[600px]:space-y-0 max-[600px]:space-x-1 max-[450px]:flex-col max-[450px]:space-x-0 items-center justify-between max-[600px]:w-full mr-7 gap-4 max-[450px]:gap-0">
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

}
