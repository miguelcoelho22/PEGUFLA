// src/types/index.ts

export interface User {
  id: number;
  email: string;
  name: string;
  lastName: string;
}

export interface Veiculo {
  id: number;
  modelo: string;
  marca: string;
  cor: string;
  placa: string;
  user: User;
}

export interface Carona {
  id: number;
  origem: string;
  destino: string;
  horarioSaida: string;
  vagasTotais: number;
  vagasDisponiveis: number;
  statusViagem: 'CRIADA' | 'CHEIA' | 'CONCLUIDA' | 'CANCELADA';
  user: User;
  veiculo: Veiculo;
}

// Interface OBRIGATÓRIA porque o Spring Boot retorna paginação
export interface PageResponse<T> {
  content: T[]; // É AQUI que as caronas vão chegar
  pageable: any;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}