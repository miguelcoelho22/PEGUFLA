 import React, { useState, useEffect } from 'react';

import api from '../services/api';

import Navbar from '../components/Navbar';


export default function Viagens() {

const [viagemAtiva, setViagemAtiva] = useState<any>(null);

const [historico, setHistorico] = useState<any[]>([]);

// 1. Novos estados para separar as solicitações

const [pedidosPendentes, setPedidosPendentes] = useState<any[]>([]);

const [pedidosAprovados, setPedidosAprovados] = useState<any[]>([]);

const [pedidosRecusados, setPedidosRecusados] = useState<any[]>([]);

const [loading, setLoading] = useState(true);

const [modalRecusarOpen, setModalRecusarOpen] = useState(false);

const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);

const [toastAprovado, setToastAprovado] = useState(false);


const formatarDataHora = (dataString: string) => {

if (!dataString) return { data: '', hora: '' };

const date = new Date(dataString);

const data = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

const hora = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

return { data, hora };

};


useEffect(() => {

const carregarViagens = async () => {

try {

// =========================================================

// BUSCA CARONAS ATIVAS

// =========================================================

let idCaronaAtiva = null;


try {

const resAtivas = await api.get('/carona/ativas');

const ativasDoUsuario = Array.isArray(resAtivas.data) ? resAtivas.data : (resAtivas.data.content || []);


if (ativasDoUsuario.length > 0) {

const carona = ativasDoUsuario[0];

const { data, hora } = formatarDataHora(carona.horarioSaida);

setViagemAtiva({ ...carona, dataFormatada: data, horaFormatada: hora });

idCaronaAtiva = carona.id; // Guarda o ID para buscar as reservas

} else {

setViagemAtiva(null);

}

} catch (err) {

console.error("Erro ao buscar caronas ativas:", err);

setViagemAtiva(null);

}


// =========================================================

// BUSCA SOLICITAÇÕES PENDENTES (NOVO ENDPOINT)

// =========================================================

if (idCaronaAtiva) {

try {

const resReservas = await api.get(`/reserva/solicitacoesReserva/${idCaronaAtiva}`);

// A API retorna as reservas com status "PENDENTE"

setPedidosPendentes(Array.isArray(resReservas.data) ? resReservas.data : []);

} catch (err) {

console.error("Erro ao buscar solicitações pendentes:", err);

}

}


// =========================================================

// BUSCA O HISTÓRICO

// =========================================================

try {

const resHist = await api.get('/carona/historicoCaronas?page=0&size=50');

const todasCaronas = resHist.data.content || [];

const concluidas = todasCaronas.filter((c: any) => c.statusViagem !== 'CRIADA');


setHistorico(concluidas.map((c: any) => {

const { data, hora } = formatarDataHora(c.horarioSaida);

return { ...c, dataFormatada: data, horaFormatada: hora };

}));

} catch (err: any) {

if (err.response?.status === 409) {

setHistorico([]);

}

}


} catch (error: any) {

console.error("Erro geral na tela de viagens:", error);

} finally {

setLoading(false);

}

};


carregarViagens();

}, []);


// --- FUNÇÕES DE INTEGRAÇÃO COM A API ---


const handleAprovar = async (pedido: any) => {

try {

// 1. Chama a API para aprovar

await api.get(`/reserva/${pedido.id}/aprovar`);

// 2. Remove dos pendentes e adiciona aos aprovados na tela

setPedidosPendentes(prev => prev.filter(p => p.id !== pedido.id));

setPedidosAprovados(prev => [...prev, pedido]);

setToastAprovado(true);

setTimeout(() => setToastAprovado(false), 3000);

} catch (error) {

console.error("Erro ao aprovar reserva:", error);

alert("Não foi possível aprovar a solicitação.");

}

};


