# Sprint 07 – Planejamento e Documentação de Testes

## 1. Identificação

**Número da sprint:** 07
**Período:** 24/05/2026 a 30/05/2026
**Data de entrega:** 30/05/2026

## 2. Objetivo da sprint

Planejar a estratégia de testes da aplicação PegUFLA, definindo objetivos, tipos de teste, critérios de aceitação, casos de teste e a relação entre requisitos e verificações necessárias para validar os principais incrementos do projeto.

## 3. Itens do Sprint Backlog

* TASK - Elaborar plano de testes da aplicação
* TASK - Definir casos e cenários de teste
* TASK - Revisar critérios de aceitação das principais funcionalidades
* TASK - Criar matriz simples de rastreabilidade entre requisitos e testes
* TASK - Documentar os testes no GitHub
* TASK - Registrar a Sprint 07

## 4. Relação com o conteúdo da disciplina

Esta sprint está relacionada ao conteúdo de testes de software, abordando o planejamento da validação da aplicação, os tipos de testes aplicáveis, a elaboração de casos de teste, a definição de critérios de aceitação e a relação entre requisitos funcionais e verificação.

O planejamento dos testes contribui para garantir que as funcionalidades implementadas estejam de acordo com os requisitos definidos nas sprints anteriores e que o sistema possa ser avaliado de forma mais organizada e objetiva.

## 5. Artefatos

* Plano de testes
* Casos de teste
* Cenários de teste
* Checklist de validação
* Critérios de aceitação revisados
* Matriz simples de rastreabilidade entre requisitos e testes
* Registro da Sprint 07
* Documentação dos testes no GitHub
* Arquivo `docs/sprints/sprint-07.md`

## 6. Objetivos de teste

Os testes planejados têm como objetivo verificar se as principais funcionalidades do PegUFLA funcionam corretamente e atendem aos requisitos definidos para a aplicação.

Os principais objetivos são:

* validar o cadastro e login de usuários;
* verificar a criação, edição e listagem de caronas;
* validar o gerenciamento de reservas;
* verificar o cadastro e gerenciamento de veículos;
* validar o histórico de caronas;
* verificar a troca de mensagens internas entre usuários;
* identificar possíveis falhas de navegação, preenchimento de dados e integração entre telas;
* garantir que os principais fluxos da aplicação estejam coerentes com os critérios de aceitação.

## 7. Tipos de teste aplicáveis

Para o contexto do projeto, foram considerados os seguintes tipos de teste:

### Testes funcionais

Verificam se as funcionalidades principais do sistema funcionam conforme o esperado, como cadastro, login, criação de caronas, reserva de vagas e gerenciamento de veículos.

### Testes de interface

Verificam se as telas da aplicação apresentam informações de forma clara, organizada e coerente com o fluxo esperado pelo usuário.

### Testes de integração

Verificam a comunicação entre frontend, backend e banco de dados, principalmente nos fluxos de autenticação, criação de caronas, reservas e mensagens.

### Testes de validação

Verificam se os requisitos definidos nas sprints anteriores foram atendidos de acordo com os critérios de aceitação.

### Testes de usabilidade básicos

Verificam se o usuário consegue navegar pela aplicação e executar as principais tarefas sem dificuldades excessivas.

## 8. Casos e cenários de teste

### CT01 - Cadastro de usuário

**Requisito relacionado:** Cadastro de usuários
**Cenário:** Um novo usuário deseja se cadastrar no sistema.
**Passos:**

1. Acessar a tela de cadastro.
2. Preencher os dados obrigatórios.
3. Enviar o formulário.

**Resultado esperado:**
O sistema deve cadastrar o usuário corretamente e permitir o acesso posterior à aplicação.

**Critérios de aceitação:**

* O sistema não deve permitir cadastro com campos obrigatórios vazios.
* O sistema deve validar os dados informados.
* O usuário cadastrado deve conseguir realizar login.

---

### CT02 - Login de usuário

**Requisito relacionado:** Autenticação de usuários
**Cenário:** Um usuário já cadastrado deseja acessar o sistema.
**Passos:**

1. Acessar a tela de login.
2. Informar e-mail e senha.
3. Confirmar o login.

**Resultado esperado:**
O sistema deve autenticar o usuário e redirecioná-lo para a área principal da aplicação.

**Critérios de aceitação:**

* O login deve funcionar com credenciais válidas.
* O sistema deve impedir acesso com dados incorretos.
* O usuário autenticado deve acessar as funcionalidades permitidas.

---

### CT03 - Criação de carona

