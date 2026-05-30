# Sprint 07 – Planejamento e Documentação de Testes

## 1. Identificação
- Número da sprint: 07 
- Período: 24/05/2026 a 30/05/2026
- Data da entrega:  30/05/2026

---

## 2. Objetivo da sprint

Planejar a estratégia de testes do PegUFLA, documentando os critérios de validação dos principais requisitos do sistema, definindo casos de teste, critérios de aceitação e a relação entre requisitos e verificações.

---

## 3. Itens do Sprint Backlog

* Elaborar o plano de testes da aplicação.
* Definir os tipos de teste aplicáveis.
* Criar casos e cenários de teste.
* Revisar critérios de aceitação dos requisitos.
* Elaborar matriz de rastreabilidade entre requisitos e testes.
* Organizar a documentação dos testes no GitHub.

---

## 4. Relação com o conteúdo da disciplina

Esta sprint está relacionada ao conteúdo de Testes de Software, abordando planejamento de testes, definição de estratégias de validação, elaboração de casos de teste, critérios de aceitação e rastreabilidade entre requisitos e testes.

Também foram aplicados conceitos relacionados à validação de APIs REST, testes de integração entre componentes e verificação dos requisitos funcionais definidos ao longo do projeto.

---

## 5. Artefatos produzidos

* Plano de Testes.
* Casos de Teste.
* Critérios de Aceitação Revisados.
* Matriz de Rastreabilidade.
* Registro da Sprint 07.
* Documentação de testes no GitHub.
* Arquivo `docs/sprints/sprint-07.md`.

### Plano de Testes

#### Estratégia de Testes

A estratégia de validação do PegUFLA foi definida considerando a arquitetura da aplicação documentada na Sprint 06, composta por frontend React, backend Spring Boot, API REST e banco de dados relacional.

O planejamento de testes busca validar não apenas as funcionalidades implementadas, mas também a comunicação entre os componentes da arquitetura, garantindo que os requisitos funcionais sejam atendidos de forma consistente.

A estratégia está baseada em três níveis principais:

##### Testes Unitários

Aplicados à camada de serviços (Service Layer), com foco na validação das regras de negócio da aplicação.

Objetivos:

* Validar regras de criação de caronas.
* Verificar gerenciamento de reservas.
* Validar operações relacionadas aos veículos.
* Garantir consistência dos dados manipulados pelo sistema.

##### Testes de Contrato/API

Aplicados aos endpoints REST expostos pelo backend.

Objetivos:

* Verificar códigos de status HTTP.
* Validar estrutura dos DTOs de entrada e saída.
* Garantir conformidade entre frontend e backend.
* Validar tratamento de erros.

##### Testes de Integração

Aplicados aos fluxos que envolvem múltiplos componentes da arquitetura.

Objetivos:

* Validar comunicação entre frontend, backend e banco de dados.
* Verificar persistência correta dos dados.
* Validar funcionamento do módulo de mensagens.
* Garantir integridade das operações executadas pelo usuário.

### Tipos de Teste Previstos

| Tipo de teste       | Objetivo                                     | Evidência esperada                       |
| ------------------- | -------------------------------------------- | ---------------------------------------- |
| Teste Unitário      | Validar regras de negócio isoladamente       | Execução bem-sucedida da suíte de testes |
| Teste de API        | Validar contratos REST, DTOs e códigos HTTP  | Logs de requisições e respostas          |
| Teste de Integração | Validar comunicação entre módulos do sistema | Persistência correta dos dados           |
| Teste Funcional     | Validar requisitos funcionais implementados  | Fluxos completos executados com sucesso  |
| Teste de Interface  | Validar navegação e comportamento das telas  | Navegação consistente entre páginas      |

### Casos de Teste

