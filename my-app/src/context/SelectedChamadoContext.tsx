import { createContext, useState, useContext, ReactNode } from 'react';

// Define o tipo para o valor do contexto
interface SelectedChamadoContextType {
    selectedChamadoId: string | null; // Defina o tipo adequado para selectedChamadoId
    setSelectedChamadoId: (id: string | null) => void;
}

// Cria o contexto com um valor padrão inicial
const SelectedChamadoContext = createContext<SelectedChamadoContextType>({
    selectedChamadoId: null,
    setSelectedChamadoId: () => {} // Função vazia como padrão
});

// Provider para envolver o aplicativo ou componentes que precisam acessar o contexto
export const SelectedChamadoProvider = ({ children }: { children: ReactNode }) => {
    const [selectedChamadoId, setSelectedChamadoId] = useState<string | null>(null);

    return (
        <SelectedChamadoContext.Provider value={{ selectedChamadoId, setSelectedChamadoId }}>
            {children}
        </SelectedChamadoContext.Provider>
    );
};

// Hook para usar o contexto
export const useSelectedChamado = () => useContext(SelectedChamadoContext);
