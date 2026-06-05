import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";
import type { Carona } from '../types';
import Navbar from '../components/Navbar'; 

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Novos estados para capturar os textos digitados
  const [origemBusca, setOrigemBusca] = useState('');
  const [destinoBusca, setDestinoBusca] = useState('');
  const [vagas, setVagas] = useState('1');

  const [caronas, setCaronas] = useState<Carona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getFormattedDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    const formatted = date.toLocaleDateString('pt-BR', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Busca os dados reais da API e aplica os filtros
  const fetchCaronas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/carona'); 
      
      let listaBruta: Carona[] = [];

      if (Array.isArray(response.data)) {
        listaBruta = response.data;
      } else if (response.data && Array.isArray(response.data.content)) {
        listaBruta = response.data.content; 
      }

      // Pega a data e hora atual do sistema do usuário
      const agora = new Date();

      // Filtra por status, data selecionada, data/hora futura e textos
      const filtradas = listaBruta.filter((carona: any) => {
        const isAtiva = carona.statusViagem === 'CRIADA';
        
        // Converte o horário de saída da carona em um objeto Date
        const dataCarona = new Date(carona.horarioSaida);

        // REGRA NOVA 1: A carona tem que ser no futuro (maior que o momento atual)
        const isFutura = dataCarona > agora;

        // REGRA NOVA 2: A carona tem que acontecer no dia selecionado no calendário
        // Extrai o formato YYYY-MM-DD ajustado para o fuso local
        const ano = dataCarona.getFullYear();
        const mes = String(dataCarona.getMonth() + 1).padStart(2, '0');
        const dia = String(dataCarona.getDate()).padStart(2, '0');
        const dataCaronaString = `${ano}-${mes}-${dia}`;
        const matchData = dataCaronaString === selectedDate;
        
        // Verifica se a string digitada está contida na origem/destino da carona (case-insensitive)
        const matchOrigem = origemBusca 
          ? carona.origem.toLowerCase().includes(origemBusca.toLowerCase()) 
          : true;
          
        const matchDestino = destinoBusca 
          ? carona.destino.toLowerCase().includes(destinoBusca.toLowerCase()) 
          : true;

        // Só exibe o card se passar em TODOS os testes
        return isAtiva && isFutura && matchData && matchOrigem && matchDestino;
      });
      
      setCaronas(filtradas);
    } catch (err) {
      console.error("Erro ao buscar caronas:", err);
      setError("Não foi possível carregar as caronas disponíveis.");
      setCaronas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaronas();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-24 font-sans">
      {/* Header Simples */}
      <div className="p-4 pt-6">
      </div>

      <div className="px-5">
        {/* Seção de Boas-vindas */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex items-center justify-center w-8 h-8">
            <svg className="text-green-700 absolute top-0 left-0" width="20" height="20" viewBox="0 0 24 24" fill="#15803d" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h2 className="text-gray-800 font-medium text-lg">Bem-vindo, Membro!</h2>
        </div>

        {/* Formulário de Busca */}
        <div className="bg-[#f2f2f2] rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
          <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); fetchCaronas(); }}>
            <div>
              <label className="text-xs font-bold text-gray-900 mb-1 block">ORIGEM</label>
              <input 
                type="text" 
                placeholder="Ex: Portaria Principal UFLA"
                value={origemBusca}
                onChange={(e) => setOrigemBusca(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md w-full p-2 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-900 mb-1 block">DESTINO</label>
              <input 
                type="text" 
                placeholder="Ex: Centro de Lavras"
                value={destinoBusca}
                onChange={(e) => setDestinoBusca(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md w-full p-2 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="text-xs font-bold text-gray-900 mb-1 block">DATA</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md w-full p-2 outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="w-1/2">
                <label className="text-xs font-bold text-gray-900 mb-1 block">LUGARES</label>
                <select 
                  value={vagas}
                  onChange={(e) => setVagas(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md w-full p-2 outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="1">1 Lugar</option>
                  <option value="2">2 Lugares</option>
                  <option value="3">3 Lugares</option>
                  <option value="4">4 Lugares</option>
                </select>
              </div>
            </div>

            <button type="submit" className="bg-[#1a65c4] hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-md mt-2 transition-colors">
              Pesquisar
            </button>
          </form>
        </div>

        {/* Listagem de Caronas */}
        <h3 className="font-bold text-gray-900 mb-1 text-base">Próximas Caronas:</h3>
        <h4 className="font-medium text-gray-600 mb-4 text-sm">{getFormattedDate(selectedDate)}</h4>
        
        {loading && <p className="text-center text-sm text-gray-500 py-4">Buscando caronas...</p>}
        {error && <p className="text-center text-sm text-red-500 py-4">{error}</p>}
        
        <div className="flex flex-col gap-4">
          {caronas.length > 0 ? (
            caronas.map((carona) => (
              <div key={carona.id} className="bg-[#f2f2f2] rounded-xl border border-gray-300 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-4 relative pl-1">
                  <div className="absolute left-[4px] top-2 bottom-2 w-[1.5px] bg-gray-400"></div>
                  <div className="flex flex-col gap-4 w-full pl-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-gray-800 font-medium">{carona.origem}</span>
                      <span className="text-xs font-bold text-gray-700">{formatTime(carona.horarioSaida)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-gray-800 font-medium">{carona.destino}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-300 pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 rounded-md p-1.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <span className="text-[13px] font-bold text-gray-800">
                      {carona.user.name} {carona.user.lastName}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/detalhes-carona/${carona.id}`)} 
                    className="bg-[#318337] hover:bg-green-800 text-white font-bold text-xs py-1.5 px-5 rounded-md transition-all active:scale-95"
                  >
                    Verificar
                  </button>
                </div>
              </div>
            ))
          ) : !loading ? (
            <p className="text-sm text-gray-500 italic text-center py-4">
              Nenhuma carona encontrada para esta pesquisa.
            </p>
          ) : null}
        </div>
      </div>

      <Navbar />
    </div>
  );
}