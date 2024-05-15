"use client"
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import {Headset, Replace, Router, Trash2} from "lucide-react";
=======
import {Trash2} from "lucide-react";
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
import {PencilLine, Search } from "lucide-react";
import {FolderPlus} from "lucide-react";
import { FolderKanban } from 'lucide-react';
import { Input } from './input';
import axios from 'axios';
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
=======
import Dados from '../ui/dadosEqp.json';
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f

{/*neutral-950 slate-50 black blue-800*/}

const Equipamento = () => {
	const [equipamentos, setEquipamentos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
	const [itemsPerPage] = useState(7);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredEquipamentos, setFilteredEquipamentos] = useState([]);
	const [selectedEquipamento, setSelectedEquipamento] = useState(null);
	const router = useRouter();

	const [idPatrimonio, setIdPatrimonio] = useState(0);
	const [modelo, setModelo] = useState('');
	const [tipo, setTipo] = useState('Desktop');
	const [detalhes, setDetalhes] = useState('');
	const [statusEquipamento, setStatusEquipamento] = useState(1);
	const [updatedEquipamentos, setUpdatedEquipamentos] = useState(null);
	
	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

	const fetchData = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			const response = await axios.get('https://hd-support-api.azurewebsites.net/api/Equipamentos/Lista-Equipamentos', {
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
				setEquipamentos(data);
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


	const statusEquipamentos = [
		"Status Não Definido",
		"Disponivel",
		"Emprestado",
		"Danificado",
		"Em Reparo"
	]
	const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
	const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        console.log(tipo);
		try {
			const response = await axios.post('https://hd-support-api.azurewebsites.net/api/Equipamentos/Registro-Equipamentos',  { 
					idPatrimonio,
					modelo,
					tipo,
					detalhes,
					statusEquipamento
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}
			);
			
			console.log('Equipamento adicionado com sucesso:', response.data);
		} catch (error) { 
			console.error('Erro ao adicionar equipamento:', error); 
		}
    };
=======
	const [itemsPerPage] = useState(6);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredEquipamentos, setFilteredEquipamentos] = useState([]);
	const [selectedEquipamento, setSelectedEquipamento] = useState(null);

	localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IndhbHRlckBlbXBsb3llci5jb20uYnIiLCJyb2xlIjoiR2VyZW50ZSIsIm5iZiI6MTcxMjg2NTM5MSwiZXhwIjoxNzEyODk0MTkxLCJpYXQiOjE3MTI4NjUzOTF9.pqmGGWGakn3uV7h-L2G7YncMY2O8h1WZIvm31KXcMlE');
	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

	const [newEquipamento, setNewEquipamento] = useState({
        idPatrimonio: "",
		modelo: "",
		processador: "",
		sistemaOperacional: "",
		headSet: "",
		statusEquipamento: ""
    });
    const [editingEquipamento, setEditingEquipamento] = useState({
		idPatrimonio: "",
		modelo: "",
		processador: "",
		sistemaOperacional: "",
		headSet: "",
		statusEquipamento: ""
	});

	const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
	const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

	const handleInputChangeAdd = (event) => {
		const { name, value } = event.target;
		setNewEquipamento({ ...newEquipamento, [name]: value });
	  };
	const handleInputChangeEdit = (event) => {
		const { name, value } = event.target;
		setEditingEquipamento({ ...editingEquipamento, [name]: value });
	  };

>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedEquipamentos = [...equipamentos, newEquipamento];
        setEquipamentos(updatedEquipamentos);
        closeModalAdd();
    };
<<<<<<< HEAD
=======
	
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
	const handleOpenEditModal = (equipamento) => {
		setEditingEquipamento(equipamento);
		setIsOpenEdit(true);
	};
