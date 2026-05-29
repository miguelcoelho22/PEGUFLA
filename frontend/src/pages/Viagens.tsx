import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Viagens() {
  const [viagensAtivas, setViagensAtivas] = useState<any[]>([]);
  const [historico, setHistorico] = useState<any[]>([]);
  const [solicitacoesEnviadas, setSolicitacoesEnviadas] = useState<any[]>([]);

  const [pedidosPendentes, setPedidosPendentes] = useState<any[]>([]);
  const [pedidosAprovados, setPedidosAprovados] = useState<any[]>([]);
  const [pedidosRecusados, setPedidosRecusados] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  
  const [modalRecusarOpen, setModalRecusarOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);
  const [toastAprovado, setToastAprovado] = useState(false);
  const [caronaParaCancelar, setCaronaParaCancelar] = useState<any>(null);

  // --- ESTADOS DO CHAT ---
  const [chatCaronaId, setChatCaronaId] = useState<number | null>(null);
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatarDataHora = (dataString: string) => {
    if (!dataString) return { data: '---', hora: '---' };
    try {
      const date = new Date(dataString);
      if (isNaN(date.getTime())) return { data: '---', hora: '---' };
      const data = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const hora = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      return { data, hora };
    } catch {
      return { data: '---', hora: '---' };
    }
  };

  useEffect(() => {
    let isMounted = true;

    const carregarViagens = async () => {
      setLoading(true);
      let idsCaronasAtivas: number[] = [];

      // 1. CARONAS OFERTADAS (MOTORISTA)
      try {
        const resAtivas = await api.get('/carona/ativas');
        const ativasDoUsuario = Array.isArray(resAtivas.data) ? resAtivas.data : (resAtivas.data?.content || []);

        if (isMounted && ativasDoUsuario.length > 0) {
          const ativasFormatadas = ativasDoUsuario.map((carona: any) => {
            const { data, hora } = formatarDataHora(carona.horarioSaida);
            return { ...carona, dataFormatada: data, horaFormatada: hora };
          });
          setViagensAtivas(ativasFormatadas);
          idsCaronasAtivas = ativasFormatadas.map((c: any) => c.id);
        }
      } catch (err) {
        console.error("Erro ao buscar caronas ativas:", err);
      }

      // 2. BUSCA TODAS AS RESERVAS DA CARONA (MOTORISTA)
      if (idsCaronasAtivas.length > 0) {
        try {
          const promessasReservas = idsCaronasAtivas.map(id => api.get(`/reserva/solicitacoesReserva/${id}`));
          const respostasReservas = await Promise.all(promessasReservas);
          
          if (isMounted) {
            const todasReservas = respostasReservas.flatMap((res, index) => {
              const idCarona = idsCaronasAtivas[index];
              const dados = Array.isArray(res.data) ? res.data : [];
              return dados.map((p: any) => ({ ...p, caronaId: idCarona }));
            });

            const pendentes = todasReservas.filter(
              (p: any) => String(p.statusReserva || p.status).toUpperCase() === 'PENDENTE'
            );
            
            const aprovados = todasReservas.filter((p: any) => {
              const status = String(p.statusReserva || p.status).toUpperCase();
              return status.includes('APROV') || status.includes('CONFIRM') || status.includes('ACEIT');
            });
            
            const recusados = todasReservas.filter((p: any) => {
              const status = String(p.statusReserva || p.status).toUpperCase();
              return status.includes('RECUS') || status.includes('REJEIT') || status.includes('CANCEL');
            });

            setPedidosPendentes(pendentes);
            setPedidosAprovados(aprovados);
            setPedidosRecusados(recusados);
          }
        } catch (err) {
          console.error("Erro ao buscar reservas:", err);
        }
      }

      // 3. CARONAS INSCRITAS (PASSAGEIRO)
      try {
        const resReservas = await api.get('/reserva/minhas-reservas');
        const minhasReservas = Array.isArray(resReservas.data) ? resReservas.data : [];
        
        if (isMounted) {
          const solicitacoesFormatadas = minhasReservas.map((reserva: any) => {
            const caronaData = reserva.caronaId || reserva.carona || {};
            const horario = caronaData.horarioSaida || reserva.dataHoraReserva;
            const { data, hora } = formatarDataHora(horario);
            
            return { ...reserva, dataFormatada: data, horaFormatada: hora };
          });
          setSolicitacoesEnviadas(solicitacoesFormatadas);
        }
      } catch (error) {
        console.error("Erro ao buscar minhas reservas:", error);
      }

      // 4. HISTÓRICO DE VIAGENS
      try {
        const resHist = await api.get('/carona/historicoCaronas?page=0&size=50');
        const todasCaronas = resHist.data?.content || (Array.isArray(resHist.data) ? resHist.data : []);

        if (isMounted && todasCaronas.length > 0) {
          setHistorico(todasCaronas.map((c: any) => {
            const { data, hora } = formatarDataHora(c.horarioSaida);
            return { ...c, dataFormatada: data, horaFormatada: hora };
          }));
        }
      } catch (err) {
        console.warn("Rota de Histórico retornou erro ou não disponível:", err);
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    carregarViagens();

    return () => {
      isMounted = false;
    };
  }, []);

  // ==========================================
  // LÓGICA DO CHAT
  // ==========================================
  const carregarMensagensChat = async () => {
    if (!chatCaronaId) return;
    try {
      const response = await api.get(`/carona/${chatCaronaId}/mensagens`);
      setMensagens(response.data);
    } catch (err) {
      console.error("Erro ao carregar mensagens do chat:", err);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (chatCaronaId) {
      carregarMensagensChat(); // Puxa logo ao abrir
      interval = setInterval(carregarMensagensChat, 3000); // Polling a cada 3s
    }
    return () => clearInterval(interval);
  }, [chatCaronaId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensagens, chatCaronaId]);

  const enviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMensagem.trim() || !chatCaronaId) return;

    try {
      await api.post(`/carona/${chatCaronaId}/mensagens`, { texto: novaMensagem });
      setNovaMensagem(''); 
      carregarMensagensChat(); 
    } catch (err: any) {
      console.error("Erro completo do servidor:", err.response?.data);
      const mensagemDoServidor = err.response?.data?.message || "Erro desconhecido";
      alert(`O servidor negou o envio: ${mensagemDoServidor}`);
    }
  };

  // --- ACÕES DO PASSAGEIRO ---
  const handleCancelarSolicitacaoEnviada = async (idReserva: number) => {
    if (!window.confirm("Tem certeza que deseja desistir/cancelar este pedido de carona?")) return;
    try {
      await api.patch(`/reserva/cancelarReserva/${idReserva}`); 
      setSolicitacoesEnviadas(prev => prev.filter(soli => soli.id !== idReserva));
      alert("Solicitação cancelada com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      alert("Não foi possível cancelar sua solicitação.");
    }
  };

  // --- AÇÕES DO MOTORISTA ---
  const handleAprovar = async (pedido: any) => {
    try {
      await api.get(`/reserva/${pedido.id}/aprovar`);
      setPedidosPendentes(prev => prev.filter(p => p.id !== pedido.id));
      setPedidosAprovados(prev => [...prev, pedido]);
      setToastAprovado(true);
      setTimeout(() => setToastAprovado(false), 3000);
    } catch (error) {
      console.error("Erro ao aprovar reserva:", error);
      alert("Não foi possível aprovar a solicitação.");
    }
  };

  const confirmarRecusa = async () => {
    if (!pedidoSelecionado) return;
    try {
      await api.get(`/reserva/${pedidoSelecionado.id}/rejeitar`);
      setPedidosPendentes(prev => prev.filter(p => p.id !== pedidoSelecionado.id));
      setPedidosRecusados(prev => [...prev, pedidoSelecionado]);
      setModalRecusarOpen(false);
      setPedidoSelecionado(null);
    } catch (error) {
      console.error("Erro ao recusar reserva:", error);
      alert("Não foi possível recusar a solicitação.");
    }
  };

  const abrirModalRecusar = (pedido: any) => {
    setPedidoSelecionado(pedido);
    setModalRecusarOpen(true);
  };

  const confirmarCancelamentoCarona = async () => {
    if (!caronaParaCancelar) return;
    try {
      await api.get(`/carona/cancelarCarona/${caronaParaCancelar.id}`);
      setViagensAtivas(prev => prev.filter(v => v.id !== caronaParaCancelar.id));
      setPedidosPendentes(prev => prev.filter(p => (p.caronaId || p.carona?.id) !== caronaParaCancelar.id));
      setCaronaParaCancelar(null);
      alert("Carona cancelada com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar carona:", error);
      alert("Não foi possível cancelar a carona.");
    }
  };

  // --- COMPONENTES VISUAIS ---
  const RouteCard = ({ 
    viagem, 
    onCancel,
    pendentes = [],
    aprovados = [],
    recusados = [],
    mostrarBotaoChat = false
  }: { 
    viagem: any; 
    onCancel?: () => void;
    pendentes?: any[];
    aprovados?: any[];
    recusados?: any[];
    mostrarBotaoChat?: boolean;
  }) => (
    <div className="bg-[#f2f2f2] border border-gray-300 rounded-lg p-4 shadow-sm relative flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-stretch gap-3">
          <div className="flex flex-col items-center justify-between py-1">
            <div className="w-3.5 h-3.5 border-[2px] border-gray-500 rounded-full"></div>
            <div className="w-[1.5px] h-8 bg-gray-400"></div>
            <div className="w-3.5 h-3.5 border-[2px] border-gray-500 rounded-full"></div>
          </div>
          <div className="flex flex-col justify-between h-full gap-4">
            <p className="text-gray-900 text-sm font-medium">{viagem.origem || 'Não informada'}</p>
            <p className="text-gray-900 text-sm font-medium">{viagem.destino || 'Não informado'}</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm">
          {viagem.dataFormatada} &nbsp; {viagem.horaFormatada}
        </p>
      </div>

      {(pendentes.length > 0 || aprovados.length > 0 || recusados.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-300 space-y-3">
          <p className="text-xs font-bold text-gray-500 tracking-wide uppercase">Passageiros / Reservas:</p>
          
          {pendentes.map((pedido) => (
            <div key={pedido.id} className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col gap-2.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#666"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm leading-tight">
                    {pedido.user?.name || pedido.usuario?.name || 'Passageiro'} {pedido.user?.lastName || pedido.usuario?.lastName || ''}
                  </p>
                  <p className="text-amber-600 font-semibold text-[11px]">Aguardando sua resposta</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => abrirModalRecusar(pedido)} className="flex-1 bg-transparent border-2 border-[#1862bc] text-[#1862bc] py-1 rounded-md font-bold text-xs transition-all active:scale-95">Recusar</button>
                <button onClick={() => handleAprovar(pedido)} className="flex-1 bg-[#1862bc] border-2 border-[#1862bc] text-white py-1 rounded-md font-bold text-xs transition-all active:scale-95">Aprovar</button>
              </div>
            </div>
          ))}

          {aprovados.map((pedido) => (
            <div key={pedido.id} className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 bg-white border border-green-300 rounded-full flex items-center justify-center text-green-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-sm leading-tight">
                  {pedido.user?.name || pedido.usuario?.name || 'Passageiro'}
                </p>
                <p className="text-green-700 font-semibold text-[11px]">Vaga Confirmada</p>
              </div>
            </div>
          ))}

          {recusados.map((pedido) => (
            <div key={pedido.id} className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3 shadow-sm opacity-75">
              <div className="w-8 h-8 bg-white border border-red-300 rounded-full flex items-center justify-center text-red-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-sm leading-tight">
                  {pedido.user?.name || pedido.usuario?.name || 'Passageiro'}
                </p>
                <p className="text-red-600 font-semibold text-[11px]">Solicitação Recusada</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* BOTÕES DE AÇÃO NA BASE DO CARD */}
      <div className={`mt-4 pt-3 border-t border-gray-300 flex ${mostrarBotaoChat && onCancel ? 'justify-between' : 'justify-end'} items-center`}>
        {mostrarBotaoChat && (
          <button 
            onClick={() => setChatCaronaId(viagem.id)}
            className="flex items-center gap-1.5 bg-[#1862bc] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-blue-800 transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Chat da Viagem
          </button>
        )}
        
        {onCancel && (
          <button 
            onClick={onCancel}
            className="text-red-500 font-bold text-xs flex items-center gap-1 hover:text-red-700 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
            Cancelar Carona
          </button>
        )}
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center">Carregando viagens...</div>;

  return (
    <div className="min-h-screen bg-[#f4f7fe] pb-28 font-sans relative">
      <div className="px-6 pt-8 pb-6 flex items-center gap-3">
        <div className="flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#318337"/>
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Minhas Viagens</h1>
      </div>

      <div className="px-5 space-y-8">
        
        {/* SEÇÃO 1: MOTORISTA */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Minhas caronas ofertadas (Motorista):</h2>
          {viagensAtivas.length > 0 ? (
            <div className="space-y-4">
              {viagensAtivas.map(viagem => {
                const pendentes = pedidosPendentes.filter(p => (p.caronaId === viagem.id || p.carona?.id === viagem.id));
                const aprovados = pedidosAprovados.filter(p => (p.caronaId === viagem.id || p.carona?.id === viagem.id));
                const recusados = pedidosRecusados.filter(p => (p.caronaId === viagem.id || p.carona?.id === viagem.id));

                return (
                  <RouteCard 
                    key={viagem.id} 
                    viagem={viagem} 
                    onCancel={() => setCaronaParaCancelar(viagem)} 
                    pendentes={pendentes}
                    aprovados={aprovados}
                    recusados={recusados}
                    mostrarBotaoChat={true} // Ativa o botão de chat para o Motorista
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Você não possui viagens ativas no momento.</p>
          )}
        </section>

        {/* SEÇÃO 2: PASSAGEIRO */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">Caronas que solicitei (Passageiro):</h2>
          {solicitacoesEnviadas.length > 0 ? (
            <div className="space-y-4">
              {solicitacoesEnviadas.map((soli) => {
                const statusString = String(soli.statusReserva || soli.status || 'PENDENTE').toUpperCase();
                const caronaData = soli.caronaId || soli.carona || {};
                
                let statusColor = "bg-amber-100 text-amber-700 border-amber-300";
                let statusLabel = "Aguardando Resposta";
                let isAprovada = false;
                
                if (statusString.includes("APROV") || statusString.includes("CONFIRM")) {
                  statusColor = "bg-green-100 text-green-700 border-green-300";
                  statusLabel = "Aprovada";
                  isAprovada = true;
                } else if (statusString.includes("REJEIT") || statusString.includes("RECUS") || statusString.includes("REJECT") || statusString.includes("CANCEL")) {
                  statusColor = "bg-red-100 text-red-700 border-red-300";
                  statusLabel = statusString.includes("CANCEL") ? "Cancelada" : "Recusada";
                }

                return (
                  <div key={soli.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-stretch gap-3">
                        <div className="flex flex-col items-center justify-between py-1">
                          <div className="w-3.5 h-3.5 border-[2px] border-blue-500 rounded-full"></div>
                          <div className="w-[1.5px] h-8 bg-gray-300"></div>
                          <div className="w-3.5 h-3.5 border-[2px] border-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex flex-col justify-between h-full gap-4">
                          <p className="text-gray-900 text-sm font-medium">{caronaData.origem || 'Não informada'}</p>
                          <p className="text-gray-900 text-sm font-medium">{caronaData.destino || 'Não informado'}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {soli.dataFormatada} &nbsp; {soli.horaFormatada}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {/* BOTÃO DE CHAT PRO PASSAGEIRO (Só mostra se já foi aprovado ou se quiser mostrar sempre) */}
                        {isAprovada && caronaData.id && (
                          <button 
                            onClick={() => setChatCaronaId(caronaData.id)}
                            className="bg-[#1862bc] text-white px-3 py-1.5 rounded-md font-bold text-xs hover:bg-blue-800 transition-all active:scale-95"
                          >
                            Abrir Chat
                          </button>
                        )}

                        {!statusString.includes("CANCEL") && !statusString.includes("REJEIT") && (
                          <button 
                            onClick={() => handleCancelarSolicitacaoEnviada(soli.id)}
                            className="text-red-500 border border-red-300 bg-transparent hover:bg-red-50 font-bold text-xs py-1.5 px-3 rounded-md transition-all active:scale-95"
                          >
                            Desistir
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Você não está inscrito em nenhuma carona no momento.</p>
          )}
        </section>

        {/* SEÇÃO 3: HISTÓRICO */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">Histórico de viagens concluídas:</h2>
          <div className="space-y-4">
            {historico.length > 0 ? (
              historico.map((viagem, index) => <RouteCard key={viagem.id || index} viagem={viagem} />)
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhum histórico disponível.</p>
            )}
          </div>
        </section>
      </div>

      <Navbar />

      {/* TOAST E MODAIS DE RECUSAR E CANCELAR (Mantidos originais do seu código) */}
      {toastAprovado && (
        <div className="fixed top-20 right-4 left-4 bg-[#f4f7fe] border border-gray-300 shadow-xl rounded-lg p-3 flex items-start gap-3 z-50">
          <div className="text-blue-600 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">Aprovada</p>
            <p className="text-xs text-gray-600">Solicitação de carona aprovada</p>
          </div>
          <button onClick={() => setToastAprovado(false)} className="text-blue-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
          </button>
        </div>
      )}

      {modalRecusarOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-[#f4f7fe] border border-gray-300 rounded-lg w-full max-w-sm shadow-2xl relative pt-8 pb-6 px-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Recusar solicitação?</h3>
            <p className="text-xs text-gray-600 mb-6">Você está prestes a recusar esta solicitação.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setModalRecusarOpen(false)} className="w-24 bg-white border border-[#1862bc] text-[#1862bc] py-1.5 rounded font-bold text-sm active:scale-95 transition-all">Não</button>
              <button onClick={confirmarRecusa} className="w-24 bg-[#1862bc] border border-[#1862bc] text-white py-1.5 rounded font-bold text-sm active:scale-95 transition-all">Sim</button>
            </div>
          </div>
        </div>
      )}

      {caronaParaCancelar && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-[#f4f7fe] border border-gray-300 rounded-lg w-full max-w-sm shadow-2xl relative pt-8 pb-6 px-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Cancelar esta carona?</h3>
            <div className="flex justify-center gap-3 mt-4">
              <button onClick={() => setCaronaParaCancelar(null)} className="w-24 bg-white border border-gray-400 text-gray-700 py-1.5 rounded font-bold text-sm active:scale-95 transition-all">Voltar</button>
              <button onClick={confirmarCancelamentoCarona} className="w-24 bg-red-600 border border-red-600 text-white py-1.5 rounded font-bold text-sm active:scale-95 transition-all">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL / TELA DO CHAT 
          ========================================= */}
      {chatCaronaId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex flex-col justify-end sm:items-center sm:justify-center animate-fade-in">
          <div className="bg-[#f4f6fb] w-full sm:max-w-md h-[85vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
            
            {/* Header do Chat */}
            <div className="bg-[#1862bc] text-white p-4 flex justify-between items-center shadow-md z-10">
              <div>
                <h3 className="font-bold text-base">Chat da Viagem</h3>
                <p className="text-xs text-blue-200">ID: {chatCaronaId}</p>
              </div>
              <button onClick={() => setChatCaronaId(null)} className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Área das Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50/50">
              {mensagens.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic text-center px-4">
                  Nenhuma mensagem ainda. Mande um "Oi" para a turma!
                </div>
              ) : (
                mensagens.map((msg: any) => (
                  <div key={msg.id} className="max-w-[80%] p-3 rounded-xl shadow-sm bg-white border border-gray-200 self-start rounded-tl-none">
                    <span className="block text-[10px] font-bold text-gray-500 mb-1 capitalize">
                      {msg.remetente?.name} {msg.remetente?.lastName}
                    </span>
                    <p className="text-sm leading-relaxed text-gray-800">{msg.texto}</p>
                    <span className="block text-[10px] text-right mt-1.5 text-gray-400">
                      {new Date(msg.dataEnvio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
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