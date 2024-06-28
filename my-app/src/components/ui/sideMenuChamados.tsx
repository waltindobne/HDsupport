'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import {MessageCircleMore, Gauge, Table, BarChart4, Search, Settings, SendHorizontal , EllipsisVertical } from "lucide-react";

const SideMenuChamados = () => {
	const router = useRouter();
    const redirectTo = (path: string) => () => {
        router.push(path);
    }/*
    const option: Option[] = [
        {
            title: 'Painel',
            svg: IconDash,
            path: '/dashmenu',
        },
        {
            title: 'Chat',
            svg: IconChat,
            path: '/chat',
        },
        {
            title: 'Tabelas',
            svg: IconTable,
            path: '/tabelas',
        },
        {
            title: 'Chamados',
            svg: IconChat,
            path: '/chat',
        },
    ]
*/
	return (
		<div className="border-r-2 border-neutral-400 w-[50px] h-[100%] py-3 flex flex-col text-blue-500 text-9xl">
			<ul className="h-full flex flex-col items-center">
				<li className="pb-2"><MessageCircleMore/></li>
				<li className="pb-2"><Gauge/></li>
				<li className="pb-2"><Table/></li>
				<li className="pb-2"><BarChart4/></li>
			</ul>
			<ul className="flex flex-col items-center">
				<li className="pb-2"><Settings/></li>
			</ul>
		</div>
	);
}

export default SideMenuChamados;