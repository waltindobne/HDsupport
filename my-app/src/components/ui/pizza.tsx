'use client'
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export default function Pizza() {
  
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  const [equipamentosData, setEquipamentosData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      
      try {
        const response = await axios.get('https://hd-support-api.azurewebsites.net/api/Equipamentos/Dados-Equipamento-Pizza',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					}
				});
        setEquipamentosData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  // Converte os dados recebidos para o formato necessário pelo Chart component
  const chartData = [
    ["Task", "Quantidade"],
    ["Ocupado", equipamentosData[0]],
    ["Danificado", equipamentosData[1]],
    ["Em Reparo", equipamentosData[2]],
    ["Disponivel", equipamentosData[3]]
  ];
  const options = {
    title: 'Gráfico de Colunas Empilhado',
  };
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => { 
    setDarkMode(!darkMode); 

    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled')
} 

useEffect(() => {

  const storedMode = localStorage.getItem('darkMode');
  if (storedMode === 'enabled'){
    setDarkMode(true);
  }
},

[]);

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="w-300px h-[430px] dark:border-black bg-white border-2 border-slate-50 rounded-[10px] flex items-center justify-center">
        <Chart
          chartType="PieChart"
          data={chartData}
          width={"500px"}
          height={"300px"}
        />
    </div>
    </div>
    
  );
}
