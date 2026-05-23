import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Perfil() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState<any>(null);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para o Modal (Adicionar / Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [veiculoEditando, setVeiculoEditando] = useState<any>(null);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    cor: '',
    placa: ''
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const userRes = await api.get('/user');
        setUserData(userRes.data);

        const veiculoRes = await api.get('/veiculo/usuario');
        const veiculosData = Array.isArray(veiculoRes.data) ? veiculoRes.data : [veiculoRes.data];
        setVeiculos(veiculosData);
        
      } catch (err: any) {
        console.error("Erro ao carregar perfil:", err);
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [navigate]);

  const abrirModalNovo = () => {
    setIsEditing(false);
    setVeiculoEditando(null);
    setFormData({ marca: '', modelo: '', cor: '', placa: '' });
    setIsModalOpen(true);
  };

  const abrirModalEdicao = (veiculo: any) => {
    setIsEditing(true);
    setVeiculoEditando(veiculo);
    setFormData({
      marca: veiculo.marca || '',
      modelo: veiculo.modelo || '',
      cor: veiculo.cor || '',
      placa: veiculo.placa || ''
    });
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvarVeiculo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        if (!veiculoEditando?.id) {
          alert("ID do veículo não encontrado.");
          return;
        }
        await api.put(`/veiculo/${veiculoEditando.id}`, formData);
        
        setVeiculos(veiculos.map(v => 
          v.id === veiculoEditando.id ? { ...v, ...formData } : v
        ));
      } else {
        const response = await api.post('/veiculo', formData);
        const novoVeiculo = response.data; 
        setVeiculos([...veiculos, novoVeiculo]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao salvar veículo:", err);
      alert("Falha ao salvar o veículo. Verifique o console.");
    }
  };

  // NOVA FUNÇÃO: Deletar Veículo
  const handleExcluirVeiculo = async (id: number) => {
    // Pede confirmação antes de apagar
    const confirmacao = window.confirm("Tem certeza que deseja excluir este veículo?");
    if (!confirmacao) return;

    try {
      // Chama o endpoint de DELETE
      await api.delete(`/veiculo/${id}`);
      
      // Remove o veículo da tela imediatamente atualizando o state
      setVeiculos(veiculos.filter(v => v.id !== id));
    } catch (err) {
      console.error("Erro ao excluir veículo:", err);
      alert("Falha ao excluir o veículo. Verifique se ele não está vinculado a uma carona ativa.");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#f4f7fe] pb-28 font-sans relative">
      <div className="px-6 pt-8 pb-4 flex items-center gap-2">
        <div className="flex items-center justify-center">
           <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#318337" />
             <circle cx="12" cy="10" r="3" fill="white" />
           </svg>
        </div>
        <h1 className="text-[28px] font-bold text-gray-900">Seu Perfil</h1>
      </div>

      <div className="px-5 space-y-6">
        <div className="bg-[#f2f2f2] rounded-xl p-6 border border-gray-300 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 bg-[#d9d9d9] flex items-center justify-center border border-gray-400">
               <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center border border-gray-200">
                  <svg width="55" height="55" viewBox="0 0 24 24" fill="#555">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
               </div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-gray-900">
              Nome: <span className="font-normal">{userData?.name} {userData?.lastName}</span>
            </p>
            <p className="text-lg font-bold text-gray-900">
              Email: <span className="font-normal text-base">{userData?.email}</span>
            </p>
          </div>
        </div>

        <div className="bg-[#f2f2f2] rounded-xl p-5 border border-gray-300 shadow-sm min-h-[140px]">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-lg font-bold text-gray-900">Veículos cadastrados:</p>
            <button 
              onClick={abrirModalNovo} 
              className="bg-white border-2 border-[#318337] text-[#318337] px-3 py-1 rounded-md font-bold text-sm active:scale-95 transition-all">
              + Adicionar
            </button>
          </div>
          
          <div className="space-y-3">
            {veiculos.length > 0 ? (
              veiculos.map((v, i) => (
                <div key={v.id || i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-gray-800 leading-tight text-base font-medium">
                    {v.marca} {v.modelo} <br/> 
                    <span className="text-sm text-gray-500 font-normal">Cor: {v.cor} | Placa: {v.placa}</span>
                  </p>
                  
                  {/* BOTOES DE AÇÃO */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => abrirModalEdicao(v)}
                      className="text-[#1862bc] font-bold text-sm underline active:scale-95 transition-all">
                      Editar
                    </button>
                    <button 
                      onClick={() => handleExcluirVeiculo(v.id)}
                      className="text-red-500 font-bold text-sm underline active:scale-95 transition-all">
                      Excluir
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum veículo cadastrado</p>
            )}
          </div>
        </div>
      </div>

      <Navbar />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {isEditing ? 'Alterar Veículo' : 'Adicionar Novo Veículo'}
            </h2>
            
            <form onSubmit={handleSalvarVeiculo} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Marca</label>
                <input 
                  type="text" name="marca" value={formData.marca} onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[#1862bc]" required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Modelo</label>
                <input 
                  type="text" name="modelo" value={formData.modelo} onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[#1862bc]" required 
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Cor</label>
                  <input 
                    type="text" name="cor" value={formData.cor} onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[#1862bc]" required 
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Placa</label>
                  <input 
                    type="text" name="placa" value={formData.placa} onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[#1862bc]" required 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 text-gray-600 font-bold active:scale-95 transition-all">
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-[#1862bc] text-white px-5 py-2 rounded-md font-bold active:scale-95 transition-all shadow-sm">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}