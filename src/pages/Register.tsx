import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementação da RN01: Validação de e-mail institucional
    if (!email.endsWith('@ufla.br')) {
      setError('O e-mail deve ser obrigatoriamente da UFLA (@ufla.br).');
      return;
    }
    setError('');
    console.log('Dados prontos para o Miguel (Backend):', { email });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-blue-900">Criar conta no PegUFLA</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail Institucional</label>
              <input
                type="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="usuario@ufla.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}