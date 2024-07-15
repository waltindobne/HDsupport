"use client"
import { useState , useEffect } from 'react';
import Emprestimo from "@/components/ui/emprestimo";
import Equipamento from "@/components/ui/equipamento";
import Funcionario from "@/components/ui/funcionario";
import SidebarMenu from "@/components/ui/sidebarmenu";
import SidebarMenuResponse from "@/components/ui/sidebarmenuResponse";
import { useRouter } from 'next/navigation';
import axios from 'axios';


interface User {
    id: number;
    nome: string;
    email: string;
    cargo: string;
  }
  
let carregou = false;

export default function Tabelas(){
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // Defina o número total de páginas aqui
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    const [userData, setUserData] = useState<User | null>(null);
    const router = useRouter();
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch(currentPage) {
            case 1:
                return <Equipamento />;
            case 2:
                return <Funcionario />;
            case 3:
                return <Emprestimo />;
            default:
                return null;
        }
    };
    const nomeTabelas = [
        "",
        "Equipamentos",
        "Funcionários",
        "Emprestimos"
    ]

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
    return(
        <div className="flex h-[100vh] space-x-2 items-start bg-neutral-950 max-[820px]:flex-col max-[820px]:items-center">
            <SidebarMenu/>
            <SidebarMenuResponse/>
            <div className="space-y-5 items-center text-white justify-center space-x-3 w-[85%] flex-col mt-10 max-[820px]:space-x-0 max-[700px]:">
                <div className="pagination flex justify-center items-center">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                        key={index}
                        
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-item ${currentPage === index + 1 ? 'active' : 'text-sky-600'} p-1 mx-3 border-2 px-[20px] border-white rounded-[5px] text-2xl max-[700px]:`}
                        >
                            {nomeTabelas[index + 1]}
                        </button>
                    ))}
                </div>
                {renderPage()}
            </div>
        </div>
    )
    }
}
