# Sprint 07 – Planejamento e Documentação de Testes

## 1. Identificação

-Número da sprint: 07
-Período: 24/05/2026 a 30/05/2026
-Data da entrega: 30/05/2026

---

## 2. Objetivo da sprint

Planejar a estratégia de testes do PegUFLA, documentando os critérios de validação dos requisitos funcionais implementados, os tipos de testes aplicáveis, os casos de teste previstos e a rastreabilidade entre requisitos e verificações.

---

## 3. Itens do Sprint Backlog

* Elaborar a estratégia de testes da aplicação.
* Definir os tipos de testes aplicáveis ao backend.
* Documentar casos de teste para os requisitos funcionais.
* Revisar critérios de validação da API REST.
* Registrar defeitos identificados durante a validação.
* Organizar evidências e documentação dos testes no GitHub.

---

## 4. Relação com o conteúdo da disciplina

Esta sprint está relacionada ao conteúdo de Testes de Software, abordando planejamento de testes, definição de estratégias de validação, elaboração de casos de teste, critérios de aceitação e rastreabilidade entre requisitos e testes.

Também foram aplicados conceitos relacionados à validação de APIs REST, testes unitários, testes de integração e verificação dos requisitos funcionais definidos ao longo do projeto.

---

## 5. Artefatos produzidos

* Plano de Testes.
* Estratégia de Testes.
* Casos de Teste (CT01 a CT13).
* Critérios de Validação.
* Registro de Defeitos.
* Evidências de Teste.
* Matriz de Rastreabilidade.
* Documentação de Testes no GitHub.
* Arquivo `docs/sprints/sprint-07.md`.

### Estratégia de Testes

A estratégia de validação do backend do PegUFLA baseia-se em três pilares: testes unitários para a lógica de negócio (Service Layer), testes de API REST para validar a interface da API (Controller Layer) e testes de integração para fluxos externos (Mensageria/E-mail).

O objetivo é garantir que cada unidade de código seja robusta, que os contratos HTTP sejam respeitados e que a comunicação com o mundo externo funcione como esperado.

#### Objetivos

* Garantir a correção da lógica de domínio através do isolamento.
* Validar a conformidade das respostas da API (código de status e estrutura JSON).
* Confirmar a integridade da entrega de notificações ao usuário final.

### Tipos de Teste Previstos

| Tipo de teste       | Objetivo                                      | Evidência esperada                       |
| ------------------- | --------------------------------------------- | ---------------------------------------- |
| Teste unitário      | Validar regras de negócio e cálculos isolados | Relatório de execução da suíte de testes |
| Teste de API REST   | Validar estrutura de dados e status HTTP      | Logs de requisição e resposta            |
| Teste de integração | Validar comunicação com serviços externos     | Logs de envio e notificação de eventos   |

### Casos de Teste

| ID   | Requisito Relacionado | Cenário                              | Entrada                           | Resultado Esperado                       |
| ---- | --------------------- | ------------------------------------ | --------------------------------- | ---------------------------------------- |
| CT01 | RF01                  | Cadastro com e-mail único            | DTO de cadastro                   | Usuário criado e e-mail enviado          |
| CT02 | RF02                  | Autenticação de usuário              | Credenciais válidas               | Login realizado com sucesso              |
| CT03 | RF03                  | Criação de carona válida             | DTO completo da carona            | Carona criada com status 201 Created     |
| CT04 | RF04                  | Consulta/listagem de caronas         | Filtros de busca válidos          | Lista de caronas retornada               |
| CT05 | RF05                  | Reserva em carona disponível         | ID do usuário e ID da carona      | Reserva criada com status pendente       |
| CT06 | RF06                  | Aprovação/rejeição de reserva        | ID da reserva e ação escolhida    | Status da reserva atualizado             |
| CT07 | RF07                  | Consulta de detalhes da carona       | ID da carona                      | Dados detalhados retornados              |
| CT08 | RF08                  | Cancelamento de reserva              | ID da reserva                     | Reserva cancelada e vaga liberada        |
| CT09 | RF09                  | Exclusão de carona                   | ID da carona                      | Carona removida ou arquivada             |
| CT10 | RF10                  | Consulta de histórico de caronas     | Usuário autenticado               | Histórico retornado                      |
| CT11 | RF11                  | Envio e consulta de mensagens        | Texto, usuário e carona válidos   | Mensagem persistida e listada            |
| CT12 | RF12                  | Recuperação de senha                 | E-mail cadastrado e código válido | Código enviado e senha redefinida        |
| CT13 | RF13                  | Cadastro e gerenciamento de veículos | Dados válidos do veículo          | Veículo cadastrado, listado e gerenciado |

### Matriz de Rastreabilidade

