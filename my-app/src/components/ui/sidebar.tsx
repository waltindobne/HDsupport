"use client"
import { useRouter } from 'next/navigation';
import { Button } from "./button";
export default function SidebarLeft () {
    const router = useRouter()
    const handleToDash = () => {
        router.push("/")
    }
    const handleToChat = () => {
        router.push("/")
    }
    return(
        <div className="w-[80px] flex flex-col items-center relative top-[35px] left-3 rounded-[10px] bg-black h-[90vh] border-2">
            <header className='mt-2 border-b-2 flex items-center'>
                <Button className='flex items-center h-[60px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradiente2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rocket">
                    <defs>
                    <linearGradient id="gradiente2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="1" />
                    <stop offset="100%" stopColor="blue" stopOpacity="1" />
                    </linearGradient>
                    </defs>
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                    </svg>
                </Button>
            </header>
            <div className="bg-neutral-950 space-y-1 flex flex-col items-center h-80vh mt-6 w-full">
                <div className="w-[260px] h-[60px] items-center flex ">
                    <Button onClick={handleToDash} className=' space-x-1 h-[50px] flex items-center w-[280px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more text-white"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                    </Button>
                </div>
                <div className="w-[260px] h-[60px]  items-center flex ">
                <Button onClick={handleToChat} className=' space-x-1 h-[50px] flex items-center w-[280px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bar-chart-4 text-white"><path d="M3 3v18h18"/><path d="M13 17V9"/><path d="M18 17V5"/><path d="M8 17v-3"/></svg>
                </Button>
                </div>
            </div>
            <footer className="fixed bottom-14 h-[40px] space-y-3 items-center flex">
                <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out text-red-700"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                </Button>
            </footer>
        </div>
    );
}