"use client"
import { useState } from 'react';
import Emprestimo from "@/components/ui/emprestimo";
import Equipamento from "@/components/ui/equipamento";
import Funcionario from "@/components/ui/funcionario";
import SidebarMenu from "@/components/ui/sidebarmenu";
import SidebarMenuResponse from "@/components/ui/sidebarmenuResponse";

export default function Tabelas(){
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // Defina o número total de páginas aqui

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
