
import Emprestimo from "@/components/ui/emprestimo";
import Equipamento from "@/components/ui/equipamento";
import Funcionario from "@/components/ui/funcionario";
import SidebarMenu from "@/components/ui/sidebarmenu";
import { Carousel } from "flowbite-react";

export default function Tabelas(){
    return(
        <div className="flex h-[100vh] space-x-2 items-center bg-neutral-950">
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
            <SidebarMenu />
            <div className="space-y-5 items-center justify-center space-x-3 w-[85%] flex-col">
                <Carousel className="">
                        <Emprestimo/>
                    
                        <Funcionario/>
                    
                        <Equipamento/>
                </Carousel>
            </div>
        </div>
    )
}