"use client" 
import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; // Corrigido o import 
import { Button } from './button'; 
 
// Restante do código... 
 
export default function RecuperacaoSenha() { 
    const router = useRouter(); 
    const { idUsuario, token, geracaoToken } = router.query || {}; 
    const [novaSenha, setNovaSenha] = useState(''); 
    const [confirmacaoSenha, setConfirmacaoSenha] = useState(''); 
   
    const handleSubmit = async (event) => { 
      event.preventDefault(); 
      // Validar se a nova senha e a confirmação são iguais 
      if (novaSenha !== confirmacaoSenha) { 
        console.error('As senhas não coincidem.'); 
        return; 
      } 
   
      try { 
        const response = await fetch('https://localhost:7299/api/Usuario/RedefinirSenha', { 
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json', 
          }, 
          body: JSON.stringify({ idUsuario, token, novaSenha }), 
        }); 
        if (response.ok) { 
          // Redirecionar o usuário para a página de login ou página de sucesso 
          router.push('/login'); 
        } else { 
          // Tratar erros, talvez exibindo uma mensagem para o usuário 
        } 
      } catch (error) { 
        console.error('Erro ao redefinir senha:', error); 
      } 
    }; 
   
    return ( 
      <div className="min-h-screen bg-black text-black justify-center items-center flex"> 
        <div className='bg-black w-[400px] h-[400px] flex flex-col justify-center items-center rounded-2xl p-2'> 
        <h1 className='font-bold text-white text-3xl'>Redefinição de Senha</h1> 
        <form onSubmit={handleSubmit}> 
         
          <input 
            className=" flex items-center max-sm:w-[380px] justify-center text-neutral-500 dark:bg-slate-300 dark:text-black w-[450px] rounded h-[50px] mt-5 bg-neutral-950 text-lg border-none" 
            type="password" 
            id="novaSenha" 
            placeholder='Nova senha' 
            value={novaSenha} 
            onChange={(e) => setNovaSenha(e.target.value)} 
            required 
          /> 
          <br /> 
           
          <input 
          className=" flex items-center max-sm:w-[380px] justify-center text-neutral-500 dark:bg-slate-300 dark:text-black w-[450px] rounded h-[50px]  bg-neutral-950 text-lg border-none" 
            placeholder='Confirme a senha' 
            type="password" 
            id="confirmacaoSenha" 
            value={confirmacaoSenha} 
            onChange={(e) => setConfirmacaoSenha(e.target.value)} 
            required 
          /> 
          <br /> 
          <div className='flex justify-center items-center'> 
          <Button type="submit" className="dark:bg-gradient-to-r  max-sm:w-[380px] dark:from-black dark:to-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-lg w-[450px] h-[50px] mt-5 transition-all ease-in-out duration-1000 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-500 "> 
            Criar conta 
          </Button> 
          </div> 
        </form> 
        </div> 
      </div> 
    ); 
  }