
import React from 'react';
import { useRouter } from 'next/navigation';

const Optionside: React.FC<{ title: string; svg: React.FC, path: string}> = ({ title, svg: Icon, path }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(path)} className="flex cursor-pointer space-x-3 mt-3 w-[90%] border-2 justify-center rounded-[10px] items-center border-slate-50 text-white p-[10px]">
      <Icon/>
      <h1  className="text-white  dark:text-black w-[100px] font-bold">{title}</h1>  
    </div>
  );
}

export default Optionside;