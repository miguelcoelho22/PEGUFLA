import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api'; // Importando a configuração do Axios

export default function EmailVerification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pega o e-mail passado pelas telas de Cadastro ou Esqueci a Senha
  const userEmail = location.state?.userEmail || "usuario@ufla.br";

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setHasError(false); // Limpa o erro visual ao voltar a digitar

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join('');

    if (enteredCode.length < 6) return; // Aguarda os 6 dígitos

    try {
      setIsLoading(true);
      setHasError(false);

      // Chamada real para o backend Java do PegUFLA
      await api.post('/auth/verify', {
        email: userEmail,
        verificationCode: enteredCode
      });

      alert('✅ Código verificado com sucesso!');
      
      // Se este componente estiver sendo usado para Cadastro, vai para o /login
      // Se for para Esqueci a Senha, vai para o /reset-password
      // Por padrão, para ativação de conta:
      navigate('/login'); 
      
    } catch (err: any) {
      setHasError(true);
      
      // Captura a mensagem real de erro do Spring Boot (ex: "Código expirado")
      if (err.response && err.response.data) {
        setErrorMessage(
          typeof err.response.data === 'string' 
            ? err.response.data 
            : err.response.data.message || 'Código inválido.'
        );
      } else {
        setErrorMessage('Erro ao comunicar com o servidor.');
      }
      
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus(); // Volta o foco para o início em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 relative font-sans">
      <div className="absolute top-8 right-8">
        <img 
          src="/src/assets/Logo_PegUfla.png" 
          alt="Logo PegUFLA" 
          className="h-12 w-auto object-contain"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <div className="text-gray-600 text-[10px] text-right uppercase tracking-widest">Logo Area</div>
      </div>

      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl p-10 shadow-2xl border border-gray-800/50 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Verificação de e-mail</h1>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          Para sua segurança, enviamos um código de 6 dígitos para o e-mail: <br />
          <span className="text-blue-400 font-medium">{userEmail}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-8">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => { inputs.current[index] = el; }}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 bg-[#2A2A2A] border ${hasError ? 'border-red-500' : 'border-gray-700'} rounded-xl text-center text-2xl font-bold text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
              />
            ))}
          </div>

          {/* Exibição dinâmica da mensagem de erro da API */}
          {hasError && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
          >
            {isLoading ? 'Verificando...' : 'Verificar'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Não recebeu o código? <span className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer transition">Reenviar</span>
          </p>
        </div>
      </div>
    </div>
  );
}