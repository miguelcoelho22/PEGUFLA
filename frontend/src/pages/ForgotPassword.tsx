import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api'; // Importando a nossa configuração do Axios

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Regra de Negócio RN01: Validação do e-mail institucional (incluindo estudantes)
    const emailRegex = /^[\w-.]+@([\w-]+\.)*ufla\.br$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido da UFLA (ex: @ufla.br ou @estudante.ufla.br).');
      return;
    }

    try {
      setIsLoading(true);
      
      // Chamada para a API do Miguel. 
      // OBS: Confirme com ele se a rota será exatamente '/auth/forgot-password'
      await api.post('/auth/forgot-password', { email });

      setIsSent(true); 

      // Após 3 segundos lendo a mensagem, redireciona o usuário para digitar o código
      setTimeout(() => {
        navigate('/verify-email', { state: { userEmail: email } });
      }, 3000);

    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Erro ao solicitar recuperação de senha.');
      } else {
        setError('Não foi possível conectar ao servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 relative font-sans">
      
      {/* Logo no canto superior direito */}
      <div className="absolute top-8 right-8">
        <img 
          src="/src/assets/logo_PegUfla.png" 
          alt="Logo PegUFLA" 
          className="h-12 w-auto object-contain"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <div className="text-gray-600 text-[10px] text-right uppercase tracking-widest">Logo Area</div>
      </div>

      {/* Card de Recuperação de Senha */}
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl p-10 shadow-2xl border border-gray-800/50">
        <h1 className="text-3xl font-bold text-white mb-2">Esqueceu a senha?</h1>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          Enviaremos um e-mail para você com instruções de como redefinir a sua senha.
        </p>

        {/* Renderização condicional: Mostra o form ou a mensagem de sucesso */}
        {!isSent ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                E-mail Institucional
              </label>
              <input
                type="email"
                required
                placeholder="usuario@estudante.ufla.br"
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Exibição de Erros */}
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-2"
            >
              {isLoading ? 'Enviando...' : 'Enviar e-mail'}
            </button>
          </form>
        ) : (
          /* Mensagem pós-envio com foco em segurança (Prevenção de User Enumeration) */
          <div className="bg-[#2A2A2A] border border-blue-500/30 rounded-lg p-6 text-center mb-6">
            <p className="text-gray-300 text-sm">
              Se o e-mail <span className="text-white font-semibold">{email}</span> estiver cadastrado em nossa base, você receberá as instruções em breve.
              <br/><br/>
              <span className="text-xs text-blue-400">Redirecionando para a verificação...</span>
            </p>
          </div>
        )}

        {/* Link para voltar ao Login */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Lembrou a senha?{' '}
            <span 
              onClick={() => navigate('/login')}
              className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer transition"
            >
              Voltar para o login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}