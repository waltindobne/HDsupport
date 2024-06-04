"use client"
import { useEffect, useState } from "react";
import { CircleCheck, CircleGauge, Moon, Rocket, ShieldCheck, Sun } from "lucide-react";
import '@/components/ui/grafico.css'

export default function Grafico(){
    const [darkMode, setDarkMode] = useState(false);
 
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
        <div className={`${darkMode && "dark"}`} >
        <div className="Grafico">   
            <div className="grafico-animado"> 
                <span className="coluna" id="c1"></span> 
                <span className="coluna" id="c2"></span> 
                <span className="coluna" id="c3"></span> 
                <span className="coluna" id="c4"></span> 
                <span className="coluna" id="c5"></span> 
                <span className="coluna" id="c6"></span> 
                <span className="coluna" id="c7"></span> 
                <span className="coluna" id="c8"></span> 
                <span className="coluna" id="c9"></span>
            </div>
        </div>
        </div>
        
    );
}