**Requisito relacionado:** Criação de caronas
**Cenário:** Um usuário deseja oferecer uma carona.
**Passos:**

1. Acessar a tela de criação de carona.
2. Informar origem, destino, data, horário e quantidade de vagas.
3. Confirmar a criação.

**Resultado esperado:**
A carona deve ser criada e exibida na listagem de caronas disponíveis.

**Critérios de aceitação:**

* Todos os campos obrigatórios devem ser preenchidos.
* A carona criada deve aparecer corretamente para outros usuários.
* O sistema deve impedir a criação com dados inválidos ou incompletos.

---

### CT04 - Listagem de caronas

**Requisito relacionado:** Consulta de caronas disponíveis
**Cenário:** Um usuário deseja visualizar caronas disponíveis.
**Passos:**

1. Acessar a tela de listagem de caronas.
2. Visualizar as caronas cadastradas.

**Resultado esperado:**
O sistema deve exibir as caronas disponíveis com as informações principais.

**Critérios de aceitação:**

* As caronas devem apresentar origem, destino, data, horário e vagas.
* A listagem deve estar atualizada.
* O usuário deve conseguir acessar os detalhes de uma carona.

---

### CT05 - Reserva de vaga em carona

**Requisito relacionado:** Gerenciamento de reservas
**Cenário:** Um usuário deseja reservar uma vaga em uma carona disponível.
**Passos:**

1. Acessar a listagem de caronas.
2. Selecionar uma carona.
3. Solicitar ou confirmar reserva.

**Resultado esperado:**
O sistema deve registrar a reserva e atualizar a quantidade de vagas disponíveis.

**Critérios de aceitação:**

* O usuário não deve reservar vaga em carona sem disponibilidade.
* A quantidade de vagas deve ser atualizada após a reserva.
* A reserva deve aparecer vinculada ao usuário.

---

### CT06 - Gerenciamento de veículos

**Requisito relacionado:** Cadastro e gerenciamento de veículos
**Cenário:** Um usuário deseja cadastrar ou atualizar informações de seu veículo.
**Passos:**

1. Acessar a tela de veículos.
2. Inserir ou alterar os dados do veículo.
3. Salvar as informações.

**Resultado esperado:**
O sistema deve salvar corretamente os dados do veículo.

**Critérios de aceitação:**

* O usuário deve conseguir cadastrar um veículo.
* O sistema deve validar campos obrigatórios.
* As informações salvas devem permanecer disponíveis para consulta.

---

### CT07 - Histórico de caronas

**Requisito relacionado:** Histórico de caronas
**Cenário:** Um usuário deseja visualizar suas caronas anteriores ou reservas realizadas.
**Passos:**

1. Acessar a área de histórico.
2. Visualizar caronas criadas ou participadas.

**Resultado esperado:**
O sistema deve exibir corretamente o histórico relacionado ao usuário.

**Critérios de aceitação:**

* O histórico deve apresentar informações relevantes das caronas.
* O usuário deve visualizar apenas informações relacionadas ao seu perfil.
* Os dados devem estar organizados de forma clara.

---

### CT08 - Mensagens internas

**Requisito relacionado:** Comunicação entre usuários
**Cenário:** Um usuário deseja enviar mensagem relacionada a uma carona.
**Passos:**

1. Acessar a área de mensagens.
2. Selecionar o usuário ou carona relacionada.
3. Enviar uma mensagem.

**Resultado esperado:**
A mensagem deve ser enviada e registrada corretamente no sistema.

**Critérios de aceitação:**

* O sistema deve permitir envio de mensagens.
* As mensagens devem estar associadas aos usuários corretos.
* O histórico de comunicação deve ser preservado.

## 9. Matriz simples de rastreabilidade

| Requisito | Funcionalidade            | Teste relacionado |
| --------- | ------------------------- | ----------------- |
| RF01      | Cadastro de usuário       | CT01              |
| RF02      | Login de usuário          | CT02              |
| RF03      | Criação de carona         | CT03              |
| RF04      | Listagem de caronas       | CT04              |
| RF05      | Reserva de vaga           | CT05              |
| RF06      | Gerenciamento de veículos | CT06              |
| RF07      | Histórico de caronas      | CT07              |
| RF08      | Mensagens internas        | CT08              |

## 10. Critérios de aceitação revisados

Os critérios de aceitação foram revisados com foco nas funcionalidades principais da aplicação.

De modo geral, considera-se que uma funcionalidade atende ao esperado quando:

