import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Função para saber se a aba está ativa (fica verde)
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 w-full bg-[#1862bc] flex justify-between px-2 pt-3 pb-1 items-end z-50">
      <button onClick={() => navigate('/dashboard')} className={`flex flex-col items-center w-1/5 ${isActive('/dashboard') ? 'text-[#318337]' : 'text-white'}`}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span className="text-[10px] font-bold mt-1">Buscar</span>
      </button>
      
      <button onClick={() => navigate('/CriarCarona')} className={`flex flex-col items-center w-1/5 ${isActive('/CriarCarona') ? 'text-[#318337]' : 'text-white'}`}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span className="text-[10px] font-bold mt-1">Oferecer</span>
      </button>
      
      <button onClick={() => navigate('/viagens')} className={`flex flex-col items-center w-1/5 ${isActive('/viagens') ? 'text-[#318337]' : 'text-white'}`}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
        <span className="text-[10px] font-bold mt-1">Viagens</span>
      </button>

      <button onClick={() => navigate('/perfil')} className={`flex flex-col items-center w-1/5 ${isActive('/perfil') ? 'text-[#318337]' : 'text-white'}`}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span className="text-[10px] font-bold mt-1">Perfil</span>
      </button>
    </nav>
  );
}