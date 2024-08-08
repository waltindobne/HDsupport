"use client";
import { useState, useEffect } from "react"; 
import axios from 'axios'; 
import Link from "next/link"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "./button"; 
import { useRouter } from 'next/navigation'; 
import Box from '@mui/material/Box'; 

interface User {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

const EditarDados = () => { 
  const router = useRouter();
  const [newNome, setNewNome] = useState(''); 
  const [newTelefone, setNewTelefone] = useState('');
  const [base64, setBase64] = useState<string | undefined>(undefined);
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  const [userData, setUserData] = useState<User | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64String = await convertToBase64(file);
      setBase64(base64String as string); // garantir que base64String seja tratado como string
    }
  };
  
  

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  
  const fetchData = async (token) => {
    try {
        const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Usuario/BuscarPorTokenJWT/${token}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        );
        console.log(response.data)
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
      })
      .catch((error) => {
        console.log('erro', error);
      });
    } else {
      console.log('Token não está presente no localStorage');
    }
  }, [token]);

  const fetchDataEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData)
    if (userData) {
      let base64Imagem = base64?.split(',')[1];
      console.log(base64Imagem);
      try {
        const responseEdit = await axios.put(`https://testing-api.hdsupport.bne.com.br/api/Usuario/Editar-Usuario/${userData.id}`, {
          nome: newNome,
          email: userData.email,
          telefone: newTelefone,
          imagem: base64Imagem
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(userData.id);
        // Opção para redirecionar ou dar feedback ao usuário
        router.push('/alguma-pagina'); // Ajuste conforme necessário
      } catch (erro) {
        console.log('Erro ao tentar editar o usuário', erro);
      }
    } else {
      console.log('Dados do usuário não estão disponíveis.');
    }
  };
  
 
  return ( 
    <div className=""> 
      <div className="flex flex-col bg-black h-[100vh] justify-center items-center">
        <div className="text-white flex text-center text-3xl font-bold mb-3 dark:text-black">
          Editar dados do Usuário
        </div>

        <form className="flex flex-col items-center" onSubmit={fetchDataEdit}>
          <div className="flex items-center max-sm:w-[380px] justify-center text-neutral-300 dark:bg-slate-300 dark:text-black w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input 
              type="text"
              value={newNome}
              onChange={(e) => setNewNome(e.target.value)}
              placeholder="Digite seu novo nome de usuário" 
              className="border-none h-60px" 
              required
            /> 
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pen-line relative right-5"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
          </div> 
         
          <div className="flex items-center justify-center max-sm:w-[380px] dark:bg-slate-300 dark:text-black text-neutral-300 w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input
              value={newTelefone}
              onChange={(e) => setNewTelefone(e.target.value)}
              placeholder="Digite seu novo telefone" 
              className="border-none h-60px" 
              required
            /> 
              
			  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-phone relative right-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>

          <div className="flex items-center justify-center max-sm:w-[380px] dark:bg-slate-300 dark:text-black text-neutral-300 w-[500px] rounded h-[60px] mt-5 bg-neutral-950 text-lg border-none">
            <Input
              type="file"
              onChange={handleFileChange}
              placeholder="Anexe sua nova foto de Perfil"
              className="border-none h-60px pl-7" 
              required
            /> 
              
			  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-image relative right-5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>

          <Button type="submit" className="dark:bg-gradient-to-r max-sm:w-[380px] dark:from-black dark:to-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-lg w-[500px] h-[50px] mt-6 transition-all ease-in-out duration-1000 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-500 ">
            Alterar
          </Button>
        </form>
      </div> 
    </div> 
  ); 
};

export default EditarDados;
