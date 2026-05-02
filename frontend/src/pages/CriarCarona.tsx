import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function CriarCarona() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-24 font-sans relative">
      
      <div className="px-5 pt-8">
        {/* Cabeçalho: Ícone + Título */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex items-center justify-center w-8 h-8">
            <svg className="text-green-700 absolute top-0 left-0" width="20" height="20" viewBox="0 0 24 24" fill="#15803d" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
            </svg>
            <svg className="text-green-700 absolute bottom-0 right-0" width="16" height="16" viewBox="0 0 24 24" fill="#15803d" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div className="absolute border-t-2 border-dashed border-green-700 w-4 transform rotate-45"></div>
          </div>
          <h2 className="text-gray-900 font-medium text-lg">Criar carona</h2>
        </div>

        <h3 className="font-bold text-gray-900 mb-3 text-base">Informe para criar:</h3>
        
        {/* Formulário de Criação */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            
            {/* Origem */}
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-gray-900 mb-1">Origem</label>
              <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                <option>Portaria Principal</option>
              </select>
            </div>

            {/* Destino */}
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-gray-900 mb-1">Destino</label>
              <select className="bg-white border border-gray-300 text-gray-500 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                <option>Placeholder</option>
              </select>
            </div>

            {/* Data e Hora de saída */}
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-gray-900 mb-1">Data e Hora de saída</label>
              <select className="bg-white border border-gray-300 text-gray-600 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                <option>Intervalo de horarios</option>
              </select>
            </div>

            {/* Quantidade disponível */}
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-gray-900 mb-1">Quantidade disponível</label>
              <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                <option>1 Lugar</option>
                <option>2 Lugares</option>
                <option>3 Lugares</option>
                <option>4 Lugares</option>
              </select>
            </div>

            {/* Observações e Informações */}
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-gray-900 mb-1">Observações e Informações(opcional)</label>
              <input 
                type="text" 
                placeholder="Digite as informações"
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Botão Oferecer */}
            <div className="flex justify-center mt-3">
              <button 
                type="submit" 
                className="bg-[#318337] hover:bg-green-800 text-white font-medium text-sm py-2 px-10 rounded-md transition-colors shadow-sm"
              >
                Oferecer
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-[#1862bc] text-white flex justify-between px-6 py-2 pb-3 items-center z-40 shadow-lg">
        {/* Buscar (agora sem o destaque verde) */}
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 text-white/90">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        
        {/* Oferecer (agora com o destaque verde) */}
        <button onClick={() => navigate('/CriarCarona')} className="flex flex-col items-center gap-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
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