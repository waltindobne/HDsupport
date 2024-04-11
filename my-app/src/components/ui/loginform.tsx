import React, { useState } from "react";
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('string');

  const handleLogin = async (e) => { 
    e.preventDefault(); 
    try { 
      const response = await axios.post('https://localhost:7299/api/Usuario/Login', { 
        email,
        senha,
      }); 
      
      // Lógica para armazenar token e redirecionar usuário
      console.log('Login bem-sucedido:', response.data);
    } catch (error) { 
      console.error('Erro ao fazer login:', error); 
      setErro('sdasdasf\sf');
    } 
  };  

  return (
    <div>
      <h2>Login</h2>
      {erro && <p>{erro}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </label>
        <label>
          Senha:
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginForm;
