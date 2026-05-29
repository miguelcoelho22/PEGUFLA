import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar'; // Importando a Navbar centralizada

export default function CriarCarona() {
  const navigate = useNavigate();

  // Estados do formulário
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [vagasTotais, setVagasTotais] = useState('1');
  const [veiculoId, setVeiculoId] = useState(''); 
  
  // Estados para carregar os veículos do usuário
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Efeito para carregar os veículos (O back-end identifica o usuário pelo Token)
  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Sessão expirada. Faça login novamente.");
          return;
        }

        // Chamada limpa: O back-end pega o ID do usuário direto do Header Authorization
        const response = await api.get('/veiculo/usuario');
        
        // Garante que os dados sejam tratados como array
        const veiculosData = Array.isArray(response.data) ? response.data : [response.data];
        setVeiculos(veiculosData);
        
        if (veiculosData.length > 0 && veiculosData[0]) {
          setVeiculoId(veiculosData[0].id); 
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
    
    if (!veiculoId) {
      setError("Selecione um veículo para oferecer a carona.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // CORRIGIDO: Enviamos a string de data e hora exatamente como o usuário digitou, 
      // sem passar pelo .toISOString() que joga +3 horas no fuso.
      const horarioSaida = `${data}T${hora}:00`;

      const payload = {
        origem,                 
        destino,                
        horarioSaida,           
        vagasTotais: parseInt(vagasTotais), 
        veiculoId: parseInt(veiculoId) 
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

            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">DE ONDE VOCÊ SAI?</label>
              <input 
                type="text" required value={origem}
                onChange={e => setOrigem(e.target.value)}
                placeholder="Ex: Portaria Principal UFLA"
                className="bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 mb-1 ml-1">PARA ONDE VOCÊ VAI?</label>
              <input 
                type="text" required value={destino}
                onChange={e => setDestino(e.target.value)}
                placeholder="Ex: Pavilhão 4 / DCC"
                className="bg-white border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                  veiculos.map((v, index) => (
                    <option key={v?.id || index} value={v?.id}>
                      {v?.marca} {v?.modelo} - {v?.placa}
                    </option>
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
              className={`text-white font-bold py-3.5 rounded-lg mt-3 shadow-sm active:scale-95 transition-all ${loading || veiculos.length === 0 ? 'bg-gray-400' : 'bg-[#318337] hover:bg-green-700'}`}
            >
              {loading ? 'Processando...' : 'Confirmar Carona'}
            </button>
          </form>
        </div>
      </div>

      {/* Componente de Navegação Centralizado */}
      <Navbar />
    </div>
  );
}