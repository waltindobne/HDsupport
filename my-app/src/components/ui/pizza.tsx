'use client'
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export default function Pizza() {
  const [equipamentosData, setEquipamentosData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://localhost:7299/api/Equipamentos/Dados-Equipamento-Pizza"
        );
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
    ["Disponível", equipamentosData[0] || 1],
    ["Ocupado", equipamentosData[1] || 1],
    ["Em Reparo", equipamentosData[2] || 10]
  ];
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
      <div className="w-300px h-[330px] dark:border-black bg-white border-2 border-slate-50 rounded-[10px] flex items-center justify-center">
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
