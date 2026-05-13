import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/Logo_PegUfla.png'; 

export default function CaronaDetalhes() {
  const { id } = useParams(); // Pega o ID que passamos na URL
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carona, setCarona] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const buscarDetalhesCarona = async () => {
      try {
        // Tenta buscar a carona específica pelo ID
        const response = await api.get(`/carona/${id}`);
        setCarona(response.data);
      } catch (err) {
        console.error("Erro ao buscar carona:", err);
        setError("Não foi possível carregar os detalhes desta carona.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      buscarDetalhesCarona();
    }
  }, [id]);

  // Telas de carregamento e erro amigáveis
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center font-sans">
        <p className="text-[#1862bc] font-bold text-lg animate-pulse">Carregando detalhes...</p>
      </div>
    );
  }

  if (error || !carona) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] flex flex-col items-center justify-center font-sans p-5">
        <p className="text-red-500 font-bold mb-4 text-center">{error || "Carona não encontrada."}</p>
        <button onClick={() => navigate('/dashboard')} className="bg-[#1862bc] text-white px-6 py-2 rounded-md font-medium">
          Voltar ao Início
        </button>
      </div>
    );
  }

  // --- FORMATAÇÃO DE DATA E HORA ---
  // Transforma "2026-05-13T14:11:00" em um objeto Date
  const dataObj = new Date(carona.horarioSaida);
  
  // Extrai o dia da semana ("quarta-feira"), o dia ("13") e o mês ("maio")
  let diaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'long' });
  diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1); // Primeira letra maiúscula
  const dia = dataObj.getDate();
  const mes = dataObj.toLocaleDateString('pt-BR', { month: 'long' });
  
  const dataFormatada = `${diaSemana}, ${dia} de ${mes}`;
  const horaFormatada = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-24 font-sans relative">
      {/* Header com Botão Voltar e Logo */}
      <div className="flex items-center justify-between p-5 pt-8 mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center transition-transform active:scale-95">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#1862bc" />
            <path d="M14 8L9 12L14 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <img src={logo} alt="PegUfla Logo" className="h-8 object-contain" />
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Título da Data Dinâmico */}
        <h1 className="text-xl font-bold text-gray-900">{dataFormatada}</h1>

        {/* Card de Rota */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm">
          <div className="flex items-start justify-between relative pl-1">
            <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-gray-400"></div>
            
            <div className="flex flex-col gap-6 w-full">
              {/* Origem Dinâmica */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-[10px] h-[10px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                  <span className="text-[14px] text-gray-800 uppercase">{carona.origem}</span>
                </div>
                <span className="text-[13px] font-medium text-gray-800">{horaFormatada}</span>
              </div>
              
              {/* Destino Dinâmico */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-[10px] h-[10px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                <span className="text-[14px] text-gray-800 uppercase">{carona.destino}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Informações do Veículo / Condutor */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm">
          <h3 className="text-[13px] font-bold text-gray-900 mb-1">Informações do veículo:</h3>
          {/* Mostra o carro do condutor em vez da frase genérica da árvore */}
          <p className="text-[13px] text-gray-700 capitalize">
            {carona.veiculo.marca} {carona.veiculo.modelo} - Cor {carona.veiculo.cor} (Placa: {carona.veiculo.placa.toUpperCase()})
          </p>
        </div>

        {/* Card de Perfil do Condutor */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm flex items-center gap-4">
          <div className="border border-gray-400 border-dashed rounded-md p-2 flex-shrink-0">
            <svg className="text-gray-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
              <path d="M4 4h3M4 4v3M20 4h-3M20 4v3M4 20h3M4 20v-3M20 20h-3M20 20v-3" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex flex-col">
            {/* Nome Dinâmico */}
            <span className="text-[14px] font-medium text-gray-900 capitalize">
              {carona.user.name} {carona.user.lastName}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[12px] font-medium text-gray-600">
                Vagas disponíveis: {carona.vagasDisponiveis}/{carona.vagasTotais}
              </span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-3 mt-2">
          <button className="flex-1 bg-white border border-[#1862bc] text-[#1862bc] hover:bg-blue-50 font-medium text-[14px] py-2.5 rounded-md transition-colors">
            Falar com {carona.user.name}
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-[#1862bc] hover:bg-blue-800 text-white font-medium text-[14px] py-2.5 rounded-md transition-colors shadow-sm"
          >
            Reservar
          </button>
        </div>
      </div>

      {/* Navigation (Idêntica ao que você já tinha) */}
      <nav className="fixed bottom-0 w-full bg-[#1862bc] text-white flex justify-between px-6 py-2 pb-3 items-center z-40 shadow-lg">
        {/* ... Seus ícones do navbar ... */}
      </nav>

      {/* POPUP (Modal) de Confirmação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
          <div className="bg-[#f4f6fb] w-full max-w-sm rounded-xl p-6 relative border border-gray-300 shadow-xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 bg-[#1862bc] text-white rounded-full p-1.5 transition-transform active:scale-95">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="mt-4 flex flex-col items-center text-center">
              <h2 className="text-[17px] font-bold text-gray-900 mb-1">Confirmar Reserva</h2>
              <p className="text-[14px] text-gray-800 mb-6">
                Tem certeza que deseja reservar uma vaga com {carona.user.name}?
              </p>

              <div className="flex items-center justify-end w-full gap-3 mt-2">
                <button onClick={() => setIsModalOpen(false)} className="bg-transparent border border-[#1862bc] text-[#1862bc] font-semibold text-[15px] py-1.5 px-6 rounded-md hover:bg-blue-50 transition-colors">
                  Não
                </button>
                <button onClick={() => { setIsModalOpen(false); alert("Reserva confirmada!"); }} className="bg-[#1862bc] text-white font-semibold text-[15px] py-1.5 px-6 rounded-md hover:bg-blue-800 transition-colors shadow-sm">
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}