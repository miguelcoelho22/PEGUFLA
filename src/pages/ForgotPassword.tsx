import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mantendo a Regra de Negócio RN01: Validação do e-mail institucional
    if (!email.endsWith('@ufla.br')) {
      alert('Por favor, insira um e-mail válido da UFLA (@ufla.br).');
      return;
    }

    // Aqui entrará a integração com a API do Miguel futuramente
    console.log('Solicitação de reset enviada para:', email);
    setIsSent(true); // Muda o estado para mostrar a mensagem de sucesso
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
                placeholder="usuario@ufla.br"
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-2"
            >
              Enviar e-mail
            </button>
          </form>
        ) : (
          /* Mensagem pós-envio com foco em segurança (Prevenção de User Enumeration) */
          <div className="bg-[#2A2A2A] border border-blue-500/30 rounded-lg p-6 text-center mb-6">
            <p className="text-gray-300 text-sm">
              Se o e-mail <span className="text-white font-semibold">{email}</span> estiver cadastrado em nossa base, você receberá as instruções em breve.
            </p>
          </div>
        )}

        {/* Link para voltar ao Login */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Lembrou a senha? <span className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer transition">Voltar para o login</span>
          </p>
        </div>
      </div>
    </div>
  );
}