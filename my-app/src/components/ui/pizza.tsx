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
    ["Ocupado", equipamentosData[0] || 1],
    ["Danificado", equipamentosData[1] || 2],
    ["Em Reparo", equipamentosData[2] || 3],
    ["Disponivel", equipamentosData[3] || 4]
  ];
  const options = {
    title: 'Gráfico de Equipamentos por Status',
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
    <div className="w-[50%] max-[1160px]:w-[100%] max-[1160px]:mt-[15px] mr-[10px] ml-[15px] max-[450px]:ml-0 max-[450px]:mr-0">
      <div className="flex justify-start max-[820px]:w-[100%] max-[820px]:justify-center">
        <div className="h-[430px] w-[90%] max-[450px]:w-full dark:border-black bg-white border-2 border-slate-50 rounded-[10px] flex items-center justify-center max-[1160px]:h-[325px] max-[820px]:w-[100%] max-[450px]:rounded-0">
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"100%"}
            height={"100%"}
          />
      </div>
      </div>
    </div>
    
  );
}
