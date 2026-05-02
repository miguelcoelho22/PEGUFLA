import React, { useState } from 'react';

export default function Dashboard() {
  // Estado para controlar a data selecionada. Padrão: data de hoje.
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Função para formatar a data no padrão "Terça-feira, 28 de abril"
  const getFormattedDate = (dateString: string) => {
    if (!dateString) return '';
    // Adiciona T00:00:00 para evitar problemas de fuso horário ao criar a data
    const date = new Date(dateString + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    const formatted = date.toLocaleDateString('pt-BR', options);
    // Deixa a primeira letra maiúscula
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  // Dados simulados baseados na sua imagem
  const mockCaronas = [
    { id: 1, origin: 'Ponto de Carona DEX', dest: 'Portaria Goiabeira', time: '11:50', driver: 'Michael Zabubu', rating: 5 },
    { id: 2, origin: 'Ponto de Carona DEX', dest: 'Portaria Principal', time: '12:00', driver: 'Maria Cururu', rating: 5 },
    { id: 3, origin: 'Ponto de Carona Cantinaa', dest: 'Portaria Sind', time: '12:30', driver: 'Miguel Coelho', rating: 5 },
    { id: 4, origin: 'Ponto de Carona Biologia', dest: 'Portaria Principal', time: '12:30', driver: 'Graviolla Mata', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-24 font-sans">
      {/* Header */}
      <div className="p-4 pt-6">
        <h1 className="text-gray-300 font-semibold text-lg">Dashboard</h1>
      </div>

      <div className="px-5">
        {/* Bem-vindo */}
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
          <h2 className="text-gray-800 font-medium text-lg">Bem-vindo, Membro!</h2>
        </div>

        {/* Formulário de Busca */}
        <h3 className="font-bold text-gray-900 mb-3 text-base">Encontre sua carona:</h3>
        
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-900 mb-1">Origem</label>
              <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                <option>Portaria Principal</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-900 mb-1">Destino</label>
              <select className="bg-white border border-gray-300 text-gray-600 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                <option>Selecione o destino</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-900 mb-1">Data</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-900 mb-1">Quantidade</label>
              <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-2 outline-none">
                <option>1 Lugar</option>
                <option>2 Lugares</option>
                <option>3 Lugares</option>
                <option>4 Lugares</option>
              </select>
            </div>

            <div className="flex justify-center mt-2">
              <button type="submit" className="bg-[#1a65c4] hover:bg-blue-700 text-white font-medium text-sm py-2 px-8 rounded-md transition-colors">
                Pesquisar
              </button>
            </div>
          </form>
        </div>

        {/* Listagem de Caronas */}
        <h3 className="font-bold text-gray-900 mb-1 text-base">Próximas Caronas:</h3>
        <h4 className="font-bold text-gray-900 mb-4 text-base">{getFormattedDate(selectedDate)}</h4>
        
        <div className="flex flex-col gap-4">
          {mockCaronas.map((carona) => (
            <div key={carona.id} className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-3 shadow-sm">
              <div className="flex items-start justify-between mb-4 relative pl-1">
                {/* Linha do tempo visual */}
                <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-gray-400"></div>
                
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-[9px] h-[9px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                      <span className="text-[13px] text-gray-800">{carona.origin}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800">{carona.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-[9px] h-[9px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                    <span className="text-[13px] text-gray-800">{carona.dest}</span>
                  </div>
                </div>
              </div>

              {/* Motorista info e Botão Verificar */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div className="border border-gray-400 border-dashed rounded-md p-1">
                    <svg className="text-gray-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-medium text-gray-800">{carona.driver}</span>
                    <svg className="text-gray-800 ml-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="text-[13px] text-gray-800">{carona.rating}</span>
                  </div>
                </div>
                <button className="bg-[#318337] hover:bg-green-800 text-white font-medium text-xs py-1.5 px-4 rounded-md transition-colors">
                  Verificar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
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