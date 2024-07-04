"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarMenu from "@/components/ui/sidebarmenu";
import { Users } from "lucide-react";
import { useRouter } from 'next/navigation';

// Defina a interface para o tipo de dados do usuário
interface User {
    nome: string;
    email: string;
    cargo: string;
}

const Profile = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);
    const token = localStorage.getItem('token');

    const fetchData = async (token: string | null) => {
        try {
            const response = await axios.get(`https://localhost:7299/api/Usuario/BuscarPorTokenJWT/${token}`, {
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

    const redirectRedf = () => {
        router.push('/');
    }

    const editarDados = () => {
        router.push('/editardados');
    }

    useEffect(() => {
        if (token) {
            fetchData(token)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.log('erro', error);
                });
        } else {
            console.log('Token não está presente no localStorage');
        }
    }, [token]);

    const nivelDeAcesso = [
        ["Sem Acesso a Tabela", "Sem acesso as Funções"],
        ["Tabela de Funcionários", "Adicionar Funcionários"],
        ["Todas as Tabelas", "Funções Básicas do CRUD"],
        ["Todas as Tabelas", "Todas as Funções do CRUD"]
    ];

    let nivelAcesso = 0; // Defina o nível de acesso padrão como 0

    if (userData && userData.cargo === 'RH') {
        nivelAcesso = 1;
    } else if (userData && userData.cargo === 'HelpDesk') {
        nivelAcesso = 2;
    } else if (userData && userData.cargo === '') {
        nivelAcesso = 3;
    }

    return (
        <div className="w-full flex h-[100vh] space-x-2 items-start bg-black">
            {userData && (
                <div className="flex w-full">
                    <SidebarMenu />
                    <div className="bg-black mt-[40px] w-full border-white text-white">
                        <div className="border-2 rounded-[15px] w-[600px] mx-auto h-[450px] flex">
                            <div className="w-[60%] mr-[10px] py-[40px] pl-[40px]">
                                <h1 className="text-[25px] flex">Ficha de Usuário
                                    <button onClick={editarDados} className="text-green-400 underline text-[14px] ml-7 flex justify-center items-center">
                                        Editar
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pen-line ml-1"><path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /></svg>
                                    </button>
                                </h1>
                                <table className="flex flex-col mt-[40px] text-left h-[100%]">
                                    <tbody className="flex flex-col justify-between">
                                        <tr className="pb-[20px]">
                                            <th><b> Nome:</b></th>
                                            <td className="pl-5">{userData.nome}</td>
                                        </tr>
                                        <tr className="pb-[20px]">
                                            <th><b>Email:</b></th>
                                            <td className="pl-5">{userData.email}</td>
                                        </tr>
                                        <tr className="pb-[20px]">
                                            <th><b>Senha:</b></th>
                                            <td className="pl-5"># # # # # # # # <button onClick={redirectRedf} className="ml-2 py-1 px-3 bg-green-400 rounded-[5px] border-[1px] border-white">Redefinir</button></td>
                                        </tr>
                                        <tr className="">
                                            <th><b>Equipamento:</b></th>
                                            <td className="pl-5"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-[40%] px-[40px] py-[40px] rounded-[15px] bg-neutral-800">
                                <div className="rounded-[1000px] ml-full w-[150px] h-[150px] bg-white flex justify-center items-center">
                                    <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="" className=" max-w-[165px] w-[200px]" />
                                </div>
                                <div>
                                    <p className="text-center text-[25px] w-[160px] mt-4 text-sky-300">{userData.cargo}</p>
                                </div>
                                <div className="mt-8">
                                    <h1 className="text-[18px] text-sky-200">Nivel de Acesso</h1>
                                    <ul className="mt-4 list-disc">
                                        <li className="mb-2">{nivelDeAcesso[nivelAcesso][0]}</li>
                                        <li className="">{nivelDeAcesso[nivelAcesso][1]}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
