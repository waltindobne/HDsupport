export default function TextContent(){
    return(
       <div className="TextContent lex justify-around items-center max-w-[100%] mb-10 flex-wrap w-[100%]">
            <div className="h-[100vh] max-w-[100%] w-[100%] mt-[150px] bg-black flex flex-wrap items-center justify-center">
                    <div className="max-w-[90%] flex items-center justify-around ">
                        <div  className=" h-[83vh] flex-col w-[40%] justify-center relative bottom-[30px] flex items-center">
                            <div className="flex">
                                <h1 className="text-[35px] w-[85%] font-black mb-5">
                                    Facilidade e Eficiência Interna
                                </h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check2-circle text-green-500 relative top-[70px] right-[320px]" viewBox="0 0 16 16">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                </svg>
                            </div>
                            <h1 className="text-[20px] max-w-[100%] w-[100%] flex items-center justify-center">
                                Com uma interface intuitiva e recursos poderosos, o Help Desk da Employer é projetado para simplificar o dia a dia de todos os nossos colaboradores. Desde o departamento de TI até os gestores de equipe, todos podem se beneficiar de uma gestão interna mais ágil e eficiente.
                            </h1>
                            <div className="w-[300px] text-blue-700 relative top-[50px] h-[70px] border-[2px] border-blue-700 rounded-[20px] flex items-center justify-center text-[25px] font-black">
                                <button className="w-[300px] h-[70px]">Entre agora</button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="items-center  justify-center">    
                                <img className="h-[550px] w-[450px]" src="img.png" alt="" />
                            </div>
                        </div>
                    </div>
            </div>
       </div> 
    );
}