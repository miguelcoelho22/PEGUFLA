import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api'; // Certifique-se de que o arquivo src/api.ts existe

export default function Register() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Nova Regex: Aceita @ufla.br OU @qualquercoisa.ufla.br
    const emailRegex = /^[\w-.]+@([\w-]+\.)*ufla\.br$/;
    
    if (!emailRegex.test(email)) {
      setError('O e-mail deve ser institucional (ex: @ufla.br ou @estudante.ufla.br)');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!termsAccepted) {
      setError('Você precisa concordar com os Termos e Políticas de Privacidade.');
      return;
    }

    try {
      setIsLoading(true);
      
      // Chamada real para o Backend Java
      await api.post('/auth/register', {
        name: nome,
        lastName: sobrenome,
        email: email,
        password: password
      });

      alert(' Conta criada com sucesso! Verifique seu e-mail para ativar a conta.');
      
      // Enviando o e-mail para a tela de verificação para facilitar a UX
      navigate('/verify-email', { state: { userEmail: email } });
      
    } catch (err: any) {
      if (err.response && err.response.data) {
        // Pega a mensagem de erro vinda do GlobalExceptionHandler do Java
        setError(err.response.data.message || 'Erro ao realizar o cadastro.');
      } else {
        setError('Não foi possível conectar ao servidor. O backend está rodando?');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 relative font-sans">
      
      <div className="absolute top-8 right-8">
        <img src="/src/assets/Logo_PegUfla.png" alt="Logo PegUFLA" className="h-12 w-auto object-contain" />
      </div>

      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl p-8 sm:p-10 shadow-2xl border border-gray-800/50">
        <h1 className="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
        <p className="text-gray-400 mb-8 text-sm">Para utilizar o sistema PegUFLA</p>

        <form className="space-y-6" onSubmit={handleRegister}>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Nome</label>
              <input
                type="text" required placeholder="João"
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={nome} onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Sobrenome</label>
              <input
                type="text" required placeholder="Silva"
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">E-mail Institucional</label>
            <input
              type="email" required placeholder="usuario@ufla.br"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Senha</label>
            <input
              type="password" required placeholder="••••••••"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-start">
            <input
              id="terms" type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-700 bg-[#2A2A2A] text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-gray-400 cursor-pointer">
              Concordo com os <span className="text-blue-500">Termos</span> e <span className="text-blue-500">Políticas</span>.
            </label>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Já tem uma conta? <span onClick={() => navigate('/login')} className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer">Entrar</span>
          </p>
        </div>
      </div>
    </div>
  );
}