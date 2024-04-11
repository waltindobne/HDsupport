'use client'
import { useState } from "react";

const CardChamados: React.FC <{title: string; dados: number;}> = ({title, dados}) => {
    return(
        <div className="w-[370px] p-[10px] rounded-[10px] border-2 border-slate-50 space-y-3 h-[100px] bg-black">
            <h1 className="text-slate-50">Chamados <b className="bg-gradient-to-r from-blue-800 to-cyan-500 font-bold inline-block text-transparent bg-clip-text">{title}</b></h1>
            <h1 className="text-slate-50 font-bold text-[20px]">{dados}</h1>
        </div>
    );
}


export default CardChamados;