const confirmarRecusa = async () => {

if (!pedidoSelecionado) return;


try {

// 1. Chama a API para rejeitar

await api.get(`/reserva/${pedidoSelecionado.id}/rejeitar`);

// 2. Remove dos pendentes e adiciona aos recusados na tela

setPedidosPendentes(prev => prev.filter(p => p.id !== pedidoSelecionado.id));

setPedidosRecusados(prev => [...prev, pedidoSelecionado]);

setModalRecusarOpen(false);

setPedidoSelecionado(null);

} catch (error) {

console.error("Erro ao recusar reserva:", error);

alert("Não foi possível recusar a solicitação.");

}

};


const abrirModalRecusar = (pedido: any) => {

setPedidoSelecionado(pedido);

setModalRecusarOpen(true);

};


// --- COMPONENTES VISUAIS ---


const RouteCard = ({ viagem }: { viagem: any }) => (

<div className="bg-[#f2f2f2] border border-gray-300 rounded-lg p-4 shadow-sm flex items-start justify-between relative">

<div className="flex items-stretch gap-3">

<div className="flex flex-col items-center justify-between py-1">

<div className="w-3.5 h-3.5 border-[2px] border-gray-500 rounded-full"></div>

<div className="w-[1.5px] h-8 bg-gray-400"></div>

<div className="w-3.5 h-3.5 border-[2px] border-gray-500 rounded-full"></div>

</div>

<div className="flex flex-col justify-between h-full gap-4">

<p className="text-gray-900 text-sm font-medium">{viagem.origem}</p>

<p className="text-gray-900 text-sm font-medium">{viagem.destino}</p>

</div>

</div>

<p className="text-gray-700 text-sm absolute top-4 right-4">

{viagem.dataFormatada} &nbsp; {viagem.horaFormatada}

</p>

</div>

);


if (loading) return <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center">Carregando...</div>;


