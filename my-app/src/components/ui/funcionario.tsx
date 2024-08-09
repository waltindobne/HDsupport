"use client"
import { useState, useEffect } from 'react';
import {Trash2, Search} from "lucide-react";
import {PencilLine } from "lucide-react";
import {FolderPlus} from "lucide-react";
import { FolderKanban } from 'lucide-react';
import axios from 'axios';

type Funcionario = {
	id: number;
	nome: string;
	email: string;
	senha: string;
	telefone: string;
	cargo: string;
};

const Funcionario = () => {
	const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(7);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredFuncionarios, setFilteredFuncionarios] = useState<Funcionario[]>([]);
	const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
	const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null);
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('@bne2024');
	const [telefone, setTelefone] = useState('');
	const [cargo, setCargo] = useState('funcionario');
	const [nomeUpdated, setNomeUpdated] = useState('');
	const [emailUpdated, setEmailUpdated] = useState('');
	const [senhaUpdated, setSenhaUpdated] = useState('');
	const [telefoneUpdated, setTelefoneUpdated] = useState('');
	const [cargoUpdated, setCargoUpdated] = useState('funcionario');
		
	const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  
	const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
	const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);


	const handleSubmitAdd = async (event) => {
		event.preventDefault();
        try {
			const response = await axios.post('https://testing-api.hdsupport.bne.com.br/api/Usuario/Registro',  { 
					nome,
					email,
					senha,
					telefone,
					cargo
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}
			);
			
			console.log('Funcionário adicionado com sucesso:', response.data);
		} catch (error) { 
			console.error('Erro ao adicionar Funcionário:', error); 
		}
	};
	const handleInputChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (selectedFuncionario) {
			setEditingFuncionario({
				...selectedFuncionario,
				[name]: value
			});
		}
	};
	
	const handleEditFuncionario = async (event) => {
		event.preventDefault();
		if (selectedFuncionario) {
			const updatedFuncionario = {
				...selectedFuncionario,
				nome: nomeUpdated,
				email: emailUpdated,
				senha: senhaUpdated,
				telefone: telefoneUpdated,
				cargo: cargoUpdated,
			};
			try {
				const response = await axios.put(
					`https://testing-api.hdsupport.bne.com.br/api/Usuario/Editar-Usuario/${selectedFuncionario.id}`,
					updatedFuncionario,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						}
					}
				);
				console.log(`Funcionario Editado com sucesso: ${selectedFuncionario.id}`);
				const updatedFuncionarios = funcionarios.map(func => 
					func.id === selectedFuncionario.id ? updatedFuncionario : func
				);
				setFuncionarios(updatedFuncionarios);
				closeModalEdit();
			} catch (error) {
				console.error('Erro ao Editar Funcionario:', error);
			}
		}
	};

	const fetchData = async (token: string | null) => { // Definindo explicitamente o tipo do parâmetro token
		try {
			if(token) {
			const response = await axios.get('https://testing-api.hdsupport.bne.com.br/api/Usuario/Lista-Funcionarios', {
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

	const handleDeleteFuncionario = async (id) => {
		const updatedFuncionarios = funcionarios.filter(funcionario => funcionario.id !== id);
		setFuncionarios(updatedFuncionarios);
		closeModalComfirmDel();
		try {
			console.log(token);
			const response = await axios.post(`https://testing-api.hdsupport.bne.com.br/api/Usuario/Excluir-Usuario/${id}`, {},{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(`Funcionário Deletado com sucesso: ${id}`);
		} catch (error) { 
			console.error('Erro ao Deletar Funcionário:', error); 
		}
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

		const openModalEdit = (funcionario) => {
			setSelectedFuncionario(funcionario);
			setIsOpenEdit(true);
		};		
		  

		const closeModalEdit = () => {
			setIsOpenEdit(false);
		};

		{/*Abrir detalhes*/}
		const [isOpenDetail, setIsOpenDetail] = useState(false);

		const openModalDetail = (funcionario) => { // Modificar para receber o funcionário como parâmetro
			setSelectedFuncionario(funcionario); // Armazenar o funcionário selecionado no estado
			setIsOpenDetail(true);
		  };

		const closeModalDetail = () => {
			setIsOpenDetail(false);
		};
		{/*Abrir Comfirmar Excluir*/}
		const [isOpenComfirmDel, setIsOpenComfirmDel] = useState(false);

		const openModalComfirmDel = (funcionario) => {
			setSelectedFuncionario(funcionario);
			setIsOpenComfirmDel(true);
		};

		const closeModalComfirmDel = () => {
			setIsOpenComfirmDel(false);
		};
		useEffect(() => {
			if (token) {
				fetchData(token)
				.then((data) => {
					setFuncionarios(data);
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
		
		  // Filtrando os funcionários com base no termo de pesquisa
		  useEffect(() => {
			const results = funcionarios.filter(funcionario => {
			  return Object.values(funcionario).some(value =>
				typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
			  );
			});
			setFilteredFuncionarios(results);
		  }, [funcionarios, searchTerm]);
		
		  // Lidando com a alteração no termo de pesquisa
		  const handleSearchChange = event => {
			setSearchTerm(event.target.value);
		  };
		
		  // Paginação
		  const paginate = pageNumber => setCurrentPage(pageNumber);
		  const indexOfLastItem = currentPage * itemsPerPage;
		  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		  const currentItems = filteredFuncionarios.slice(indexOfFirstItem, indexOfLastItem);

	return(
		<div className="flex items-center justify-center  w-full h-full">
			<div className="w-[95%] h-[550px] bg-black border-2 border-slate-50 rounded-[5px]">
				<div className="w-full flex items-center  justify-between p-[20px] px-[40px] bg-black rounded-t-md mb-[10px]">
					<div>
						<h1 className="text-[24px] w-[300px]">Gerenciar <b>Funcionários</b></h1>
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
						<button className="bg-gradient-to-r from-blue-800 to-cyan-500 px-[10px] py-[8px] rounded-[5px] text-[14px] flex" onClick={openModalAdd}> <FolderPlus className="mr-[5px]"/> Adicionar novo Funcionário</button>
					</div>
				</div>
				<div className='flex flex-col justify-between h-[84%]'>
					<table className="text-slate-100 bg-neutral-900 w-full">
						<thead className="h-[45px]">
							<tr className="text-blue-500">
								<th className="w-[20%]" scope="col">Nome</th>
								<th className="w-[20%]" scope="col">Email</th>
								<th className="w-[20%]" scope="col">Telefone</th>
								<th className="w-[20%]" scope="col">Ações</th>
							</tr>
						</thead>
						{/*linha dados do crud*/}
						<tbody>
						{currentItems.map((funcionario, index) => (
							<tr key={index} className="h-[50px] border-y">
								<td className="text-center">{funcionario.nome}</td> 
								<td className="text-center">{funcionario.email}</td> 
								<td className="text-center">{funcionario.telefone}</td>
								<td className="flex justify-center mt-[10px]">
								<button onClick={() => openModalComfirmDel(funcionario)}><Trash2 className="text-blue-700" /></button>
								<button onClick={() => openModalDetail(funcionario)}><FolderKanban className="text-sky-600 ml-[8px]" /></button>
								<button onClick={() => openModalEdit(funcionario)}><PencilLine className="text-cyan-500 ml-[8px]" /></button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
					<div className="flex justify-center pb-[15px]">
					{Array.from(Array(Math.ceil(filteredFuncionarios.length / itemsPerPage)).keys()).map((number) => (
						<button
						key={number}
						onClick={() => paginate(number + 1)}
						className={` ${currentPage === number + 1 ? 'text-white' : 'text-neutral-500'} mx-1 px-3 py-1 bg-gray-800 rounded-[8px]`}
						>
						{number + 1}
						</button>
					))}
					</div>
				</div>
				
			</div>
			<div>
				{isOpenAdd && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
						<div className="bg-neutral-800 p-4 pt-6 px-6 rounded-[8px] w-[400px] ">
							<div className='flex justify-between'> 
								<h1 className='text-white text-[20px]'>Cadastro de Funcionário</h1>
								<button onClick={closeModalAdd} className=" bg-red-500 hover:bg-red-600 text-white py-0 px-3 rounded-[8px] float-right">x</button>
							</div>
							<form onSubmit={handleSubmitAdd} className='text-white'>
								<div className="mb-4 mt-4">
									<input
									type="text"
									value={nome} onChange={(e) => setNome(e.target.value)}
									name="nome"
									placeholder='Digite o Nome'
									className="form-input mt-1 block w-full bg-neutral-700 p-1  h-11 rounded-[8px] focus:outline-none focus:border-transparent px-4"
									/>
								</div>
								<div className="mb-4 mt-4">
									<input
									type="text"
									value={email} onChange={(e) => setEmail(e.target.value)}
									name="email"
									placeholder='Digite o Email'
									className="form-input mt-1 block w-full bg-neutral-700 p-1  h-11 rounded-[8px] focus:outline-none focus:border-transparent px-4"
									/>
								</div>
								<div className="mb-4 mt-4">
									<input
									type="text"
									value={telefone} onChange={(e) => setTelefone(e.target.value)}
									name="telefone"
									placeholder='Digite o Telefone'
									className="form-input mt-1 block w-full bg-neutral-700 p-1  h-11 rounded-[8px] focus:outline-none focus:border-transparent px-4"
									/>
								</div>
								<div className="mb-4 mt-4">
									<select className='bg-neutral-700 w-full' value={cargo} onChange={(e) => setCargo(e.target.value)} required>
										<option value="RH">RH</option>
										<option value="funcionario">Funcionario</option>
										<option value="HelpDesk">HelpDesk</option>
									</select>
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
				{isOpenEdit && selectedFuncionario && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
						<div className="bg-neutral-800 p-4 pt-6 px-6 rounded-[8px] w-[400px]">
							<div className='flex justify-between'>
								<h1 className='text-white text-[20px]'>Editar Funcionário</h1>
								<button onClick={closeModalEdit} className="bg-red-500 hover:bg-red-600 text-white py-0 px-3 rounded-[8px] float-right">x</button>
							</div>
							<form onSubmit={handleEditFuncionario} className='text-white'>
								<input
									type="hidden"
									value={selectedFuncionario.id}
									onChange={(e) => setSelectedFuncionario({ ...selectedFuncionario, id: parseInt(e.target.value, 10) })}
								/>
								<div className="mb-4 mt-4">
									<input
										type="text"
										value={selectedFuncionario.nome || ''}
										onChange={(e) => setSelectedFuncionario({ ...selectedFuncionario, nome: e.target.value })}
										name="nome"
										placeholder='Digite o Nome'
										className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
									/>
								</div>
								<div className="mb-4 mt-4">
									<input
										type="email"
										value={selectedFuncionario.email || ''}
										onChange={(e) => setSelectedFuncionario({ ...selectedFuncionario, email: e.target.value })}
										name="email"
										placeholder='Digite o Email'
										className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
									/>
								</div>
								<div className="mb-4 mt-4">
									<input
										type="tel"
										value={selectedFuncionario.telefone || ''}
										onChange={(e) => setSelectedFuncionario({ ...selectedFuncionario, telefone: e.target.value })}
										name="telefone"
										placeholder='Digite o Telefone'
										className="mt-1 w-full bg-neutral-700 p-1 h-11 rounded-[8px] px-4"
									/>
								</div>
								<div className="mb-4 mt-4">
									<input
										type="text"
										value={selectedFuncionario.cargo || ''}
										onChange={(e) => setSelectedFuncionario({ ...selectedFuncionario, cargo: e.target.value })}
										name="cargo"
										placeholder='Digite o Cargo'
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
			{isOpenDetail && selectedFuncionario && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="p-4 px-6 rounded-[8px] w-[600px] bg-neutral-800 ">
                        <div className='flex justify-between mb-5 items-center'>
                            <h1 className='text-white text-[21px]'>Detalhes Funcionário</h1>
                            <button onClick={closeModalDetail} className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-[8px] float-right">x</button>
                        </div>
                        <div className=" flex flex-col text-gray-300">
                            <table>
                                <tbody>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Nome</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedFuncionario.nome}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Email</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedFuncionario.email}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Telefone</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedFuncionario.telefone}</td> </tr>
                                    <tr><th className="text-center mt-5 border-b border-neutral-700 py-3">Cargo</th><td className="text-center mb-5 border-b border-neutral-700 py-3">{selectedFuncionario.cargo}</td> </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
    		</div>
			<div>
			{isOpenComfirmDel && selectedFuncionario && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-neutral-800 p-8 rounded-[8px]">
            <h2 className="text-lg font-semibold mb-4 text-white">Tem Certeza que deseja Excluir o Funcionário?</h2>
            <div className='flex justify-center px-[20px]'>
                <button onClick={closeModalComfirmDel} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-[8px]">Cancelar</button>
                <button onClick={() => handleDeleteFuncionario(selectedFuncionario.id)} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-[8px] ml-6">Confirmar</button>
            </div>
        </div>
    </div>
)}

    		</div>
		</div>
	);
};


export default Funcionario;