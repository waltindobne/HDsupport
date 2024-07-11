"use client"
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export default function Dados(){
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  
  // Mova a declaração dos hooks para o início da função do componente
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => { 
    setDarkMode(!darkMode); 
    
    const newMode = !darkMode;
    
    setDarkMode(newMode);
    
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
  };

  const [equipamentosData, setEquipamentosData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://testing-api.hdsupport.bne.com.br/api/Equipamentos/Dados-Equipamento-Barras', {
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

  // Verifica se equipamentosData está carregado
  if (equipamentosData.length === 0) {
    const optionsVazio = {
      title: 'Gráfico de Colunas Empilhado',
      isStacked: true,
    };
    const chartDataVazio = [
      ['Status', 'Ocupado', 'Danificado' ,'Em Reparo' ,'Disponivel', { role: 'annotation' }],
      ['Desktop', 1,1,1,1, ''],
      ['Notebook', 2,2,2,2, ''],
      ['Monitor', 3,3,3,3, ''],
      ['Headset', 5,5,5,5, ''],
      ['Webcam', 7,7,7,7, ''],
      ['Teclado', 10,10,10,10, ''],
      ['Mouse', 14,14,14,14, '']
    ];
    return <div className="w-[50%] max-[1160px]:w-[100%] max-[1160px]:mt-[15px] mr-[10px] ml-[15px] max-[450px]:ml-0 max-[450px]:mr-0">
    <div className="flex justify-end max-[820px]:w-[100%] max-[820px]:justify-start">
      <div className="h-[430px] w-[90%] max-[450px]:w-full dark:border-black bg-white border-2 border-slate-50 rounded-[10px] flex items-center justify-center max-[1160px]:h-[325px] max-[820px]:w-[100%] max-[450px]:rounded-0">
            <Chart
              chartType="ColumnChart"
              data={chartDataVazio}
              options={optionsVazio}
              width="100%"
              height="100%"
              legendToggle
            />
          </div>
        </div>
      </div>;
  }

  const chartData = [
    ['Status', 'Ocupado', 'Danificado' ,'Em Reparo' ,'Disponivel', { role: 'annotation' }],
    ['Desktop', equipamentosData[0][1], equipamentosData[0][2], equipamentosData[0][3], equipamentosData[0][0], ''],
    ['Notebook', equipamentosData[1][1], equipamentosData[1][2], equipamentosData[1][3], equipamentosData[1][0], ''],
    ['Monitor', equipamentosData[2][1], equipamentosData[2][2], equipamentosData[2][3], equipamentosData[2][0], ''],
    ['Headset', equipamentosData[3][1], equipamentosData[3][2], equipamentosData[3][3], equipamentosData[3][0], ''],
    ['Webcam', equipamentosData[4][1], equipamentosData[4][2], equipamentosData[4][3], equipamentosData[4][0], ''],
    ['Teclado', equipamentosData[5][1], equipamentosData[5][2], equipamentosData[5][3], equipamentosData[5][0], ''],
    ['Mouse', equipamentosData[6][1], equipamentosData[6][2], equipamentosData[6][3], equipamentosData[6][0], '']
  ];

  const options = {
    title: 'Gráfico de Colunas Empilhado',
    isStacked: true,
  };
  
  return (
    <div className="w-[50%] max-[1160px]:w-[100%] max-[1160px]:mt-[15px] mr-[10px] ml-[15px] max-[450px]:ml-0 max-[450px]:mr-0">
    <div className="flex justify-end max-[820px]:w-[100%] max-[820px]:justify-start">
      <div className="h-[430px] w-[90%] max-[450px]:w-full dark:border-black bg-white border-2 border-slate-50 rounded-[10px] flex items-center justify-center max-[1160px]:h-[325px] max-[820px]:w-[100%] max-[450px]:rounded-0">
            <Chart
              chartType="ColumnChart"
              data={chartData}
              options={options}
              width="100%"
              height="100%"
              legendToggle
            />
          </div>
        </div>
      </div>
  );
  
}
