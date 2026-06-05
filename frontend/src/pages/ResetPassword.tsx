import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// 1. Importação da sua API adicionada aqui para resolver o erro "Cannot find name"
import api from "../services/api";

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Captura os parâmetros da URL (ex: ?email=joao@estudante.ufla.br&code=12345)
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const verificationCode = searchParams.get('code') || searchParams.get('verificationCode');

  // Validação inicial para garantir que o usuário acessou pelo link correto
  useEffect(() => {
    if (!email || !verificationCode) {
      setError('Link de recuperação inválido ou incompleto. Solicite um novo link.');
    }
  }, [email, verificationCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações locais antes de bater no back-end
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Tente novamente.');
      setIsLoading(false);
      return;
    }

    try {
      // 2. Rota corrigida para /auth/reset
      // 3. Payload completo exigido pelo Swagger (email, newPassword, verificationCode)
      await api.post('/auth/reset', 
        { 
          email: email,
          newPassword: password,
          verificationCode: verificationCode
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Anula o token de autorização para não dar conflito de 403 no Spring Security
            Authorization: null
          }
        }
      );

      alert('✅ Senha redefinida com sucesso! Você já pode fazer login.');
      navigate('/login');

    } catch (err: any) {
      // Captura a mensagem de erro que vem do Spring Boot (ex: Código expirado)
      setError(err.response?.data?.message || 'Erro ao redefinir a senha. O token pode estar inválido ou expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 relative font-sans">
      
      {/* Logo no canto superior direito */}
      <div className="absolute top-8 right-8">
        <img 
          src="/src/assets/Logo_PegUfla.png" 
          alt="Logo PegUFLA" 
          className="h-12 w-auto object-contain"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <div className="text-gray-600 text-[10px] text-right uppercase tracking-widest">Logo Area</div>
      </div>

      {/* Card de Redefinição */}
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl p-10 shadow-2xl border border-gray-800/50">
        <h1 className="text-3xl font-bold text-white mb-2">Redefina sua senha</h1>
        
        {email ? (
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Criando nova senha para <strong>{email}</strong>
          </p>
        ) : (
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Crie uma nova senha forte para acessar sua conta PegUFLA.
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nova Senha</label>
            <input
              type="password"
              required
              disabled={!email || !verificationCode || isLoading}
              placeholder="••••••••"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Confirmar Nova Senha</label>
            <input
              type="password"
              required
              disabled={!email || !verificationCode || isLoading}
              placeholder="••••••••"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Exibição de Erros de Validação/API */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mt-2">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!email || !verificationCode || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
          </button>
        </form>

        {/* Link para cancelar e voltar ao Login */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Lembrou a senha? <span onClick={() => navigate('/login')} className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer transition">Voltar para o login</span>
          </p>
        </div>
      </div>
    </div>
  );
}