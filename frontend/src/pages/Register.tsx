import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [ra, setRa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações de Segurança e Regra de Negócio (RN01)
    if (!email.endsWith('@ufla.br')) {
      setError('O e-mail deve ser obrigatoriamente da UFLA (@ufla.br).');
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

    // Futuramente, o Axios enviará esses dados ao backend Java
    console.log('Dados do Cadastro:', { nome, sobrenome, ra, email, password });
    
    alert('✅ Conta criada com sucesso! Faça login para continuar.');
    navigate('/login');
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

      {/* Card de Cadastro */}
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl p-8 sm:p-10 shadow-2xl border border-gray-800/50 my-8">
        <h1 className="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
        <p className="text-gray-400 mb-8 text-sm">Para utilizar o sistema PegUFLA</p>

        <form className="space-y-5" onSubmit={handleRegister}>
          
          {/* Linha dividida para Nome e Sobrenome */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nome</label>
              <input
                type="text" required placeholder="João"
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
                value={nome} onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Sobrenome</label>
              <input
                type="text" required placeholder="Silva"
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
                value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}
              />
            </div>
          </div>

          {/* RA */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">RA</label>
            <input
              type="number" required placeholder="Ex: 202310123"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={ra} onChange={(e) => setRa(e.target.value)}
            />
          </div>

          {/* E-mail Institucional */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">E-mail Institucional</label>
            <input
              type="email" required placeholder="joao.silva@ufla.br"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Senha</label>
            <input
              type="password" required placeholder="••••••••"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Termos de Privacidade */}
          <div className="flex items-start pt-2">
            <input
              id="terms" type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-700 bg-[#2A2A2A] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#1E1E1E] transition cursor-pointer shrink-0"
              checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition">
              Concordo com os <span className="text-blue-500 hover:underline">Termos</span> e <span className="text-blue-500 hover:underline">Políticas de Privacidade</span>.
            </label>
          </div>

          {/* Exibição de Erros */}
          {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

          {/* Botão de Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-4"
          >
            Cadastrar
          </button>
        </form>

        {/* Link para Login */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Já tem uma conta?{' '}
            <span onClick={() => navigate('/login')} className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer transition">
              Entrar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}