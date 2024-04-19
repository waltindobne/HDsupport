"use client"
import { useState, useEffect } from 'react';
import {Trash2} from "lucide-react";
import {PencilLine, Search } from "lucide-react";
import {FolderPlus} from "lucide-react";
import { FolderKanban } from 'lucide-react';
import { Input } from './input';
import axios from 'axios';
import Dados from '../ui/dadosEqp.json';

{/*neutral-950 slate-50 black blue-800*/}

const Equipamento = () => {
	const [equipamentos, setEquipamentos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedEquipamentos = [...equipamentos, newEquipamento];
        setEquipamentos(updatedEquipamentos);
        closeModalAdd();
    };
	
	const handleOpenEditModal = (equipamento) => {
		setEditingEquipamento(equipamento);
		setIsOpenEdit(true);
	};

	const handleEditEquipamento = (updatedEquipamento) => {
		const updatedEquipamentos = equipamentos.map(equipamento => {
			if (equipamento.id === updatedEquipamento.id) {
				return updatedEquipamento;
			}
			return equipamento;
		});
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
		setSelectedEquipamento(equipamento);
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
			<div className="w-[95%] h-[500px]  border-2 bg-black border-slate-50 rounded-[5px]">
				<div className="w-full flex items-center bg-black  justify-between p-[20px] px-[40px]  rounded-t-md mb-[10px]">
					<div>
						<h1 className="text-[24px]">Gerenciar <b>Equipamentos</b></h1>
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
							<form onSubmit={handleSubmit} className='text-white'>
							<div className="mb-4 mt-4">
								<input
								type="number"
								value={newEquipamento.idPatrimonio}
								onChange={handleInputChangeAdd}
								name="idPatrimonio"
								placeholder='Digite o ID de Patrimônio'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={newEquipamento.modelo}
								onChange={handleInputChangeAdd}
								name="modelo"
								placeholder='Digite o Modelo'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
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
				{isOpenEdit && editingEquipamento && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-neutral-800 p-4 pt-6 px-6 rounded-[8px] w-[400px] ">
							<div className='flex justify-between'> 
								<h1 className='text-white text-[20px]'>Editar Equipamento</h1>
								<button onClick={closeModalEdit} className=" bg-red-500 hover:bg-red-600 text-white py-0 px-3 rounded-[8px] float-right">x</button>
							</div>
							<form onSubmit={handleEditEquipamento} className='text-white'>
							<div className="mb-4 mt-4">
								<input
								type="number"
								value={editingEquipamento.idPatrimonio}
								onChange={handleInputChangeEdit}
								name="idPatrimonio"
								placeholder='Digite o ID de Patrimônio'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={editingEquipamento.modelo}
								onChange={handleInputChangeEdit}
								name="modelo"
								placeholder='Digite o Modelo'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
								value={editingEquipamento.processador}
								onChange={handleInputChangeEdit}
								name="processador"
								placeholder='Digite o Processador'
								className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
								/>
							</div>
							<div className="mb-4 mt-4">
								<input
								type="text"
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
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Processador</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.processador}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Sistema Operacional</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.sistemaOperacional}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">HeadSet</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.headSet}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Status Equipamento</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedEquipamento.statusEquipamento}</td> </tr>
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