<<<<<<< HEAD
	const handleEditEquipamento = async (updatedEquipamento) => {
=======

	const handleEditEquipamento = (updatedEquipamento) => {
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
		const updatedEquipamentos = equipamentos.map(equipamento => {
			if (equipamento.id === updatedEquipamento.id) {
				return updatedEquipamento;
			}
			return equipamento;
		});
<<<<<<< HEAD
		console.log(updatedEquipamento.idPatrimonio);
		setEquipamentos(updatedEquipamentos);
		closeModalEdit();
		try {
			console.log(`https://hd-support-api.azurewebsites.net/api/Equipamentos/Editar-Maquina/${updatedEquipamento.id}`);
			const response = await axios.put(`https://hd-support-api.azurewebsites.net/api/Equipamentos/Editar-Maquina/${updatedEquipamento.id}`,{ 
					idPatrimonio,
					modelo,
					detalhes,
					statusEquipamento
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}
			);
			console.log(`Equipamento Editado com sucesso: ${id}`);
		} catch (error) { 
			console.error('Erro ao Editar equipamento:', error); 
		}
	};

	const handleDeleteEquipamento = async (id) => {
		const updatedEquipamentos = equipamentos.filter(equipamento => equipamento.id !== id);
		setEquipamentos(updatedEquipamentos);
		closeModalComfirmDel();
        try {
			console.log(typeof id);
			console.log(`https://hd-support-api.azurewebsites.net/api/Equipamentos/Excluir-Maquina/${id}`);
			const response = await axios.post(`https://hd-support-api.azurewebsites.net/api/Equipamentos/Excluir-Maquina/${id}`,{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}
			);
			console.log(`Equipamento Deletado com sucesso: ${id}`);
		} catch (error) { 
			console.error('Erro ao Deletar equipamento:', error); 
		}
=======
		setEquipamentos(updatedEquipamentos);
		closeModalEdit();
	};

	const fetchData = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			const response = await axios.get('', {
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

	const handleDeleteEquipamento = (id) => {
		const updatedEquipamentos = equipamentos.filter(equipamento => equipamento.id !== id);
		setEquipamentos(updatedEquipamentos);
		closeModalComfirmDel();
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
	};

	{/*Abrir Adicionar*/}
	const [isOpenAdd, setIsOpenAdd] = useState(false);

	const openModalAdd = () => {
		setIsOpenAdd(true);
	};

	const closeModalAdd = () => {
		setIsOpenAdd(false);
	};

	{/*Abrir Edit*/}
	const [isOpenEdit, setIsOpenEdit] = useState(false);

	const openModalEdit = (equipamento) => {
<<<<<<< HEAD
		setUpdatedEquipamentos(equipamento);
=======
		setSelectedEquipamento(equipamento);
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
		setIsOpenEdit(true);
	};

	const closeModalEdit = () => {
		setIsOpenEdit(false);
	};

	{/*Abrir detalhes*/}
	const [isOpenDetail, setIsOpenDetail] = useState(false);

	const openModalDetail = (equipamento) => {
		setSelectedEquipamento(equipamento);
		setIsOpenDetail(true);
	};

	const closeModalDetail = () => {
		setIsOpenDetail(false);
	};
	{/*Abrir Comfirmar Excluir*/}
	const [isOpenComfirmDel, setIsOpenComfirmDel] = useState(false);

	const openModalComfirmDel = (equipamento) => {
		setSelectedEquipamento(equipamento);
		setIsOpenComfirmDel(true);
	};

	const closeModalComfirmDel = () => {
		setIsOpenComfirmDel(false);
	};
	useEffect(() => {
		const results = equipamentos.filter(equipamento => {
			return Object.values(equipamento).some(value =>
			  typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
			);
		  });
		  setFilteredEquipamentos(results);
	  }, [equipamentos, searchTerm]);
	
	  // Lidando com a alteração no termo de pesquisa
	  const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	  };
	
	  // Paginação
	  const paginate = pageNumber => setCurrentPage(pageNumber);
	  const indexOfLastItem = currentPage * itemsPerPage;
	  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	  const currentItems = filteredEquipamentos.slice(indexOfFirstItem, indexOfLastItem);

	useEffect(() => {
		setEquipamentos(Dados);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const results = equipamentos.filter(equipamento => {
			return Object.values(equipamento).some(value =>
			  typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
			);
		  });
		  setFilteredEquipamentos(results);
	  }, [equipamentos, searchTerm]);
	
	  // Lidando com a alteração no termo de pesquisa
	  const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	  };
	
	  // Paginação
	  const paginate = pageNumber => setCurrentPage(pageNumber);
	  const indexOfLastItem = currentPage * itemsPerPage;
	  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	  const currentItems = filteredEquipamentos.slice(indexOfFirstItem, indexOfLastItem);

	return(
		<div className="flex items-center justify-center bg-950 w-full h-full">
<<<<<<< HEAD
			<div className="w-[95%] h-[550px]  border-2 bg-black border-slate-50 rounded-[5px]">
=======
			<div className="w-[95%] h-[500px]  border-2 bg-black border-slate-50 rounded-[5px]">
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
				<div className="w-full flex items-center bg-black  justify-between p-[20px] px-[40px]  rounded-t-md mb-[10px]">
					<div>
						<h1 className="text-[24px] w-[300px]">Gerenciar <b>Equipamentos</b></h1>
					</div>
					<form className="flex items-center justify-center bg-gradient-to-r from-blue-950 to-cyan-950 pr-4 rounded-xl">
						<input
							type="text"
							placeholder="Pesquisar por..."
							value={searchTerm}
							onChange={handleSearchChange}
							className="form-input bg-transparent text-white px-4 py-2 rounded-xl border-none focus:ring-0 w-[400px]"
						/>
						<button type="submit"><Search className='text-blue-50'/></button>
					</form>
					<div className="space-x-2 flex items-center">
						{/*<button className="bg-[#dc3545] px-[10px] py-[8px] rounded-[5px] text-[14px] flex"> <Trash2 className="mr-[5px]"/> Excluir</button>*/}
						<button className="bg-gradient-to-r from-blue-800 to-cyan-500 px-[10px] py-[8px] rounded-[5px] text-[14px] flex" onClick={openModalAdd}> <FolderPlus className="mr-[5px]"/> Adicionar novo Equipamento</button>
					</div>
				</div>
<<<<<<< HEAD
				<div className='flex flex-col justify-between h-[84%]'>
					<table className="text-slate-100  w-full bg-neutral-900">
						<thead className="h-[45px]">
							<tr className="text-blue-500">
								<th className="" scope="col">Id Patrimônio</th>
								<th className="" scope="col">Modelo</th>
								<th className="" scope="col">Tipo do Equipamento</th>
								<th className="" scope="col">Status Equipamento</th>
								<th className="" scope="col">Ações</th>
							</tr>
						</thead>
						{/*linha dados do crud*/}
						<tbody className="">
							{currentItems.map((equipamento, index) => (
								<tr key={index} className="h-[50px] border-y">
									<td className="text-center">{equipamento.idPatrimonio}</td> 
									<td className="text-center">{equipamento.modelo}</td>
									<td className="text-center">{equipamento.tipo}</td>
									<td className="text-center">{statusEquipamentos[equipamento.statusEquipamento]}</td>
									<td className="flex justify-center mt-[10px]">
									<button onClick={() => openModalComfirmDel(equipamento)}><Trash2 className="text-blue-700" /></button>
									<button onClick={() => openModalDetail(equipamento)}><FolderKanban className="text-sky-600 ml-[8px]" /></button>
									<button onClick={() => openModalEdit(equipamento)}><PencilLine className="text-cyan-500 ml-[8px]" /></button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex justify-center pb-[15px]">
						{[...Array(Math.ceil(filteredEquipamentos.length / itemsPerPage)).keys()].map((number) => (
						<button key={number} onClick={() => paginate(number + 1)} className={` ${currentPage === number + 1 ? 'text-white' : 'text-neutral-500'} mx-1 px-3 py-1 bg-gray-800 rounded-[8px]`}>{number + 1}</button>
						))}
					</div>
=======
				<table className="text-slate-100  w-full bg-neutral-900">
					<thead className="h-[45px]">
						<tr className="text-blue-500">
							<th className="" scope="col">Id Patrimônio</th>
							<th className="" scope="col">Modelo</th>
							<th className="" scope="col">Processador</th>
							<th className="" scope="col">Sistema Operacional</th>
							<th className="" scope="col">HeadSet</th>
							<th className="" scope="col">Status Equipamento</th>
							<th className="" scope="col">Ações</th>
						</tr>
					</thead>
					{/*linha dados do crud*/}
					<tbody className="">
						{currentItems.map((equipamento, index) => (
							<tr key={index} className="h-[50px] border-y">
								<td className="text-center">{equipamento.idPatrimonio}</td> 
								<td className="text-center">{equipamento.modelo}</td> 
								<td className="text-center">{equipamento.processador}</td>
								<td className="text-center">{equipamento.sistemaOperacional}</td>
								<td className="text-center">{equipamento.headSet}</td>
								<td className="text-center">{equipamento.statusEquipamento}</td>
								<td className="flex justify-center mt-[10px]">
								<button onClick={() => openModalComfirmDel(equipamento)}><Trash2 className="text-blue-700" /></button>
								<button onClick={() => openModalDetail(equipamento)}><FolderKanban className="text-sky-600 ml-[8px]" /></button>
								<button onClick={() => openModalEdit(selectedEquipamento)}><PencilLine className="text-cyan-500 ml-[8px]" /></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex justify-center mt-4">
					{[...Array(Math.ceil(filteredEquipamentos.length / itemsPerPage)).keys()].map((number) => (
					<button key={number} onClick={() => paginate(number + 1)} className="mx-1 px-3 py-1 bg-gray-800 text-white rounded-[8px]">{number + 1}</button>
					))}
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
				</div>
			</div>
			<div>
				{isOpenAdd && (
					<div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
						<div className="bg-neutral-800 p-4 pt-6 px-6 rounded-[8px] w-[400px] ">
							<div className='flex justify-between'> 
								<h1 className='text-white text-[20px]'>Cadastro de Equipamento</h1>
								<button onClick={closeModalAdd} className=" bg-red-500 hover:bg-red-600 text-white py-0 px-3 rounded-[8px] float-right">x</button>
							</div>
<<<<<<< HEAD
							<form onSubmit={handleSubmitAdd} className='text-white'>
							<div className="mb-4 mt-4">
								<input
								type="number"
								value={idPatrimonio} onChange={(e) => setIdPatrimonio(parseInt(e.target.value))}
=======
							<form onSubmit={handleSubmit} className='text-white'>
							<div className="mb-4 mt-4">
								<input
								type="number"
								value={newEquipamento.idPatrimonio}
								onChange={handleInputChangeAdd}
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
								name="idPatrimonio"
								placeholder='Digite o ID de Patrimônio'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
<<<<<<< HEAD
								value={modelo} onChange={(e) => setModelo(e.target.value)}
=======
								value={newEquipamento.modelo}
								onChange={handleInputChangeAdd}
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
								name="modelo"
								placeholder='Digite o Modelo'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
<<<<<<< HEAD
							<div className="mb-4 mt-4 text-neutral-400">
								<select className='bg-neutral-700 w-full' value={tipo} onChange={(e) => setTipo(e.target.value)} required>
									<option value="Desktop" selected>Desktop</option>
									<option value="Notebook">Notebook</option>
									<option value="Teclado">Teclado</option>
									<option value="Mouse">Mouse</option>
									<option value="Monitor">Monitor</option>
									<option value="Webcam">Webcam</option>
									<option value="Headset">Headset</option>
								</select>
							</div>
							<div className="mb-4 mt-4">
								<textarea
								value={detalhes} onChange={(e) => setDetalhes(e.target.value)}
								name="processador"
								placeholder='Digite os Detalhes do Equipamento'
								className="resize-none mt-1 w-full bg-neutral-700 p-1 rounded-[8px] px-4"
								rows={10}
								maxLength={350}
								/>
							</div>
							<div className="mb-4 mt-4 text-neutral-400">
								<label htmlFor="">Status do Equipamento</label>
								<select className='bg-neutral-700 w-full' value={statusEquipamento} onChange={(e) => setStatusEquipamento(parseInt(e.target.value))} required>
									<option value="1">Disponivel</option>
									<option value="2">Ocupado</option>
									<option value="3">Danificado</option>
									<option value="4">Em Reparo</option>
								</select>
=======
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={newEquipamento.processador}
								onChange={handleInputChangeAdd}
								name="processador"
								placeholder='Digite o Processador'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={newEquipamento.sistemaOperacional}
								onChange={handleInputChangeAdd}
								name="sistemaOperacional"
								placeholder='Digite o Sistema Operacional'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={newEquipamento.headSet}
								onChange={handleInputChangeAdd}
								name="headSet"
								placeholder='Digite o HeadSet'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={newEquipamento.statusEquipamento}
								onChange={handleInputChangeAdd}
								name="statusEquipamento"
								placeholder='Status do Equipamento'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
							</div>
								<div className='flex justify-center'>
									<button type="submit" className="bg-gradient-to-r from-blue-800 to-cyan-500 text-white py-2 px-4 rounded-[8px] w-full mt-2">Enviar</button>
								</div>
							</form>
						</div>
					</div>
				)}
    		</div>
			<div>
<<<<<<< HEAD
				{isOpenEdit && updatedEquipamentos && (
=======
				{isOpenEdit && editingEquipamento && (
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-neutral-800 p-4 pt-6 px-6 rounded-[8px] w-[400px] ">
							<div className='flex justify-between'> 
								<h1 className='text-white text-[20px]'>Editar Equipamento</h1>
								<button onClick={closeModalEdit} className=" bg-red-500 hover:bg-red-600 text-white py-0 px-3 rounded-[8px] float-right">x</button>
							</div>
<<<<<<< HEAD
							<form onSubmit={handleEditEquipamento(updatedEquipamentos)} className='text-white'>
							<input type="text" hidden  value={updatedEquipamentos.id} onChange={(e) => setUpdatedEquipamentos({...updatedEquipamentos, id: parseInt(e.target.value)}) }/>
							<div className="mb-4 mt-4">
								<input
								type="number"
								value={updatedEquipamentos.idPatrimonio} onChange={(e) => setUpdatedEquipamentos({...updatedEquipamentos, idPatrimonio: parseInt(e.target.value)}) }
=======
							<form onSubmit={handleEditEquipamento} className='text-white'>
							<div className="mb-4 mt-4">
								<input
								type="number"
								value={editingEquipamento.idPatrimonio}
								onChange={handleInputChangeEdit}
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
								name="idPatrimonio"
								placeholder='Digite o ID de Patrimônio'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
<<<<<<< HEAD
								value={updatedEquipamentos.modelo} onChange={(e) => setUpdatedEquipamentos({...updatedEquipamentos, modelo:e.target.value})}
=======
								value={editingEquipamento.modelo}
								onChange={handleInputChangeEdit}
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
								name="modelo"
								placeholder='Digite o Modelo'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
<<<<<<< HEAD
								value={updatedEquipamentos.detalhes} onChange={(e) => setUpdatedEquipamentos({...updatedEquipamentos, detalhes:e.target.value})}
								name="processador"
								placeholder='Digite os Detalhes do Equipamento'
=======
								value={editingEquipamento.processador}
								onChange={handleInputChangeEdit}
								name="processador"
								placeholder='Digite o Processador'
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
<<<<<<< HEAD
								value={updatedEquipamentos.statusEquipamento} onChange={(e) => setUpdatedEquipamentos({...updatedEquipamentos, statusEquipamento: parseInt(e.target.value)})}
=======
								value={editingEquipamento.sistemaOperacional}
								onChange={handleInputChangeEdit}
								name="sistemaOperacional"
								placeholder='Digite o Sistema Operacional'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={editingEquipamento.headSet}
								onChange={handleInputChangeEdit}
								name="headSet"
								placeholder='Digite o HeadSet'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={editingEquipamento.statusEquipamento}
								onChange={handleInputChangeEdit}
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
								name="statusEquipamento"
								placeholder='Status do Equipamento'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
								<div className='flex justify-center'>
									<button type="submit" className="bg-gradient-to-r from-blue-800 to-cyan-500 text-white py-2 px-4 rounded-[8px] w-full mt-2">Enviar</button>
								</div>
							</form>
						</div>
					</div>
				)}
    		</div>
			<div>
			{isOpenDetail && selectedEquipamento && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
						<div className=" p-4 px-6 rounded-[8px] w-[600px] bg-neutral-800 ">
							<div className='flex justify-between mb-5 items-center'>
								<h1 className='text-white text-[21px]'>Detalhes Equipamento</h1>
								<button onClick={closeModalDetail} className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-[8px] float-right">x</button>
							</div>
							<table className='w-full'>
                                <tbody>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">ID Patrimônio</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.idPatrimonio}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Modelo</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.modelo}</td> </tr>
<<<<<<< HEAD
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Tipo do Equipamento</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.tipo}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Detalhes</th><td className="text-center max-w-[300px] max-h-[100px] mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.detalhes}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Status Equipamento</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{statusEquipamentos[selectedEquipamento.statusEquipamento]}</td> </tr>
=======
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Processador</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.processador}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Sistema Operacional</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.sistemaOperacional}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">HeadSet</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.headSet}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Status Equipamento</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.statusEquipamento}</td> </tr>
>>>>>>> 0e6aebe6ad8896d35bc0793fd6ae949c6a77881f
                                </tbody>
                            </table>
						</div>
					</div>
				)}
    		</div>
			<div>
				{isOpenComfirmDel && selectedEquipamento && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-neutral-800 p-8 rounded-[8px]">
						<h2 className="text-lg font-semibold mb-4 text-white">Tem Certeza que deseja Excluir o Equipamento?</h2>
						<div className='flex justify-center px-[20px]'>
							<button onClick={closeModalComfirmDel} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-[8px]">Cancelar</button>
							<button onClick={() => handleDeleteEquipamento(selectedEquipamento.id)} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-[8px] ml-6">Confirmar</button>
						</div>
					</div>
					</div>
				)}
    		</div>
		</div>
	);
};


export default Equipamento;