import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo_PegUfla.png'; // Importando a logo do projeto

export default function CaronaDetalhes() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-24 font-sans">
      {/* Header com Botão Voltar e Logo */}
      <div className="flex items-center justify-between p-5 pt-8 mb-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center justify-center transition-transform active:scale-95">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#1862bc" />
            <path d="M14 8L9 12L14 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <img src={logo} alt="PegUfla Logo" className="h-8 object-contain" />
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Título da Data */}
        <h1 className="text-xl font-bold text-gray-900">Terça-feira, 28 de abril</h1>

        {/* Card de Rota */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm">
          <div className="flex items-start justify-between relative pl-1">
            {/* Linha do tempo visual */}
            <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-gray-400"></div>
            
            <div className="flex flex-col gap-6 w-full">
              {/* Origem */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-[10px] h-[10px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                  <span className="text-[14px] text-gray-800">Ponto de Carona DEX</span>
                </div>
                <span className="text-[13px] font-medium text-gray-800">11:50</span>
              </div>
              
              {/* Destino */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-[10px] h-[10px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                <span className="text-[14px] text-gray-800">Portaria Goiabeira</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Informações do Condutor */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm">
          <h3 className="text-[13px] font-bold text-gray-900 mb-1">Informações do condutor:</h3>
          <p className="text-[13px] text-gray-700">Vou parar perto da árvore</p>
        </div>

        {/* Card de Perfil do Condutor */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm flex items-center gap-4">
          <div className="border border-gray-400 border-dashed rounded-md p-2 flex-shrink-0">
            <svg className="text-gray-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
              {/* Corner brackets simulating the dashed scan box from the image */}
              <path d="M4 4h3M4 4v3M20 4h-3M20 4v3M4 20h3M4 20v-3M20 20h-3M20 20v-3" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-gray-900">Maria José Cururu</span>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="text-gray-800" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="text-[12px] text-gray-700">4/5 - 45 avaliações</span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-3 mt-2">
          <button className="flex-1 bg-white border border-[#1862bc] text-[#1862bc] hover:bg-blue-50 font-medium text-[14px] py-2.5 rounded-md transition-colors">
            Falar com Maria
          </button>
          <button className="flex-1 bg-[#1862bc] hover:bg-blue-800 text-white font-medium text-[14px] py-2.5 rounded-md transition-colors shadow-sm">
            Reservar
          </button>
        </div>
      </div>

      {/* Bottom Navigation (Igual ao do Dashboard) */}
      <nav className="fixed bottom-0 w-full bg-[#1862bc] text-white flex justify-between px-6 py-2 pb-3 items-center z-50 shadow-lg">
        <button className="flex flex-col items-center gap-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-white/90">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span className="text-[10px] font-medium">Oferecer</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-white/90">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 8-2-2H5L3 8"/><path d="M2 14h20"/><path d="M5 14v4a2 2 0 0 0 4 0v-4"/><path d="M15 14v4a2 2 0 0 0 4 0v-4"/><path d="M2.5 8 2 14v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2l-.5-6"/><circle cx="7" cy="11" r="1"/><circle cx="17" cy="11" r="1"/>
          </svg>
          <span className="text-[10px] font-medium">Viagens</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-white/90">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
          </svg>
          <span className="text-[10px] font-medium">Chat</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-white/90">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
          </svg>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </nav>
    </div>
  );
}