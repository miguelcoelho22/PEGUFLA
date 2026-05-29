import React, { useState, useEffect, useRef } from 'react';
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

  // --- ESTADOS DO CHAT ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Busca os detalhes da carona ao carregar a tela
  useEffect(() => {
    const buscarDetalhesCarona = async () => {
      try {
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

  // --- LÓGICA DO CHAT (POLLING) ---
  const carregarMensagens = async () => {
    try {
      const response = await api.get(`/carona/${id}/mensagens`);
      setMensagens(response.data);
    } catch (err) {
      console.error("Erro ao carregar mensagens do chat:", err);
    }
  };

  // Efeito para carregar as mensagens periodicamente SÓ quando o chat estiver aberto
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isChatOpen) {
      carregarMensagens(); // Busca logo ao abrir
      interval = setInterval(carregarMensagens, 3000); // Atualiza a cada 3 segundos
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isChatOpen, id]);

  // Efeito para rolar o chat para a última mensagem automaticamente
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensagens, isChatOpen]);

  const enviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    try {
      await api.post(`/carona/${id}/mensagens`, { texto: novaMensagem });
      setNovaMensagem(''); // Limpa o input
      carregarMensagens(); // Recarrega a lista instantaneamente
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Falha ao enviar mensagem.");
    }
  };

  // --- FUNÇÃO DE RESERVA ---
  const confirmarReserva = async () => {
    try {
      await api.post('/reserva', { 
        caronaId: carona.id 
      });
      
      setIsModalOpen(false);
      alert("Reserva solicitada com sucesso! Aguarde a aprovação do condutor.");
      navigate('/viagens'); 

    } catch (err: any) {
      console.error("Erro ao solicitar reserva:", err);
      const mensagemErro = err.response?.data?.message || err.response?.data || "Não foi possível solicitar a reserva no momento.";
      alert(`Erro: ${mensagemErro}`);
      setIsModalOpen(false);
    }
  };

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
  const dataObj = new Date(carona.horarioSaida);
  let diaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'long' });
  diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
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
        <h1 className="text-xl font-bold text-gray-900">{dataFormatada}</h1>

        {/* Card de Rota */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm">
          <div className="flex items-start justify-between relative pl-1">
            <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-gray-400"></div>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-[10px] h-[10px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                  <span className="text-[14px] text-gray-800 uppercase">{carona.origem}</span>
                </div>
                <span className="text-[13px] font-medium text-gray-800">{horaFormatada}</span>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-[10px] h-[10px] rounded-full border border-gray-500 bg-[#f2f2f2]"></div>
                <span className="text-[14px] text-gray-800 uppercase">{carona.destino}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Informações do Veículo */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm">
          <h3 className="text-[13px] font-bold text-gray-900 mb-1">Informações do veículo:</h3>
          <p className="text-[13px] text-gray-700 capitalize">
            {carona.veiculo?.marca} {carona.veiculo?.modelo} - Cor {carona.veiculo?.cor} (Placa: {carona.veiculo?.placa?.toUpperCase()})
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
            <span className="text-[14px] font-medium text-gray-900 capitalize">
              {carona.user?.name} {carona.user?.lastName}
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
          {/* BOTÃO QUE ABRE O CHAT */}
          <button 
            onClick={() => setIsChatOpen(true)}
            className="flex-1 bg-white border border-[#1862bc] text-[#1862bc] hover:bg-blue-50 font-medium text-[14px] py-2.5 rounded-md transition-colors"
          >
            Falar com {carona.user?.name}
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-[#1862bc] hover:bg-blue-800 text-white font-medium text-[14px] py-2.5 rounded-md transition-colors shadow-sm"
          >
            Reservar
          </button>
        </div>
      </div>

      {/* =========================================
          MODAL DE CONFIRMAÇÃO DE RESERVA 
          ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-5">
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
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-transparent border border-[#1862bc] text-[#1862bc] font-semibold text-[15px] py-1.5 px-6 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Não
                </button>
                <button 
                  onClick={confirmarReserva} 
                  className="bg-[#1862bc] text-white font-semibold text-[15px] py-1.5 px-6 rounded-md hover:bg-blue-800 transition-colors shadow-sm"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL / TELA DO CHAT 
          ========================================= */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end sm:items-center sm:justify-center animate-fade-in">
          <div className="bg-[#f4f6fb] w-full sm:max-w-md h-[85vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
            
            {/* Header do Chat */}
            <div className="bg-[#1862bc] text-white p-4 flex justify-between items-center shadow-md z-10">
              <div>
                <h3 className="font-bold text-base">Chat da Carona</h3>
                <p className="text-xs text-blue-200">Motorista: {carona.user?.name}</p>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Área das Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50/50">
              {mensagens.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic text-center px-4">
                  Nenhuma mensagem ainda. Mande um "Oi" para combinar os detalhes!
                </div>
              ) : (
                mensagens.map((msg: any) => {
                  // Como não temos o ID do usuário logado de forma fácil aqui, 
                  // vamos separar visualmente o "Motorista" do resto.
                  // (Quem envia da tela CaronaDetalhes geralmente é o passageiro).
                  const isMotorista = msg.remetente?.id === carona.user?.id;
                  
                  return (
                    <div key={msg.id} className={`max-w-[80%] p-3 rounded-xl shadow-sm ${isMotorista ? 'bg-white border border-gray-200 self-start rounded-tl-none' : 'bg-[#1862bc] text-white self-end rounded-tr-none'}`}>
                      <span className="block text-[10px] font-bold opacity-70 mb-1 capitalize">
                        {msg.remetente?.name} {isMotorista ? '🚗' : ''}
                      </span>
                      <p className="text-sm leading-relaxed">{msg.texto}</p>
                      <span className="block text-[10px] text-right mt-1.5 opacity-60">
                        {new Date(msg.dataEnvio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Envio */}
            <form onSubmit={enviarMensagem} className="bg-white p-3 border-t border-gray-200 flex gap-2 items-center">
              <input 
                type="text" 
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                placeholder="Escreva sua mensagem..." 
                className="flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#1862bc] transition-colors"
              />
              <button 
                type="submit" 
                disabled={!novaMensagem.trim()} 
                className="bg-[#1862bc] text-white rounded-full w-11 h-11 flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors shadow-sm active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}