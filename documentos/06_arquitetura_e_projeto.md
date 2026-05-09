# 06. Arquitetura e Projeto

## 1. Visão arquitetural
A solução adota uma arquitetura baseada no modelo MVC (Model-View-Controller) orientada a serviços e estruturada em camadas lógicas rigorosas. O domínio foi isolado e fatiado em pacotes modulares (como `carona`, `reserva` e `user`), garantindo que o fluxo de dados ocorra de forma unidirecional e controlada.

**Estilo arquitetural adotado:**  
- Em camadas lógicas (Controller, Service, Repository) / API RESTful Stateless.

**Justificativa:**  
A escolha pela arquitetura em camadas MVC clássica foi orientada pelo princípio da simplicidade. O escopo do PegUFLA exige operações transacionais claras. Abordagens mais complexas, como *Clean Architecture* ou Hexagonal, gerariam complexidade desnecessária neste estágio. A divisão modular adotada já garante Alta Coesão no domínio e isolamento suficiente para que, caso o sistema escale de forma inesperada no futuro, a refatoração ocorra sem dor.

---

## 2. Estrutura em alto nível
### Camadas ou módulos
| Camada/Módulo | Responsabilidade |
|---|---|
| Apresentação (Controllers) | Atuar como borda do sistema (API RESTful). Recebe requisições HTTP, valida as intenções do cliente via DTOs de entrada e retorna DTOs de saída blindados. Não processa regras de negócio. |
| Aplicação (Services) | Orquestrar as regras de negócio puras (ex: cálculo de vagas disponíveis, validação de permissões de motorista/passageiro) e gerenciar a consistência das transações no banco de dados. |
| Domínio (Models/Entities) | Representar as regras de estado e o coração do negócio (agregados de Carona, Reserva e User), estritamente mapeados para o esquema relacional. |
| Persistência (Repositories) | Isolar a complexidade da comunicação com o banco de dados. Utiliza Spring Data JPA para abstrair queries complexas e gerenciar o ciclo de vida dos objetos em memória. |

---

## 3. Principais decisões de projeto
| Decisão | Motivação | Impacto |
|---|---|---|
| Adoção rigorosa do padrão DTO (Data Transfer Object). | Evitar o vazamento de dados sensíveis da entidade (ex: senhas, hashes) e impedir que a estrutura do banco de dados dite o contrato da API. | **Baixo acoplamento.** Permite que o banco de dados evolua independentemente da interface do cliente, além de reforçar a segurança (Single Responsibility Principle). |
| Identidade extraída do Token JWT (Validação no Backend). | Prevenir vulnerabilidades de falsificação (IDOR). O cliente é um ambiente não confiável e não deve ditar quem é o autor de uma reserva enviando IDs via JSON. | **Segurança por Design.** A fonte da verdade sobre o usuário ativo baseia-se unicamente em assinaturas criptográficas validadas no servidor. A API torna-se totalmente *Stateless*. |
| Gerenciamento de Estado Transacional Centralizado. | Evitar a inconsistência de dados durante o cancelamento ou aprovação de caronas (ex: o status muda, mas o banco falha antes do e-mail ser enviado). | Uso compulsório de anotações `@Transactional` na camada de *Service*, delegando ao *Dirty Checking* do ORM a execução atômica (all-or-nothing) das queries. |

---

## 4. Tecnologias previstas
| Tecnologia | Finalidade | Justificativa |
|---|---|---|
| Spring Boot (Java) | Backend (API REST) | Ecossistema maduro que provê injeção de dependência e forte tipagem. Garante segurança corporativa (Spring Security) e gerenciamento facilitado de contexto transacional. |
| React | Interface (Frontend) | Criação de uma interface de usuário dinâmica, baseada em componentes reutilizáveis, operando como um cliente responsável apenas pela interface e consumo da API. |
| PostgreSQL | Banco de dados | SGBD relacional rigoroso. Essencial para garantir as propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade) exigidas para o controle financeiro e lógico de reservas. |

---

## 5. Riscos técnicos
| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Inconsistência de concorrência (Duas pessoas reservarem a mesma vaga no mesmo milissegundo). | Média | Alta | Aplicação de controle transacional rigoroso no Spring (`@Transactional`) e validações de redundância pré-persistência no `ReservaRepository`. |
| Exposição de operações críticas por métodos HTTP incorretos (ex: crawlers alterando dados via requisição GET). | Baixa | Alta | Imposição de rigor semântico REST. Uso estrito de `@PatchMapping`, `@PostMapping` e `@DeleteMapping` para operações que geram mutação de estado. |

---

## 6. Exemplo resumido
> Será adotada uma arquitetura em camadas lógicas modulares centrada na simplicidade. O foco do projeto é separar rigorosamente a interface (*cliente React e DTOs*), as regras centrais de negócio (*Services e Tokens JWT*) e a persistência de dados (*PostgreSQL e Hibernate*). Isso blindará o PegUFLA contra o vazamento de informações, impedirá a escalada de privilégios e facilitará a manutenção e evolução incremental do escopo atual.
