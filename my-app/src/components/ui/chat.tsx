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
    const [filteredChamados, setFilteredChamados] = useState<Chamado[]>([]);
    const [selectedChamados, setSelectedChamados] = useState<Chamado | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
	const [userData, setUserData] = useState<User | null>(null);

	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

	const fetchDataUser = async (token: string | null) => {
        try {
            const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Usuario/BuscarPorTokenJWT/${token}`, {
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
	
console.log(typeof userData?.id)
console.log(userData?.id)
	const fetchDataAceito = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Listar-Conversas/${userData?.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data)
			return response.data; // Retorne os dados da resposta
			} else {
				throw new Error('Token não está presente no localStorage');
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
	useEffect(() => {
		if (token) {
			fetchDataNaoAceito(token)
			.then((data) => {
				setChamadosAbertos(data);
				setIsLoading(false);
			})
			fetchDataAceito(token)
			.then((data) => {
				setChamadosFechados(data);
				setIsLoading(false);
			})
			fetchDataFinalizados(token)
			.then((data) => {
				setChamadosConcluidos(data);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
		} else {
			console.log('Token não está presente no localStorage');
			setIsLoading(false);
		}
	}, []);

	

	const HandleSendId = (idConversa) => {
		try {
			localStorage.setItem('idConversa', idConversa);
			console.log('Sucesso ao tentar adicionar o ID:', idConversa);
		} catch (error) {
			console.error('Erro ao tentar enviar o ID:', error);
		}
	}
	
	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
        const results = chamadosFechados.filter((chamado) => {
            const cliente = chamado.cliente;
            return (
                cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredChamados(results);
    }, [chamadosAbertos, searchTerm]);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredChamados.slice(indexOfFirstItem, indexOfLastItem);


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
				{isOpenMenuAceitos && (
				<div className="border-r-2 border-white w-[250px] h-[100%] text-white px-[10px] py-[20px] max-[450px]:w-full max-[450px]:border-r-0 max-[600px]:hidden">
					<button onClick={() => closeMenuNaoAceitos()} className="mt-[-30px] text-blue-300"><X/></button>
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
							{currentItems.map((chamados, index) => (
								<div key={index}>
									<form action="" method="post">
									<button key={index} onClick={() => HandleSendId(chamados.id)} className="flex items-center mb-3">
										<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
										{chamados.cliente.nome}
									</button>
									</form>
								</div>
							))}
						</div>
					</div>
				</div>
				)}
				{isOpenMenuNaoAceitos && (
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
							{currentItems.map((chamados, index) => (
								<div key={index}>
									<form action="" method="post">
									<button key={index} onClick={() => HandleSendId(chamados.id)} className="flex items-center mb-3">
										<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
										{chamados.cliente.nome}
									</button>
									</form>
								</div>
							))}
						</div>
					</div>
				</div>
				)}
				{isOpenMenuNaoAceitosResponse && (
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
							{currentItems.map((chamados, index) => (
								<div key={index}>
									<form action="" method="post">
									<button key={index} onClick={() => HandleSendId(chamados.id)} className="flex items-center mb-3">
										<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
										{chamados.cliente.nome}
									</button>
									</form>
								</div>
							))}
						</div>
					</div>
				</div>
				)}
				{isOpenMenuAceitosResponse && (
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
							{currentItems.map((chamados, index) => (
								<div key={index}>
									<form action="" method="post">
									<button key={index} onClick={() => HandleSendId(chamados.id)} className="flex items-center mb-3">
										<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
										{chamados.cliente.nome}
									</button>
									</form>
								</div>
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