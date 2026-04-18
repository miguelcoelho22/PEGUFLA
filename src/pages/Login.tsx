import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
        <div className="text-gray-600 text-[10px] text-right uppercase tracking-widest"></div>
      </div>

      {/* Card de Login */}
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl p-10 shadow-2xl border border-gray-800/50">
        <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo ao Pegufla!</h1>
        <p className="text-gray-400 mb-8">Informe seus dados para entrar</p>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">E-mail Institucional</label>
            <input
              type="email"
              placeholder="usuario@ufla.br"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

            {/* Container Flex para alinhar Lembrar Senha e Esqueci minha senha */}
            <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-[#2A2A2A] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#1E1E1E] transition cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 cursor-pointer select-none hover:text-gray-300 transition">
                Lembrar senha
                </label>
            </div>

            {/* Novo: Esqueci minha senha */}
            <button 
                type="button"
                className="text-sm text-blue-500 hover:text-blue-400 font-medium transition cursor-pointer"
                onClick={() => alert('Fluxo de recuperação de senha em desenvolvimento')}
            >
                Esqueci minha senha
            </button>
            </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-2"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Não tem uma conta? <span className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer transition">Cadastre-se</span>
          </p>
        </div>
      </div>
    </div>
  );
}