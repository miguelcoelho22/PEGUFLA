# Sprint 07 - Plano de Testes

## Estratégia de Testes

A estratégia de validação do PegUFLA foi definida considerando a arquitetura da aplicação documentada na Sprint 06, composta por frontend React, backend Spring Boot, API REST e banco de dados relacional.

O planejamento de testes busca validar não apenas as funcionalidades implementadas, mas também a comunicação entre os componentes da arquitetura, garantindo que os requisitos funcionais sejam atendidos de forma consistente.

A estratégia está baseada em três níveis principais:

### Testes Unitários

Aplicados à camada de serviços (Service Layer), com foco na validação das regras de negócio da aplicação.

Objetivos:

* Validar regras de criação de caronas.
* Verificar gerenciamento de reservas.
* Validar operações relacionadas aos veículos.
* Garantir consistência dos dados manipulados pelo sistema.

### Testes de Contrato/API

Aplicados aos endpoints REST expostos pelo backend.

Objetivos:

* Verificar códigos de status HTTP.
* Validar estrutura dos DTOs de entrada e saída.
* Garantir conformidade entre frontend e backend.
* Validar tratamento de erros.

### Testes de Integração

Aplicados aos fluxos que envolvem múltiplos componentes da arquitetura.

Objetivos:

* Validar comunicação entre frontend, backend e banco de dados.
* Verificar persistência correta dos dados.
* Validar funcionamento do módulo de mensagens.
* Garantir integridade das operações executadas pelo usuário.

# 7. Tipos de Teste Previstos

| Tipo de teste       | Objetivo                                     | Evidência esperada                       |
| ------------------- | -------------------------------------------- | ---------------------------------------- |
| Teste Unitário      | Validar regras de negócio isoladamente       | Execução bem-sucedida da suíte de testes |
| Teste de API        | Validar contratos REST, DTOs e códigos HTTP  | Logs de requisições e respostas          |
| Teste de Integração | Validar comunicação entre módulos do sistema | Persistência correta dos dados           |
| Teste Funcional     | Validar requisitos funcionais implementados  | Fluxos completos executados com sucesso  |
| Teste de Interface  | Validar navegação e comportamento das telas  | Navegação consistente entre páginas      |

# 8. Casos de Teste

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

# 9. Matriz de Rastreabilidade

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

# 10. Critérios de Aceitação Revisados

Para que um requisito seja considerado validado, os seguintes critérios devem ser atendidos:

* Execução correta do fluxo principal da funcionalidade.
* Retorno dos códigos HTTP esperados (200, 201, 204).
* Persistência correta dos dados no banco.
* Estrutura dos DTOs compatível com o contrato da API.
* Ausência de falhas críticas durante a execução.
* Navegação consistente entre as telas relacionadas.
* Integração adequada entre frontend e backend.

# 11. Registro de Defeitos

| ID    | Defeito                                                           | Gravidade | Status     | Ação                             |
| ----- | ----------------------------------------------------------------- | --------- | ---------- | -------------------------------- |
| BUG01 | Endpoint retornava código HTTP incorreto para criação de carona   | Média     | Corrigido  | Ajuste no Controller             |
| BUG02 | Dados internos expostos indevidamente em DTO de resposta          | Alta      | Corrigido  | Revisão dos DTOs                 |
| BUG03 | Reserva não atualizava corretamente o número de vagas disponíveis | Alta      | Em análise | Verificação da lógica de negócio |

# 12. Evidências

As evidências dos testes serão registradas através de:

* Logs de execução do backend.
* Capturas de tela das funcionalidades.
* Respostas dos endpoints da API.
* Histórico de commits relacionados às correções.
* Documentação armazenada no GitHub.

# 13. Exemplo de Validação

O requisito RF03 – Criação de Carona será validado através do caso de teste CT03.

Uma requisição POST será enviada ao endpoint responsável pela criação de caronas contendo todos os campos obrigatórios definidos pelo sistema.

O resultado esperado é o retorno do código HTTP 201 Created, juntamente com o DTO da carona criada, demonstrando que a comunicação entre Controller, Service, Repository e Banco de Dados ocorreu corretamente e que as regras de negócio associadas foram respeitadas.