* executa o fluxo principal sem erros;
* valida campos obrigatórios;
* apresenta mensagens ou impedimentos adequados em caso de erro;
* mantém os dados consistentes;
* está coerente com os requisitos definidos;
* permite ao usuário concluir a ação desejada.

## 11. Evidências no GitHub

Arquivos criados/atualizados:

* `documentos/09_plano_de_testes.md`
* `documentos/10_casos_de_teste.md`
* `docs/sprints/sprint-07.md`

Commits relevantes:

* Criação do plano de testes
* Documentação dos casos de teste
* Revisão dos critérios de aceitação
* Criação da matriz de rastreabilidade
* Atualização do registro da Sprint 07

Tag da sprint:

* `sprint-07`

## 12. Evolução da aplicação web

Durante esta sprint, o foco principal esteve na organização da estratégia de testes do PegUFLA. A aplicação passou a contar com um planejamento mais claro para validação de suas principais funcionalidades.

Foram definidos os objetivos de teste, os tipos de teste aplicáveis, os casos de teste principais, os critérios de aceitação revisados e uma matriz simples relacionando requisitos e testes.

Essa documentação contribui para orientar a validação do sistema e preparar a equipe para a consolidação final do projeto.

## 13. Dificuldades

* Definir quais testes seriam mais adequados para o estágio atual do projeto.
* Relacionar os requisitos definidos anteriormente com casos de teste objetivos.
* Evitar testes muito genéricos ou pouco verificáveis.
* Revisar critérios de aceitação de forma coerente com as funcionalidades implementadas.
* Organizar a documentação dos testes no GitHub.

## 14. Revisão do incremento

### O que foi concluído:

* Plano de testes elaborado.
* Casos e cenários de teste documentados.
* Tipos de teste aplicáveis identificados.
* Critérios de aceitação revisados.
* Matriz simples de rastreabilidade criada.
* Registro da Sprint 07 elaborado.
* Documentação dos testes organizada no GitHub.

### O que ficou:

* Execução prática completa dos testes.
* Registro detalhado dos resultados dos testes.
* Correção de eventuais falhas encontradas.
* Ampliação dos testes integrados e automatizados.

## 15. Pendências para o próximo sprint

* Consolidar as evidências finais do projeto.
* Executar os testes planejados, quando possível.
* Registrar resultados dos testes.
* Corrigir inconsistências identificadas.
* Atualizar a documentação final.
* Preparar a revisão final do projeto.
* Organizar os materiais para apresentação final.

## 16. Relato da Sprint

### Planejamento

A Sprint 07 foi planejada com foco na elaboração da documentação de testes do PegUFLA. A partir dos requisitos e funcionalidades definidos nas sprints anteriores, foram selecionados os principais fluxos da aplicação que deveriam ser verificados.

### Execução

Durante a sprint, foi produzido o plano de testes, contendo os objetivos de validação, os tipos de testes aplicáveis e os principais casos de teste. Também foram revisados os critérios de aceitação das funcionalidades e elaborada uma matriz simples de rastreabilidade entre requisitos e testes.

A documentação foi organizada no GitHub, incluindo o arquivo `docs/sprints/sprint-07.md` e os documentos auxiliares relacionados ao planejamento dos testes.

### Dificuldades

As principais dificuldades envolveram a definição do nível adequado de detalhamento dos casos de teste e a relação entre os requisitos funcionais e as verificações esperadas.

Também foi necessário garantir que os testes planejados fossem coerentes com o estágio atual da aplicação, sem propor validações excessivamente complexas para o escopo do projeto.

### Resultado

A sprint resultou em uma documentação de testes mais estruturada, permitindo compreender como as principais funcionalidades do PegUFLA deverão ser verificadas.

Com isso, o projeto passou a contar com uma base de validação mais clara, útil para a etapa final de consolidação, revisão e apresentação da aplicação.

## 17. Backlog do Produto atualizado

Durante a Sprint 07, o Product Backlog foi revisado para verificar sua relação com os testes planejados.

Não foram identificadas alterações estruturais obrigatórias no backlog, mas os testes ajudaram a reforçar a necessidade de validar funcionalidades como cadastro, login, criação de caronas, reservas, veículos, histórico e mensagens internas.

## 18. Revisão da sprint

A Sprint 07 consolidou o planejamento e a documentação dos testes do PegUFLA. Foram definidos os objetivos de teste, os tipos de teste aplicáveis, os casos de teste, os critérios de aceitação revisados e a matriz simples de rastreabilidade.

Como resultado, o projeto passou a contar com uma documentação mais clara para orientar a validação das principais funcionalidades da aplicação.

