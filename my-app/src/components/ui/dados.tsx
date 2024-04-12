'use client'
import { Title } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Dados(){
     const data = [
        ["Year", "Sales", "Expenses"],
        ["2013", 1000, 400],
        ["2014", 1170, 460],
        ["2015", 660, 1120],
        ["2016", 1030, 540],
        ["2013", 1000, 400],
        ["2014", 1170, 460],
      ];
      
       const options = {
        title: "Company Performance",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
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
      
      
    return( 
      <div className="w-[56%]">
        <div className={`${darkMode && "dark"}`}>
            <div className="w-[93%] dark:border-black bg-white rounded-[15px] border-2 border-slate-50 h-[330px] flex items-center">
                <Chart
                chartType="LineChart"
                data={[["Mês", "Frequência"], [100, 5.5], [8, 12], [20, 1]]}
                width="95%"
                height="300px"
                legendToggle
                />
            </div>
          </div>
      </div>
    );
}