'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function Conta(){
    const [token, setToken] = useState<string | undefined>();

    async function ativarConta(e: any) {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7299/api/Usuario/Verificar-Conta');
            
           
            const tokenHeader = response.headers.authorization;
            setToken(tokenHeader);

        } catch (error) {
            console.error('Erro ao solicitar autorização', error);
        }
    }


    return(
        <div className="h-[100vh] w-full bg-black flex items-center justify-center">
            <form className="h-[400px] w-[50%] rounded-[20px] flex flex-col border-neutral-800 border-2 bg-neutral-950 items-center space-y-8 justify-center">
                <div className="w-full items-center justify-center">
                <span className="flex items-center justify-center w-full"><svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check text-blue-700"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg></span>
                </div>
                <h1 className="text-white text-4xl">Para <span className="text-blue-500 font-bold">ativar</span> sua conta</h1>
                <Button onClick={ativarConta} className="bg-gradient-to-r rounded-[10px] from-blue-700 to-cyan-500 w-[48%] h-[60px]">
                    <div className="flex items-center w-full justify-center">
                        <h1 className="text-white font-bold text-[20px]">Clique aqui</h1>
                    </div>
                </Button>
            </form>
        </div>
    )
}