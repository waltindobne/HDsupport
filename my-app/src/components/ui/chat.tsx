'use client'
import { useEffect } from "react";
import { useState } from "react";
import {MessageCircleMore, MessageCircleQuestion, MessageCircleReply, Search, Settings, X } from "lucide-react";
import axios from "axios";
import MensagensChat from "@/components/ui/MensagensChat";
import mensagens from "@/components/ui/MensagensChat";


interface User {
    id: number;
    nome: string;
    email: string;
    cargo: string;
}
interface Usuarios {
    id: string;
	nome: string;
	email: string;
	senha: string;
	telefone: string;
	cargo: string;
	imagem: string;
	status: number;
	statusConversa: number;
	tokenRedefinicaoSenha: string;
	dataHoraGeracaoToken: string;
}

enum TipoConversa {
	Conversa = 1,
    HelpDesk = 2,
    Atendimento = 3
}
interface Chamado {
    id: number;
    funcionarios?: Usuarios;
    funcionariosId?: number;
    cliente: Usuarios;
    clienteId: number;
    tipoConversa?: TipoConversa;
    criptografia: string;
    status: StatusConversa;
    data_inicio: Date;
    data_conclusao?: Date;
}

type StatusConversa = 'Open' | 'Closed' | 'Pending';

const Chat = () => {
	const [chamadosAbertos, setChamadosAbertos] = useState<Chamado[]>([]);
	const [chamadosConcliudos, setChamadosConcluidos] = useState<Chamado[]>([]);
	const [chamadosFechados, setChamadosFechados] = useState<Chamado[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredChamadosFechados, setFilteredChamadosFechados] = useState<Chamado[]>([]);
    const [filteredChamadosAbertos, setFilteredChamadosAbertos] = useState<Chamado[]>([]);
    const [selectedChamados, setSelectedChamados] = useState<Chamado | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10000);
	const [userData, setUserData] = useState<User | null>(null);
	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

	const fetchDataUser = async (token: string | null) => {
        try {
            const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Usuario/BuscarPorTokenJWT/${token}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data; // Retorne os dados da resposta
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };
	useEffect(() => {
		if (token) {
			fetchDataUser(token)
			.then((data) => {
				setUserData(data);
				setIsLoading(false);
			})
		} else {
			console.log('Token não está presente no localStorage');
			setIsLoading(false);
		}
	}, []);
	const fetchDataNaoAceito = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Listar-Chamados?tipo=2&aceito=false`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data; // Retorne os dados da resposta
			} else {
				throw new Error('Token não está presente no localStorage');
			}
		} catch (error) {
			console.error('Erro ao buscar dados da API:', error);
			throw error; // Se ocorrer um erro, lance-o para que possa ser tratado em outro lugar
		}
	};
	const fetchDataAceito = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
        try {
            if (token && userData && userData.id) { // Adicionando verificação para userData e userData.id
                const userID = userData.id;
				console.log(userID)
                const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Listar-Conversas/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data; // Retorne os dados da resposta
            } else {
                throw new Error('Token não está presente no localStorage ou userData não está definido');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
            throw error; // Se ocorrer um erro, lance-o para que possa ser tratado em outro lugar
        }
    };
	const fetchDataFinalizados = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Listar-Chamados?tipo=2&aceito=false`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});console.log(response.data)
			return response.data; // Retorne os dados da resposta
			
			} else {
				throw new Error('Token não está presente no localStorage');
			}
		} catch (error) {
			console.error('Erro ao buscar dados da API:', error);
			throw error; // Se ocorrer um erro, lance-o para que possa ser tratado em outro lugar
		}
	};
	useEffect(() => {
        if (token) {
            // Verifica se userData está disponível antes de chamar fetchDataAceito
            if (userData) {
                fetchDataAceito(token)
                    .then((data) => {
                        setChamadosFechados(data);
                        setIsLoading(false);
                    })
            }
            fetchDataNaoAceito(token)
                .then((data) => {
                    setChamadosAbertos(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        } else {
            console.log('Token não está presente no localStorage');
            setIsLoading(false);
        }
    }, [token, userData]); // Adicionando "userData" como dependência para garantir que o useEffect seja executado quando userData estiver disponível

	

	const HandleSendId = (idConversa) => {
		try {
			localStorage.setItem('idConversa', idConversa);
			console.log('Sucesso ao tentar adicionar o ID:', idConversa);
		} catch (error) {
			console.error('Erro ao tentar enviar o ID:', error);
		}
	}
	
	const HandleAceitarChamados = async (idConversa) => {
		try {
			console.log(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Aceitar-Chamado/${idConversa}-${userData?.id}`);
			const response = await axios.post(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Aceitar-Chamado/${idConversa}-${userData?.id}`, {}, {
			  headers: {
				Authorization: `Bearer ${token}`,
			  }
			});
			console.log(`Chamado Aceito com sucesso: ${idConversa}`);
			window.alert(`Chamado Aceito com sucesso: ${idConversa}`);
		  } catch (error) {
			console.error('Erro ao Aceitar o Chamado:', error);
			window.alert('Erro ao Aceitar o Chamado');
		  }
	}
	
	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		const results = chamadosFechados.filter((chamadoFechado) => {
			const cliente = chamadoFechado.cliente;
			return (
				cliente && cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Adicionando verificação para garantir que cliente não seja null
			);
		});
		setFilteredChamadosFechados(results);
		{/*console.log("Resultados filtrados:", results);*/}
	}, [chamadosFechados, searchTerm]);

	useEffect(() => {
		const results = chamadosAbertos.filter((chamadoAberto) => {
			const cliente = chamadoAberto.cliente;
			return (
				cliente && cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Adicionando verificação para garantir que cliente não seja null
			);
		});
		setFilteredChamadosAbertos(results);
	}, [chamadosAbertos, searchTerm]);


	// Certifique-se de que currentItems está recebendo os dados corretamente
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItemsFechado = filteredChamadosFechados.slice(indexOfFirstItem, indexOfLastItem);
	const currentItemsAberto = filteredChamadosAbertos.slice(indexOfFirstItem, indexOfLastItem);


	type ActiveButtonType = 'naoAceitos' | 'aceitos' | 'naoAceitos' | 'aceitos' | null;
	const [activeButton, setActiveButton] = useState<ActiveButtonType>('aceitos');
	const [isOpenClose, setIsOpenClose] = useState(true);

	const [isOpenMenuNaoAceitos, setIsOpenMenuNaoAceitos] = useState(false);
    const openMenuNaoAceitos = () => {
		setActiveButton('naoAceitos');
		setIsOpenMenuNaoAceitos(true);
		setIsOpenMenuAceitos(false);
		setIsOpenClose(true);
	};
    const closeMenuNaoAceitos = () => {
		setIsOpenMenuNaoAceitos(false);
		setIsOpenClose(true);
	};
	const [isOpenMenuAceitos, setIsOpenMenuAceitos] = useState(true);
    const openMenuAceitos = () => {
		setActiveButton('aceitos');
		setIsOpenMenuNaoAceitos(false);
		setIsOpenMenuAceitos(true);
		setIsOpenClose(true);
	};
	
    const closeMenuAceitos = () => {
		setIsOpenMenuAceitos(false);
		setIsOpenClose(true);
	};


	const [isOpenMenuNaoAceitosResponse, setIsOpenMenuNaoAceitosResponse] = useState(false);
    const openMenuNaoAceitosResponse = () => {
		setActiveButton('naoAceitos');
		setIsOpenMenuNaoAceitosResponse(true);
		setIsOpenMenuAceitosResponse(false);
	
		setIsOpenMenuNaoAceitos(false);
		setIsOpenMenuAceitos(false);
		setIsOpenClose(false);
	};
    const closeMenuNaoAceitosResponse = () => {
		setIsOpenMenuNaoAceitosResponse(false);
		setIsOpenClose(true);
	};
	const [isOpenMenuAceitosResponse, setIsOpenMenuAceitosResponse] = useState(false);
    const openMenuAceitosResponse = () => {
		setActiveButton('aceitos');
		setIsOpenMenuNaoAceitosResponse(false);
		setIsOpenMenuAceitosResponse(true);
	
		setIsOpenMenuNaoAceitos(false);
		setIsOpenMenuAceitos(false);
		setIsOpenClose(false);
	};
    const closeMenuAceitosResponse = () => {
		setIsOpenMenuAceitosResponse(false);
		setIsOpenClose(true);
	};

	return(
		<div className="w-[100%] flex h-[100%]">
				<div className="border-r-2 border-neutral-400 w-[50px] h-[100%] py-3 flex flex-col text-blue-500 text-9xl">
					<ul className="h-full flex flex-col items-center">
						<button 
							onClick={openMenuNaoAceitosResponse} 
							className={`hidden max-[900px]:flex ${activeButton === 'naoAceitos' ? 'text-white' : ''}`}
						>
							<li className="pb-2"><MessageCircleQuestion/></li>
						</button>
						<button 
							onClick={openMenuAceitosResponse} 
							className={`hidden max-[900px]:flex ${activeButton === 'aceitos' ? 'text-white' : ''}`}
						>
							<li className="pb-2"><MessageCircleMore/></li>
						</button>


						<button 
							onClick={openMenuNaoAceitos} 
							className={`flex max-[900px]:hidden ${activeButton === 'naoAceitos' ? 'text-white' : ''}`}
						>
							<li className="pb-2"><MessageCircleQuestion/></li>
						</button>
						<button 
							onClick={openMenuAceitos} 
							className={`flex max-[900px]:hidden ${activeButton === 'aceitos' ? 'text-white' : ''}`}
						>
							<li className="pb-2"><MessageCircleMore/></li>
						</button>
					</ul>
					<ul className="flex flex-col items-center">
						<li className="pb-2"><Settings/></li>
					</ul>
				</div>
				<div className="">
				{isOpenMenuAceitos && chamadosFechados && (
				<div className="border-r-2 border-white w-[250px] h-[100%] text-white px-[10px] py-[20px] max-[450px]:w-full max-[450px]:border-r-0 max-[600px]:hidden">
					<h1 className="mb-[30px]">Conversas</h1>
					<div>
						<div className="flex flex-row items-center bg-neutral-700 mb-[30px] rounded-[8px] pr-2">
							<input 
								type="text"
							 	className="w-[100%] border-0 bg-transparent text-white focus:ring-0"
								placeholder="Pesquise"
								value={searchTerm}
								onChange={handleSearchChange}
								/>
							<button><Search/></button>
						</div>
						<div className="flex flex-col mb-3">
							{currentItemsFechado.map((chamadoFechado, index) => ((
									<div key={index}>
										<form action="" method="">
											<button key={index} onClick={() => HandleSendId(chamadoFechado.id)} className="flex items-center mb-3">
												<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
												{chamadoFechado.cliente.nome}
											</button>
										</form>
									</div>
								)
							))}
						</div>

					</div>
				</div>
				)}
				{isOpenMenuNaoAceitos && chamadosAbertos && (
				<div className="border-r-2 border-white w-[250px] h-[100%] text-white px-[10px] py-[20px] max-[450px]:w-full max-[450px]:border-r-0 max-[600px]:hidden">
					<h1 className="mb-[30px]">Chamados em Aberto</h1>
					<div>
						<div className="flex flex-row items-center bg-neutral-700 mb-[30px] rounded-[8px] pr-2">
							<input 
								type="text"
							 	className="w-[100%] border-0 bg-transparent text-white focus:ring-0"
								placeholder="Pesquise"
								value={searchTerm}
								onChange={handleSearchChange}
								/>
							<button><Search/></button>
						</div>
						<div className="flex flex-col mb-3">
							{currentItemsAberto.map((chamadoAberto, index) => (
								<div key={index}>
									<form action="" method="">
									<button key={index} className="flex items-center mb-3">
										<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
										{chamadoAberto.cliente.nome}
										<button onClick={() => HandleAceitarChamados(chamadoAberto.id)} className="text-green-400 border border-green-400 ml-[30px] rounded-[5px] py-1 px-3 hover:bg-green-400 hover:text-black">Aceitar</button>
									</button>
									</form>
								</div>
							))}
						</div>
					</div>
				</div>
				)}
				{isOpenMenuNaoAceitosResponse && chamadosAbertos && (
				<div className="border-r-2 border-white w-[250px] h-[100%] text-white px-[10px] py-[20px] max-[450px]:w-full max-[450px]:border-r-0">
					<button onClick={() => closeMenuNaoAceitosResponse()} className="mt-[-30px] text-blue-300"><X/></button>
					<h1 className="mb-[30px]">Chamados em Aberto</h1>
					<div>
						<div className="flex flex-row items-center bg-neutral-700 mb-[30px] rounded-[8px] pr-2">
							<input 
								type="text"
							 	className="w-[100%] border-0 bg-transparent text-white focus:ring-0"
								placeholder="Pesquise"
								value={searchTerm}
								onChange={handleSearchChange}
								/>
							<button><Search/></button>
						</div>
						<div className="flex flex-col mb-3">
							{currentItemsAberto.map((chamadoAberto, index) => (
								<div key={index}>
									<form action="" method="">
									<button key={index} className="flex items-center mb-3">
										<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
										{chamadoAberto.cliente.nome}
										<button onClick={() => HandleAceitarChamados(chamadoAberto.id)} className="text-green-400 border border-green-400 ml-[30px] rounded-[5px] py-1 px-3 hover:bg-green-400 hover:text-black">Aceitar</button>
									</button>
									</form>
								</div>
							))}
						</div>
					</div>
				</div>
				)}
				{isOpenMenuAceitosResponse && chamadosFechados && (
				<div className="border-r-2 border-white w-[250px] h-[100%] text-white px-[10px] py-[20px] max-[450px]:w-full max-[450px]:border-r-0">
					<button onClick={() => closeMenuAceitosResponse()} className="mt-[-30px] text-blue-300"><X/></button>
					<h1 className="mb-[30px]">Conversas</h1>
					<div>
						<div className="flex flex-row items-center bg-neutral-700 mb-[30px] rounded-[8px] pr-2">
							<input 
								type="text"
							 	className="w-[100%] border-0 bg-transparent text-white focus:ring-0"
								placeholder="Pesquise"
								value={searchTerm}
								onChange={handleSearchChange}
								/>
							<button><Search/></button>
						</div>
						<div className="flex flex-col mb-3">
						{currentItemsFechado.map((chamadoFechado, index) => (
								chamadoFechado.cliente && chamadoFechado.cliente.nome ? ( // Verificação adicional para garantir que cliente e cliente.nome existam
									<div key={index}>
										<form action="" method="">
											<button key={index} onClick={() => HandleSendId(chamadoFechado.id)} className="flex items-center mb-3">
												<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
												{chamadoFechado.cliente.nome}
											</button>
										</form>
									</div>
								) : null // Retorna null se chamado.cliente ou chamado.cliente.nome for null ou undefined
							))}
						</div>
					</div>
				</div>
				)}
				</div>
				{isOpenClose && (
					<MensagensChat/>
				)}
			</div>
	);
}
export default Chat;