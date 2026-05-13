import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CriarCarona() {
  const navigate = useNavigate();

  // Estados do formulário (Origem e Destino são strings conforme o JSON)
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [vagasTotais, setVagasTotais] = useState('1');
  const [veiculoId, setVeiculoId] = useState(''); 
  
  // Estados para carregar os veículos do usuário
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Efeito para carregar os veículos registrados para o usuário logado
  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Sessão expirada. Faça login novamente.");
          return;
        }

        // Decodifica o ID que injetamos no Claim "id" do Token JWT no Back-end
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const idUsuario = decodedPayload.id; 
        
        setUserId(idUsuario);

        if (idUsuario) {
          // Busca os veículos usando a rota específica do seu Swagger: /veiculo/usuario/{userId}
          const response = await api.get(`/veiculo/usuario/${idUsuario}`);
          setVeiculos(response.data);
          
          // Se houver veículos, seleciona o primeiro automaticamente
          if (response.data.length > 0) {
            setVeiculoId(response.data[0].id);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar veículos:", err);
        setError("Não foi possível carregar seus veículos. Verifique se possui veículos cadastrados.");
      }
    };
    carregarVeiculos();
  }, []);

  const handleCriarCarona = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica de segurança
    if (!veiculoId || !userId) {
      setError("Selecione um veículo para oferecer a carona.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Formata o horário de saída para o padrão ISO (date-time) exigido pelo Swagger
      const horarioSaida = new Date(`${data}T${hora}:00`).toISOString();

      // Monta o payload conforme o CaronaRequestDTO do seu JSON
      const payload = {
        origem,                 // string
        destino,                // string
        horarioSaida,           // format: date-time
        vagasTotais: parseInt(vagasTotais), // int32
        userId: userId,         // int64
        veiculoId: parseInt(veiculoId) // int64
      };

      await api.post('/carona', payload);
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Erro ao criar carona:", err);
      setError(err.response?.data?.message || "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-24 font-sans relative">
      <div className="px-5 pt-8">
        <h2 className="text-gray-900 font-bold text-xl mb-6">Oferecer carona</h2>

        <div className="bg-[#f2f2f2] rounded-xl border border-gray-200 p-5 shadow-sm">
          <form className="flex flex-col gap-5" onSubmit={handleCriarCarona}>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-xs text-center font-bold">
                {error}
              </div>
            )}

            {/* Campo Origem (String) */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">DE ONDE VOCÊ SAI?</label>
              <input 
                type="text" required value={origem}
                onChange={e => setOrigem(e.target.value)}
                placeholder="Ex: Portaria Principal UFLA"
                className="bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none"
              />
            </div>

            {/* Campo Destino (String) */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">PARA ONDE VOCÊ VAI?</label>
              <input 
                type="text" required value={destino}
                onChange={e => setDestino(e.target.value)}
                placeholder="Ex: Pavilhão 4 / DCC"
                className="bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none"
              />
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">DATA</label>
                <input type="date" required value={data} onChange={e => setData(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none" />
              </div>
              <div className="w-1/2">
                <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">HORA</label>
                <input type="time" required value={hora} onChange={e => setHora(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none" />
              </div>
            </div>

            {/* Campo de Seleção de Veículo (Dinâmico) */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">VEÍCULO QUE IRÁ USAR</label>
              <select 
                required value={veiculoId}
                onChange={e => setVeiculoId(e.target.value)}
                className="bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none"
              >
                {veiculos.length === 0 ? (
                  <option value="">Nenhum veículo cadastrado</option>
                ) : (
                  veiculos.map(v => (
                    <option key={v.id} value={v.id}>{v.marca} {v.modelo} - {v.placa}</option>
                  ))
                )}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">VAGAS</label>
              <select value={vagasTotais} onChange={e => setVagasTotais(e.target.value)} className="bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none">
                <option value="1">1 vaga</option>
                <option value="2">2 vagas</option>
                <option value="3">3 vagas</option>
                <option value="4">4 vagas</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading || veiculos.length === 0}
              className={`text-white font-bold py-3.5 rounded-lg mt-3 shadow-sm ${loading || veiculos.length === 0 ? 'bg-gray-400' : 'bg-[#318337] hover:bg-green-700'}`}
            >
              {loading ? 'Processando...' : 'Confirmar Carona'}
            </button>
          </form>
        </div>
      </div>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 w-full bg-[#1862bc] text-white flex justify-between px-6 py-3 items-center z-50">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 opacity-70">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        <button onClick={() => navigate('/CriarCarona')} className="flex flex-col items-center gap-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span className="text-[10px] font-bold text-green-400">Oferecer</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-70">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <span className="text-[10px] font-medium">Viagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-70">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </nav>
    </div>
  );
}