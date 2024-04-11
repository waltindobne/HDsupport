"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Corrigido o import

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
        const response = await fetch('/api/redefinirSenha', {
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
      <div>
        <h1>Redefinição de Senha</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="novaSenha">Nova Senha:</label>
          <input
            type="password"
            id="novaSenha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
          <br />
          <label htmlFor="confirmacaoSenha">Confirme a Nova Senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            value={confirmacaoSenha}
            onChange={(e) => setConfirmacaoSenha(e.target.value)}
            required
          />
          <br />
          <button type="submit">Redefinir Senha</button>
        </form>
      </div>
    );
  }
  