return (

<div className="min-h-screen bg-[#f4f7fe] pb-28 font-sans relative">

<div className="px-6 pt-8 pb-6 flex items-center gap-3">

<div className="flex items-center justify-center">

<svg width="28" height="28" viewBox="0 0 24 24" fill="none">

<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#318337"/>

</svg>

</div>

<h1 className="text-2xl font-semibold text-gray-900">Minhas Viagens</h1>

</div>


<div className="px-5 space-y-8">

{/* SESSÃO: VIAGEM ATIVA */}

<section>

<h2 className="text-xl font-bold text-gray-900 mb-4">Viagem ativa:</h2>

{viagemAtiva ? (

<RouteCard viagem={viagemAtiva} />

) : (

<p className="text-sm text-gray-500 italic">Você não possui viagens ativas no momento.</p>

)}

</section>


{/* SESSÃO: SOLICITAÇÕES PENDENTES */}

{viagemAtiva && (pedidosPendentes.length > 0 || pedidosAprovados.length > 0 || pedidosRecusados.length > 0) && (

<section className="space-y-6">

{/* PENDENTES */}

{pedidosPendentes.length > 0 && (

<div>

<h3 className="text-md font-bold text-gray-900 mb-3 ml-1 flex items-center gap-2">

<span className="w-2 h-2 rounded-full bg-yellow-500"></span> Pendentes

</h3>

<div className="space-y-4 ml-1">

{pedidosPendentes.map((pedido) => (

<div key={pedido.id} className="space-y-2 w-11/12 max-w-[300px]">

<div className="bg-[#f2f2f2] border border-gray-300 rounded-lg p-3 flex items-center gap-4 shadow-sm">

<div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">

<svg width="20" height="20" viewBox="0 0 24 24" fill="#666"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>

</div>

<div>

<p className="text-gray-900 font-bold text-sm leading-tight">{pedido.user?.name} {pedido.user?.lastName}</p>

<p className="text-gray-500 text-xs mt-0.5">Aguardando aprovação</p>

</div>

</div>

<div className="flex gap-2">

<button onClick={() => abrirModalRecusar(pedido)} className="flex-1 bg-transparent border-2 border-[#1862bc] text-[#1862bc] py-1.5 rounded-md font-bold text-sm active:scale-95 transition-all">Recusar</button>

<button onClick={() => handleAprovar(pedido)} className="flex-1 bg-[#1862bc] border-2 border-[#1862bc] text-white py-1.5 rounded-md font-bold text-sm active:scale-95 transition-all">Aprovar</button>

</div>

</div>

))}

</div>

</div>

)}


{/* APROVADOS */}

{pedidosAprovados.length > 0 && (

<div>

<h3 className="text-md font-bold text-gray-900 mb-3 ml-1 flex items-center gap-2">

<span className="w-2 h-2 rounded-full bg-green-500"></span> Confirmados

</h3>

<div className="space-y-2 ml-1">

{pedidosAprovados.map((pedido) => (

<div key={pedido.id} className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-4 shadow-sm w-11/12 max-w-[300px]">

<div className="w-10 h-10 bg-white border border-green-300 rounded-full flex items-center justify-center overflow-hidden text-green-600">

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>

</div>

<div>

<p className="text-gray-900 font-bold text-sm leading-tight">{pedido.user?.name} {pedido.user?.lastName}</p>

<p className="text-green-700 font-semibold text-xs mt-0.5">Vaga Garantida</p>

</div>

</div>

))}

</div>

</div>

)}


{/* RECUSADOS */}

{pedidosRecusados.length > 0 && (

<div>

<h3 className="text-md font-bold text-gray-900 mb-3 ml-1 flex items-center gap-2">

<span className="w-2 h-2 rounded-full bg-red-500"></span> Recusados

</h3>

<div className="space-y-2 ml-1">

{pedidosRecusados.map((pedido) => (

<div key={pedido.id} className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-4 shadow-sm w-11/12 max-w-[300px] opacity-80">

<div className="w-10 h-10 bg-white border border-red-300 rounded-full flex items-center justify-center overflow-hidden text-red-500">

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

</div>

<div>

<p className="text-gray-900 font-bold text-sm leading-tight">{pedido.user?.name} {pedido.user?.lastName}</p>

<p className="text-red-600 font-semibold text-xs mt-0.5">Solicitação Negada</p>

</div>

</div>

))}

</div>

</div>

)}


</section>

)}


{/* SESSÃO: HISTÓRICO */}

<section>

<h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">Histórico de viagens concluídas:</h2>

<div className="space-y-4">

{historico.length > 0 ? (

historico.map((viagem, index) => <RouteCard key={viagem.id || index} viagem={viagem} />)

) : (

<p className="text-sm text-gray-500 italic">Nenhum histórico encontrado.</p>

)}

</div>

</section>

</div>


<Navbar />


{/* TOAST E MODAL */}

{toastAprovado && (

<div className="fixed top-20 right-4 left-4 bg-[#f4f7fe] border border-gray-300 shadow-xl rounded-lg p-3 flex items-start gap-3 z-50 animate-fade-in-down">

<div className="text-blue-600 mt-0.5">

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>

</svg>

</div>

<div className="flex-1">

<p className="text-sm font-bold text-gray-900">Aprovada</p>

<p className="text-xs text-gray-600">Solicitação de carona aprovada</p>

</div>

<button onClick={() => setToastAprovado(false)} className="text-blue-600">

<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>

</svg>

</button>

</div>

)}


{modalRecusarOpen && (

<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">

<div className="bg-[#f4f7fe] border border-gray-300 rounded-lg w-full max-w-sm shadow-2xl relative pt-8 pb-6 px-6 text-center">

<button onClick={() => setModalRecusarOpen(false)} className="absolute top-3 right-3 text-blue-600">

<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">

<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>

</svg>

</button>

<h3 className="text-lg font-bold text-gray-900 mb-1">Recusar solicitação?</h3>

<p className="text-xs text-gray-600 mb-6">Você está prestes a recusar {pedidoSelecionado?.user?.name}</p>

<div className="flex justify-center gap-3">

<button onClick={() => setModalRecusarOpen(false)} className="w-24 bg-white border border-[#1862bc] text-[#1862bc] py-1.5 rounded font-bold text-sm active:scale-95 transition-all">Não</button>

<button onClick={confirmarRecusa} className="w-24 bg-[#1862bc] border border-[#1862bc] text-white py-1.5 rounded font-bold text-sm active:scale-95 transition-all">Sim</button>

</div>

</div>

</div>

)}

</div>

);

} 