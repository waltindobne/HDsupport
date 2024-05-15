"use client"
import { useState, useEffect } from 'react';
import axios from "axios";



const cardAdd = () => {

	const [equipamentos, setEquipamentos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);


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


	return(
		<div>
			<table>
				<thead>
					<tr>
						<th>ID equipamento</th>
						<th>ID usuario</th>
						<th>Nome Usuario</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default cardAdd;