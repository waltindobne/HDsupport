'use client'
import { useEffect, useState } from "react";
import { SendHorizontal, EllipsisVertical } from "lucide-react";
import axios from "axios";

interface Usuario {
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

interface Mensagem {
	id: string;
	mensagem: string;
	conversaId: number;
	usuario: Usuario;
	usuarioId: string;
	data_envio: string;
}

const Mensagens = () => {
	const [mensagems, setMensagems] = useState<Mensagem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [enviarMensagem, setEviarMensagem] = useState('');
	const [userData, setUserData] = useState<Usuario | null>(null);
	const [filteredMensagems, setFilteredMensagems] = useState<Mensagem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10000);

	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
	const fetchData = async (token) => {
		try {
			const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Usuario/BuscarPorTokenJWT/${token}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			return response.data;
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
					console.log('Erro ao buscar dados do usuário:', error);
				});
		} else {
			console.log('Token não está presente no localStorage');
		}
	}, [token]);
	const idConversa = typeof window !== 'undefined' ? window.localStorage.getItem('idConversa') : null;
	const fetchDataDados = async (token) => {
		try {
			if (token) {
				const response = await axios.get(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Lista-Mensagens?idConversa=${idConversa}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				return response.data;
			} else {
				throw new Error('Token não está presente no localStorage');
			}
		} catch (error) {
			console.error('Erro ao buscar dados da API:', error);
			throw error;
		}
	};
	useEffect(() => {
		if (token) {
			fetchDataDados(token)
				.then((data) => {
					setMensagems(data);
					setIsLoading(false);
				})
				.catch(() => {
					setIsLoading(false);
				});
		} else {
			console.log('Token não está presente no localStorage');
			setIsLoading(false);
		}
	}, [token]);
	
	const handleIniciarChamados = async (token) => {
		try {
			if (token) {
					var funcionarios = {
						"id": 0,
						"nome": "string",
						"email": "string",
						"senha": "string",
						"telefone": "string",
						"cargo": "string",
						"imagem": "string",
						"status": 1,
						"statusConversa": 1,
						"tokenRedefinicaoSenha": "string",
						"dataHoraGeracaoToken": "string"
					};
					var cliente = {
						"id": 0,
						"nome": "string",
						"email": "string",
						"senha": "string",
						"telefone": "string",
						"cargo": "string",
						"imagem": "string",
						"status": 1,
						"statusConversa": 1,
						"tokenRedefinicaoSenha": "string",
						"dataHoraGeracaoToken": "string"
					}
				const response = await axios.post(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Registro-Conversa`, 
					{
						funcionarios: funcionarios,
						funcionariosId: userData?.id,
						clienteId: userData?.id,
						cliente: userData,
						tipoConversa: 2,
						status: 1,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if(response.data){
					var usuarioContent = {
						"nome": "string",
						"email": "string",
						"senha": "string",
						"telefone": "string",
						"cargo": "string",
						"imagem": "string",
						"status": 1,
						"statusConversa": 1,
						"tokenRedefinicaoSenha": "string",
						"dataHoraGeracaoToken": "string"
					};
					var conversaId = response.data.id;
					localStorage.setItem('idConversa' , conversaId);
					const responseM = await axios.post(
						`https://testing-api.hdsupport.bne.com.br/api/Conversa/Registro-Mensagem?idConversa=${conversaId}`,
						{
							mensagem: enviarMensagem,
							usuario: usuarioContent,
							usuarioId: userData?.id
						},
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					);
					console.log('Mensagem Enviada com sucesso:', responseM.data);
					setMensagems([...mensagems, responseM.data]);
					setEviarMensagem('');
				}
				return response.data;
			} else {
				throw new Error('Token não está presente no localStorage');
			}
		} catch (error) {
			console.error('Erro ao buscar dados da API:', error);
			throw error;
		}
	};
	const handleSubmitAdd = async () => {
		try {
			var idConversa = localStorage.getItem('idConversa');
			var usuarioContent = {
				"nome": "string",
				"email": "string",
				"senha": "string",
				"telefone": "string",
				"cargo": "string",
				"imagem": "string",
				"status": 1,
				"statusConversa": 1,
				"tokenRedefinicaoSenha": "string",
				"dataHoraGeracaoToken": "string"
			};
			if (userData) {
				const response = await axios.post(
					`https://testing-api.hdsupport.bne.com.br/api/Conversa/Registro-Mensagem?idConversa=${idConversa}`,
					{
						mensagem: enviarMensagem,
						usuario: usuarioContent,
						usuarioId: userData.id
					},
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);
				console.log('Mensagem Enviada com sucesso:', response.data);
				setMensagems([...mensagems, response.data]);
				setEviarMensagem('');
			}
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
	const reversedMessages = [...mensagems].reverse();
	var outraPessoa = "";

	currentItems.forEach(mensagem => {
		if (mensagem.usuarioId !== userData?.id) {
			outraPessoa = mensagem.usuario.nome;
		}
	});

	//confimar conclusão de emprestimo

	const [isOpenConcluirChamado, setIsOpenConcluirChamado] = useState(false);
	const OpenConcluirChamados = () => {
		setIsOpenConcluirChamado(true);
	}
	const CancelarConcluirChamados = () => {
		setIsOpenConcluirChamado(false);
	}
	const handleFinalizarChamados = async () => {
		const idConversa = window.localStorage.getItem('idConversa');
		try {
			console.log(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Terminar-Conversa/${idConversa}`);
			const response = await axios.put(`https://testing-api.hdsupport.bne.com.br/api/Conversa/Terminar-Conversa/${idConversa}`, {}, {
			  headers: {
				Authorization: `Bearer ${token}`,
			  }
			});
			console.log(`Chamado Encerrado com sucesso: ${idConversa}`);
			window.alert(`Chamado Encerrado com sucesso: ${idConversa}`);
		  } catch (error) {
			console.error('Erro ao Encerrar o Chamado:', error);
			window.alert('Erro ao Encerrar o Chamado');
		  }
	}




	if(idConversa == null){
		return (
			<div className="text-blue-500 h-full w-full flex flex-col max-w-[1300px]">
				<div className="flex justify-between py-[10px] px-[20px] mb-[30px] border-b-[1px] border-neutral-700">
					<div className="flex items-center">
						<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="Logo" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2 max-w-[60px] max-h-[55px]" />
					</div>
				</div>
				<div className="flex flex-col-reverse w-full h-full px-5 overflow-y-auto overflow-x-hidden">
					<ul className="list-disc text-sky-300 mx-[10%] h-full space-y-6">
						<li>Caso deseja Iniciar uma Conversa com o HelpDesk basta digitar a mensagem no campo abaixo e envia-la, após enviar basta aguardar que um profissinal ira atende-lo</li>
						<li>Não carregou? ou apareceu um erro? tente recarregar a página, caso não resolva entre em contato com o fornecedor</li>
						<li>Aviso!!! Após encerrado, o chamado não poderá ser acessado novamente</li>
					</ul>
				</div>
				<div className="flex items-end w-full">
					<form onSubmit={handleIniciarChamados} className="w-full flex justify-center items-center py-[10px] px-[20px] border-t-[1px] border-neutral-700">
						<input
							type="text"
							className="w-[80%] bg-gradient-to-r from-blue-950 to-cyan-950 border-0 rounded-[6px] text-white"
							placeholder="Digite sua Mensagem"
							value={enviarMensagem} onChange={(e) => setEviarMensagem(e.target.value)}
						/>
						<button type="submit" className="px-[20px] py-[10px] bg-blue-600 text-white ml-[10px] rounded-[8px]"><SendHorizontal /></button>
					</form>
				</div>
	
			</div>
		);
	}



	return (
		<div className="text-blue-500 h-full w-full flex flex-col max-w-[1300px]">
			<div className="flex justify-between py-[10px] px-[20px] mb-[30px] border-b-[1px] border-neutral-700">
				<div className="flex items-center">
					<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="Logo" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2 max-w-[60px] max-h-[55px]" />
					<h1>{outraPessoa}</h1>
				</div>
				<button onClick={OpenConcluirChamados} className="bg-transparent border-[1px] border-blue-500 px-5 hover:bg-blue-500 rounded-[10px] text-blue-300 hover:text-white max-[450px]:w-[100px]">Finalizar Chamado</button>
			</div>
			<div className="flex flex-col-reverse w-full h-full px-5 overflow-y-auto overflow-x-hidden">
				{reversedMessages.map((mensagem, index) => (
					<div key={index} className={`flex items-start mb-4 ${mensagem.usuarioId === userData?.id ? 'self-end' : 'self-start'}`}>
						<div className={`flex flex-col ${mensagem.usuarioId === userData?.id ? 'items-end text-white' : 'items-start'}`}>
							<div className="text-white text-[12px]">
								{mensagem.data_envio}
							</div>
							<div className="flex">
							{mensagem.usuarioId !== userData?.id && (
								<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="Avatar" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] mr-2 max-w-[60px] max-h-[55px]" />
							)}
							<div className={`p-[10px] max-w-[200px] overflow-x-auto flex rounded-[10px] ${mensagem.usuarioId === userData?.id ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-white'}`}>
								{mensagem.mensagem}
							</div>
							{mensagem.usuarioId === userData?.id && (
								<img src="https://mailing.bne.com.br/politica-privacidade/img/logo-bne-small-ft.png" alt="Avatar" className="bg-blue-500 rounded-[8px] w-[60px] px-[8px] py-[15px] ml-2 max-w-[60px] max-h-[55px]" />
							)}
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex items-end w-full">
				<form onSubmit={handleSubmitAdd} className="w-full flex justify-center items-center py-[10px] px-[20px] border-t-[1px] border-neutral-700">
					<input
						type="text"
						className="w-[80%] bg-gradient-to-r from-blue-950 to-cyan-950 border-0 rounded-[6px] text-white"
						placeholder="Digite sua Mensagem"
						value={enviarMensagem} onChange={(e) => setEviarMensagem(e.target.value)}
					/>
					<button type="submit" className="px-[20px] py-[10px] bg-blue-600 text-white ml-[10px] rounded-[8px]"><SendHorizontal /></button>
				</form>
			</div>
			{isOpenConcluirChamado && (
				<main className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-neutral-800 p-8 rounded-[8px]">
						<h2 className="text-lg font-semibold mb-4 text-white">Tem Certeza que deseja Finalizar o Chamado?</h2>
						<div className='flex justify-center px-[20px]'>
							<button onClick={CancelarConcluirChamados} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-[8px]">Cancelar</button>
							<button onClick={handleFinalizarChamados} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-[8px] ml-6">Confirmar</button>
						</div>
					</div>
				</main>
			)}

		</div>
	);
}

export default Mensagens;
