'use client'
import { useEffect } from "react";
import { useState } from "react";
import {MessageCircleMore, Gauge, Table, BarChart4, Search, Settings, SendHorizontal , EllipsisVertical } from "lucide-react";
import axios from "axios";


const Mensagens = () =>{

	const [mensagems , setMensagems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [enviarMensagem, setEviarMensagem] = useState('');
	const [usuarioId, setUsuarioId] = useState('');
	const [filteredMensagems, setFilteredMensagems] = useState([]);
	const [selectedMensagems, setSelectedMensagems] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(7);

	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

	const fetchData = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			var idConversa = localStorage.getItem('idConversa');
			const response = await axios.get(`https://hd-support-api.azurewebsites.net/api/Conversa/Lista-Mensagens/?idConversa=${idConversa}`, {
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
				setMensagems(data);
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

	const handleSubmitAdd = async (event) => {
		event.preventDefault();
		try {
		  var idConversa = localStorage.getItem('idConversa');
		  const response = await axios.post(
			`https://hd-support-api.azurewebsites.net/api/Conversa/Registro-Mensagem?idConversa=${idConversa}`,
			{
			  enviarMensagem,
			  usuarioId: 4
			},
			{
			  headers: {
				Authorization: `Bearer ${token}`
			  }
			}
		  );
		  console.log('Mensagem Enviada com sucesso:', response.data);
		} catch (error) {
		  console.error('Erro ao Enviar Mensagem:', error);
		}
	  };
	  
	



	useEffect(() => {
		const results = mensagems.filter(mensagem => {
			return Object.values(mensagem).some(value =>
			  typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
		setFilteredMensagems(results);
	}, [mensagems, searchTerm]);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredMensagems.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<div className="text-blue-500 h-[100%] w-[100%] flex flex-col max-w-[1300px]">
			<div className=" flex justify-between py-[10px] px-[20px] mb-[30px] border-b-[1px] border-neutral-700">
				<div className="flex items-center">
					<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
					{currentItems.map((mensagem, index) => (<h1>{mensagem.usuario.nome}</h1>))}
				</div>
				<button><EllipsisVertical/></button>
			</div>
			<div className="flex flex-col w-full h-[100%] px-5">
				{currentItems.map((mensagem, index) => (
					<div key={index} className="flex items-start flex-col">
						<div className="flex items-center mb-3"><img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2" />
						<h1>{mensagem.usuario.nome}</h1></div>
						<div className="bg-neutral-700 text-white p-[10px] max-w-[200px] flex rounded-[10px] mb-[10px]">
							{mensagem.mensagem}
						</div>
					</div>
				))}
			</div>
			<div className="flex items-end w-full">
				<form action="" onSubmit={handleSubmitAdd} className="w-full flex justify-center items-center py-[10px] px-[20px] border-t-[1px] border-neutral-700">
					<input 
						type="text"
					 	className="w-[80%] bg-gradient-to-r from-blue-950 to-cyan-950 border-0 rounded-[6px] text-white"
						placeholder="Digite sua Mensagem"
						value={enviarMensagem} onChange={(e) => setEviarMensagem(e.target.value)}
					/>
					<button type="submit" className="px-[20px] py-[10px] bg-blue-600 text-white ml-[10px] rounded-[8px]"><SendHorizontal/></button>
				</form>
			</div>
		</div>
	);
}

export default Mensagens;