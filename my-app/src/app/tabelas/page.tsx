"use client"
import { useState } from 'react';
import Emprestimo from "@/components/ui/emprestimo";
import Equipamento from "@/components/ui/equipamento";
import Funcionario from "@/components/ui/funcionario";
import SidebarMenu from "@/components/ui/sidebarmenu";

export default function Tabelas(){
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // Defina o número total de páginas aqui

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch(currentPage) {
            case 1:
                return <Emprestimo />;
            case 2:
                return <Funcionario />;
            case 3:
                return <Equipamento />;
            default:
                return null;
        }
    };

    return(
        <div className="flex h-[100vh] space-x-2 items-center bg-neutral-950">
            <SidebarMenu />
            <div className="space-y-5 items-center text-white justify-center space-x-3 w-[85%] flex-col">
                {renderPage()}
                <div className="pagination flex justify-center items-center">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            
                            onClick={() => handlePageChange(index + 1)}
                            className={`pagination-item ${currentPage === index + 1 ? 'active' : 'text-blue-500'} p-1 text-2xl`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
