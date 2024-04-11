import { FilePenLine } from 'lucide-react'; 
 
export default function Profile() {  
  return (  
    <div className='bg-black h-[100vh]'>  
  <div className="justify-center items-center flex">  
    <div className="border-2 rounded-[20px] mt-10 w-4/5">  
      <div className="flex ml-8 items-center w-[638px] h-[136px] border-slate-50">  
        <svg width="77" height="78" viewBox="0 0 77 78" fill="none" xmlns="http://www.w3.org/2000/svg"> 
          <rect width="76.3633" height="77.7517" rx="6" fill="#2F76FF"/> 
          <path d="M5.008 51V28.6H15.504C18.192 28.6 20.24 29.1333 21.648 30.2C23.056 31.2453 23.76 32.6533 23.76 34.424C23.76 35.6187 23.4827 36.6427 22.928 37.496C22.3733 38.328 21.6267 38.9787 20.688 39.448C19.7707 39.896 18.768 40.12 17.68 40.12L18.256 38.968C19.5147 38.968 20.6453 39.2027 21.648 39.672C22.6507 40.12 23.44 40.7813 24.016 41.656C24.6133 42.5307 24.912 43.6187 24.912 44.92C24.912 46.84 24.176 48.3333 22.704 49.4C21.232 50.4667 19.0453 51 16.144 51H5.008ZM9.168 47.736H15.888C17.4453 47.736 18.64 47.48 19.472 46.968C20.304 46.456 20.72 45.6347 20.72 44.504C20.72 43.3947 20.304 42.584 19.472 42.072C18.64 41.5387 17.4453 41.272 15.888 41.272H8.848V38.04H15.056C16.5067 38.04 17.616 37.784 18.384 37.272C19.1733 36.76 19.568 35.992 19.568 34.968C19.568 33.9227 19.1733 33.144 18.384 32.632C17.616 32.12 16.5067 31.864 15.056 31.864H9.168V47.736ZM29.3518 51V28.6H32.7758L46.8238 45.848H45.1278V28.6H49.2558V51H45.8318L31.7838 33.752H33.4798V51H29.3518ZM59.098 37.912H70.234V41.336H59.098V37.912ZM59.418 47.512H72.058V51H55.258V28.6H71.61V32.088H59.418V47.512Z" fill="white"/> 
        </svg>  
        <div className="ml-2">  
          <h1 className="font-bold text-white">Sergio Naufall</h1>  
          <h3 className="text-[#2F76FF] font-medium">Chefe</h3>  
          <h3 className="text-[#8C8C8C]">sergionaufall@gmail.com</h3>  
        </div>  
      </div> 
    </div>  
  </div>  
  
    <div className="flex justify-center items-center mt-10">  
      <div className="border-2 w-4/5 h-[300px] rounded-[20px]">  
        <div className="flex justify-between">  
          <div className="font-bold text-2xl  text-white p-8">Informações</div>  
          <div className="p-8 font-bold flex text-xl"> <button className='flex'>   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=" text-white lucide lucide-file-pen-line"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/><path d="M8 18h1"/><path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z"/></svg> <h1 className='ml-2  text-white'>Editar</h1></button></div>  
        </div>  
        <div className="flex flex-col ml-8">  
          <h1 className="text-[#2F76FF] font-medium">Nome</h1>  
          <p className="font-medium  text-white">Sérgio Naufall</p>  
  
          <h1 className="text-[#2F76FF] font-medium mt-3">E-mail</h1>  
          <p className="font-medium  text-white">sergionaufall@gmail.com</p>  
  
          <h1 className="text-[#2F76FF] font-medium mt-3">Telefone</h1>  
          <p className="font-medium  text-white">41 9 9999-9999</p>  
        </div>  
      </div>  
    </div>  
  </div>  
  
  );  
}