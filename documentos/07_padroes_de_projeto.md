# 07. Padrões de Projeto

## 1. Objetivo
Apresentar os padrões de projeto estruturais e de criação aplicados no desenvolvimento do PegUFLA. O foco desta arquitetura é estabelecer uma comunicação segura e eficiente entre a interface web e os serviços de backend, evitando exposição indevida de dados e garantindo a inversão de controle das dependências da aplicação.

---

## 2. Padrões selecionados

| Padrão | Onde será usado | Problema que resolve | Justificativa |
|---|---|---|---|
| **Data Transfer Object (DTO)** | Nas camadas de Controladores e Serviços, transitando dados de/para o frontend. Exemplo: `CaronaRequestDTO`, `ReservaResponseDTO`. | Impede a exposição direta das entidades de domínio (`Carona`, `User`) e de seus relacionamentos de banco de dados para o cliente. Previne ataques de *over-posting* (injeção de atributos não autorizados). | Garante um contrato estrito de API. O sistema recebe e devolve apenas os dados rigorosamente necessários, enquanto informações críticas, como a identidade do usuário, são inferidas internamente via token de autenticação, reduzindo a carga e a complexidade das requisições do frontend. |
| **Dependency Injection (DI)** | Na inicialização das classes de serviço (ex: `CaronaService`, `ReservaService`) e controladores da API. | Elimina o alto acoplamento gerado pela instanciação manual de dependências cruzadas (ex: um serviço instanciando seu próprio repositório). | Promove a Inversão de Controle (IoC). A injeção via construtor garante que as classes sejam imutáveis após a inicialização e mais fáceis de testar, permitindo o isolamento de componentes por meio de *mocks* em testes unitários. |
| **Singleton** | Gerenciamento de componentes de infraestrutura, serviços e repositórios. | Previne o consumo excessivo de memória e processamento que ocorreria se instâncias múltiplas de classes sem estado mutável (*sem estado compartilhado entre requisições*) fossem recriadas a cada requisição HTTP. | Padrão delegado nativamente ao contêiner de Injeção de Dependência da aplicação, que assegura uma única instância global de cada componente operacional durante o ciclo de vida da execução. |

---

## 3. Exemplo de aplicação

### Padrão: Data Transfer Object (DTO)
**Contexto:**  
Ao solicitar a criação de uma reserva, o sistema não deve permitir que o cliente envie parâmetros internos de controle, como `statusReserva` ou dados manipulados do motorista. O banco de dados exige a entidade `Reserva` completa, mas o frontend possui apenas uma visão limitada da ação.

**Aplicação no projeto:**  
Implementou-se o `ReservaRequestDTO` como uma estrutura imutável de entrada. No método `create` do `ReservaService`, o DTO é interceptado e os identificadores válidos (como `caronaId`) são extraídos. O serviço então busca as instâncias persistentes relacionadas e monta a entidade `Reserva` genuína com dados complementares gerados internamente pelo servidor de forma segura, antes da persistência.

**Benefício esperado:**  
Redução do acoplamento entre o modelo relacional de banco de dados e o contrato de comunicação da API. Alterações na tabela do banco não quebram o contrato visualizado pelo cliente, e o tráfego de dados na rede é otimizado.

---

## 4. Alternativas consideradas

| Alternativa | Motivo para não adoção |
|---|---|
| **Observer (Publish-Subscribe)** | Foi considerado para o envio de e-mails em caso de cancelamento de caronas. Atualmente, o `CaronaService` formata strings HTML e aciona o envio de e-mail de forma direta e síncrona, centralizando responsabilidades além do necessário. O padrão não foi implementado nesta versão para acelerar a entrega do Produto Mínimo Viável, constituindo um débito técnico que acopla regras de transporte à infraestrutura de comunicação. |
| **Strategy** | Inicialmente teorizado para definir algoritmos de correspondência e aprovação automática de passageiros (ex: critérios de distância ou prioridade por departamento). Não adotado porque a regra de negócio consolidada exige que o próprio motorista tome a decisão de forma manual (método `aprovarCarona`). Introduzir o padrão neste momento configuraria complexidade acidental desnecessária. |

---

## 5. Conclusão
A arquitetura atual do PegUFLA prioriza a estabilidade estrutural e a segurança das operações. O uso coordenado de DTOs, Injeção de Dependência e Singleton (gerenciado pelo Spring) estabelece uma estrutura organizada para o controle de fluxo e a proteção das entidades de domínio contra manipulações externas. A escolha de postergar a implementação de padrões comportamentais, como o *Observer*, representa uma decisão tática e pragmática de engenharia focada na entrega do Produto Mínimo Viável (MVP). O sistema assegura a integridade das transações de mobilidade, mantendo temporariamente responsabilidades concentradas no módulo de notificações. A evolução natural da plataforma exigirá o isolamento dessas operações periféricas em eventos assíncronos, garantindo que o núcleo do sistema permaneça coeso e escalável à medida que novas regras de comunicação forem integradas.
