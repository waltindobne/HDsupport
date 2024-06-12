'use client'
import { useEffect } from "react";
import { useState } from "react";
import {MessageCircleMore, Gauge, Table, BarChart4, Search, Settings, SendHorizontal , EllipsisVertical, X } from "lucide-react";
import axios from "axios";
import MensagensChat from "@/components/ui/MensagensChat";
import mensagens from "@/components/ui/MensagensChat";

const Chat = () => {
	const [chamadosAbertos , setChamadosAbertos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredChamados, setFilteredChamados] = useState([]);
	const [selectedChamados, setSelectedChamados] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(7);

	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

	const fetchData = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			const response = await axios.get('https://localhost:7299/api/Conversa/Listar-Chamados?tipo=1&aceito=false', {
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
			fetchData(token)
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
        const results = chamadosAbertos.filter((chamado) => {
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


	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [isOpenClose, setIsOpenClose] = useState(true);
    
	
    const openMenu = () => {
		setIsOpenMenu(true);
		setIsOpenClose(false);
	};
    const closeMenu = () => {
		setIsOpenMenu(false);
		setIsOpenClose(true);
	};

	return(
		<div className="w-[100%] flex h-[100%]">
				<div className="border-r-2 border-neutral-400 w-[50px] h-[100%] py-3 flex flex-col text-blue-500 text-9xl">
					<ul className="h-full flex flex-col items-center">
						<button onClick={() => openMenu()} className="hidden max-[900px]:flex"><li className="pb-2"><MessageCircleMore/></li></button>
						<li className="pb-2 max-[900px]:hidden"><MessageCircleMore/></li>
						<li className="pb-2"><Gauge/></li>
						<li className="pb-2"><Table/></li>
						<li className="pb-2"><BarChart4/></li>
					</ul>
					<ul className="flex flex-col items-center">
						<li className="pb-2"><Settings/></li>
					</ul>
				</div>
				<div className="border-r-2 border-white w-[250px] h-[100%] text-white px-[10px] py-[20px] max-[900px]:hidden">
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
				<div className="">
				{isOpenMenu && (
				<div className="border-r-2 border-white w-[250px] h-[100%] text-white px-[10px] py-[20px] max-[450px]:w-full max-[450px]:border-r-0">
					<button onClick={() => closeMenu()} className="mt-[-30px] text-blue-300"><X/></button>
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
				</div>
				{isOpenClose && (
					<MensagensChat/>
				)}
				
			</div>
	);
}
export default Chat;