| ID   | Requisito Relacionado      | Cenário                       | Entrada                | Resultado Esperado               | Resultado Obtido |
| ---- | -------------------------- | ----------------------------- | ---------------------- | -------------------------------- | ---------------- |
| CT01 | RF01 – Cadastro de Usuário | Cadastro com dados válidos    | DTO de cadastro        | Usuário criado e persistido      | [Preencher]      |
| CT02 | RF02 – Login               | Login com credenciais válidas | E-mail e senha         | Usuário autenticado              | [Preencher]      |
| CT03 | RF03 – Criação de Carona   | Cadastro de carona válida     | DTO completo da carona | Status 201 Created               | [Preencher]      |
| CT04 | RF04 – Consulta de Caronas | Busca de caronas disponíveis  | Requisição GET         | Lista retornada corretamente     | [Preencher]      |
| CT05 | RF05 – Reserva de Carona   | Reserva de vaga disponível    | ID do usuário e carona | Reserva criada e vaga atualizada | [Preencher]      |
| CT06 | RF06 – Veículos            | Cadastro de veículo           | DTO de veículo         | Veículo persistido               | [Preencher]      |
| CT07 | RF07 – Histórico           | Consulta do histórico         | ID do usuário          | Histórico retornado              | [Preencher]      |
| CT08 | RF08 – Mensagens Internas  | Envio de mensagem             | Texto e IDs válidos    | Mensagem registrada              | [Preencher]      |

### Matriz de Rastreabilidade

| Requisito | Funcionalidade            | Caso de Teste |
| --------- | ------------------------- | ------------- |
| RF01      | Cadastro de usuário       | CT01          |
| RF02      | Login                     | CT02          |
| RF03      | Criação de carona         | CT03          |
| RF04      | Consulta de caronas       | CT04          |
| RF05      | Reserva de vagas          | CT05          |
| RF06      | Gerenciamento de veículos | CT06          |
| RF07      | Histórico de caronas      | CT07          |
| RF08      | Mensagens internas        | CT08          |

### Critérios de Aceitação Revisados

* Execução correta do fluxo principal da funcionalidade.
* Retorno dos códigos HTTP esperados (200, 201 e 204).
* Persistência correta dos dados no banco.
* Estrutura dos DTOs compatível com o contrato da API.
* Ausência de falhas críticas durante a execução.
* Navegação consistente entre as telas relacionadas.
* Integração adequada entre frontend e backend.

---

## 6. Evidências no GitHub

### Arquivos criados/atualizados

* `09_testes.md`
* `docs/sprints/sprint-07.md`

### Commits relevantes

* Criação do plano de testes.
* Documentação dos casos de teste.
* Revisão dos critérios de aceitação.
* Criação da matriz de rastreabilidade.
* Atualização do registro da Sprint 07.

### Tag da Sprint

* `sprint-07`

---

## 7. Evolução da aplicação web

Durante esta sprint foi realizada a estruturação da estratégia de testes da aplicação, permitindo relacionar os requisitos funcionais aos mecanismos de validação.

Também foram definidos casos de teste para os principais fluxos do sistema, incluindo autenticação, gerenciamento de caronas, reservas, veículos, histórico e mensagens internas.

A documentação produzida servirá como base para validações futuras e para a consolidação da qualidade do sistema.

---

## 8. Dificuldades encontradas

* Definir o nível adequado de detalhamento dos casos de teste.
* Relacionar requisitos funcionais com cenários de validação.
* Estruturar a documentação de forma compatível com a arquitetura da aplicação.
* Garantir alinhamento entre os testes planejados e os requisitos implementados.

---

## 9. Revisão do incremento

### O que foi concluído

* Plano de testes elaborado.
* Tipos de teste definidos.
* Casos de teste documentados.
* Critérios de aceitação revisados.
* Matriz de rastreabilidade criada.
* Documentação registrada no GitHub.

### O que ficou pendente

* Execução completa dos testes.
* Registro dos resultados obtidos.
* Correção de eventuais defeitos identificados.
* Ampliação dos testes automatizados.

---

## 10. Pendências para a próxima sprint

* Executar os testes planejados.
* Registrar evidências de validação.
* Corrigir defeitos encontrados.
* Consolidar a documentação final do projeto.
* Preparar a apresentação final da disciplina.

---

## 11. Relato da Sprint

### Planejamento

A Sprint 07 foi planejada com foco na organização da estratégia de testes do PegUFLA. Foram analisados os requisitos definidos nas sprints anteriores e identificadas as funcionalidades críticas que deveriam possuir validação documentada.

### Execução

Foram elaborados o plano de testes, os casos de teste, os critérios de aceitação e a matriz de rastreabilidade. Também foi realizada a organização da documentação correspondente no repositório GitHub do projeto.

### Dificuldades

As principais dificuldades envolveram a definição de cenários representativos para os requisitos implementados e a elaboração de uma documentação que refletisse adequadamente a arquitetura do sistema.

### Resultados

Como resultado, o projeto passou a contar com uma estratégia formal de validação, facilitando a verificação dos requisitos funcionais e preparando a equipe para a etapa final de consolidação e apresentação do sistema.
