import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailVerification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [hasError, setHasError] = useState(false); // Estado para controlar o erro
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const userEmail = "usuario@ufla.br";

  // MOCK TEMPORÁRIO PARA TESTES
  const MOCK_VALID_CODE = "123456";

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setHasError(false); // Limpa o erro ao digitar novamente

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

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join(''); // Junta os 6 dígitos

    // Validação do Mock
    if (enteredCode === MOCK_VALID_CODE) {
      alert('✅ Código verificado com sucesso! Redirecionando...');
      navigate('/login'); // Redireciona de volta ao login (ou para uma nova senha)
    } else {
      setHasError(true);
      setCode(['', '', '', '', '', '']); // Limpa os campos
      inputs.current[0]?.focus(); // Volta o foco para o primeiro quadrado
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 relative font-sans">
      <div className="absolute top-8 right-8">
        <img 
          src="/src/assets/logo.png" 
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
                // Se der erro, a borda fica vermelha
                className={`w-12 h-14 bg-[#2A2A2A] border ${hasError ? 'border-red-500' : 'border-gray-700'} rounded-xl text-center text-2xl font-bold text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
              />
            ))}
          </div>

          {hasError && (
            <p className="text-red-500 text-sm mt-2">Código incorreto. Tente "123456".</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
          >
            Verificar
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