| Requisito | Funcionalidade                 | Caso de Teste |
| --------- | ------------------------------ | ------------- |
| RF01      | Cadastro de usuário            | CT01          |
| RF02      | Login                          | CT02          |
| RF03      | Criação de carona              | CT03          |
| RF04      | Consulta de caronas            | CT04          |
| RF05      | Reserva de vagas               | CT05          |
| RF06      | Aprovação/Rejeição de reservas | CT06          |
| RF07      | Detalhes da carona             | CT07          |
| RF08      | Cancelamento de reserva        | CT08          |
| RF09      | Exclusão de carona             | CT09          |
| RF10      | Histórico de caronas           | CT10          |
| RF11      | Mensagens internas             | CT11          |
| RF12      | Recuperação de senha           | CT12          |
| RF13      | Gerenciamento de veículos      | CT13          |

### Critérios de Validação

* Cobertura mínima da lógica de negócio através de testes unitários.
* Sucesso nos códigos de status HTTP para operações CRUD (200, 201 e 204).
* Respeito à estrutura dos DTOs definidos no contrato da API.
* Registro de logs para falhas de integração identificadas.

### Registro de Defeitos

| ID    | Defeito                                                               | Gravidade | Status    | Ação                               |
| ----- | --------------------------------------------------------------------- | --------- | --------- | ---------------------------------- |
| BUG01 | Endpoint de criação de veículo retornava 200 OK em vez de 201 Created | Baixa     | Corrigido | Ajuste no Controller de Veículos   |
| BUG02 | DTO de carona expunha dados internos desnecessários                   | Alta      | Corrigido | Criação de DTO de saída específico |

### Evidências

As evidências dos testes serão registradas através de:

* Logs de execução do backend.
* Capturas de tela das funcionalidades.
* Respostas dos endpoints da API.
* Histórico de commits relacionados às correções.
* Documentação armazenada no GitHub.

### Exemplo de Validação

O contrato da API de Caronas será validado através do caso de teste CT03, onde uma requisição POST será enviada ao endpoint responsável pela criação de caronas contendo todos os dados obrigatórios.

Espera-se o retorno do código HTTP 201 Created juntamente com o DTO completo da carona, validando a integridade da comunicação entre Controller, Service, Repository e Banco de Dados.

---

## 6. Evidências no GitHub

### Arquivos criados/atualizados

* `documentos/09_testes.md`
* `docs/sprints/sprint-07.md`

### Commits relevantes

* Criação da documentação de testes.
* Definição dos casos de teste.
* Criação da matriz de rastreabilidade.
* Registro de defeitos identificados.
* Atualização da Sprint 07.

### Tag da sprint

* `sprint-07`

---

## 7. Evolução da aplicação web

Durante esta sprint foi produzida a documentação de testes do PegUFLA, definindo a estratégia de validação do backend e sua relação com os requisitos funcionais do sistema.

Foram documentados treze casos de teste cobrindo autenticação, cadastro de usuários, gerenciamento de caronas, reservas, histórico, mensagens internas, recuperação de senha e gerenciamento de veículos.

Também foram definidos critérios de validação, registros de defeitos e evidências para apoiar futuras execuções dos testes.

---

## 8. Dificuldades encontradas

* Definir uma estratégia de testes compatível com a arquitetura Spring Boot da aplicação.
* Relacionar os requisitos funcionais aos respectivos casos de teste.
* Garantir cobertura adequada dos principais fluxos do sistema.
* Estruturar a documentação de forma consistente com os demais artefatos do projeto.

---

## 9. Revisão do incremento

### O que foi concluído

* Estratégia de testes definida.
* Tipos de testes documentados.
* Casos de teste CT01 a CT13 elaborados.
* Critérios de validação documentados.
* Matriz de rastreabilidade criada.
* Registro de defeitos elaborado.
* Evidências de teste organizadas.
* Documentação disponibilizada no GitHub.

### O que ficou pendente

* Execução prática dos testes.
* Coleta dos resultados de execução.
* Ampliação da cobertura de testes automatizados.
* Correção de defeitos futuros identificados durante as validações.

---

## 10. Pendências para a próxima sprint

* Executar os testes planejados.
* Registrar os resultados obtidos em cada caso de teste.
* Corrigir inconsistências identificadas.
* Consolidar a documentação final do projeto.
* Preparar a apresentação final da disciplina.

---

## 11. Relato da Sprint

### Planejamento

A Sprint 07 foi planejada com foco na estruturação da estratégia de testes do PegUFLA, buscando estabelecer mecanismos formais para validação dos requisitos funcionais implementados ao longo do desenvolvimento.

### Execução

Foi produzido o documento de testes contendo a estratégia de validação, os tipos de testes previstos, os casos de teste associados aos requisitos funcionais, os critérios de validação, o registro de defeitos e as evidências esperadas.

Toda a documentação foi organizada e disponibilizada no repositório GitHub do projeto.

### Dificuldades

As principais dificuldades envolveram a definição da cobertura dos testes para os diversos módulos do sistema, a elaboração de cenários representativos para cada requisito funcional e a organização da documentação de forma compatível com a arquitetura da aplicação.

### Resultados

A Sprint 07 resultou em uma documentação de testes mais completa e alinhada à arquitetura do PegUFLA, permitindo relacionar requisitos, casos de teste e critérios de validação.

Como resultado, o projeto passou a contar com uma base estruturada para as atividades de validação e preparação da entrega final da disciplina.
