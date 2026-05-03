# Sprint 03 – Modelagem do Sistema

## 1. Identificação
- Número da sprint: 03  
- Período: 26/04/2026 a 02/05/2026
- Data da entrega: 02/05/2026

---

## 2. Objetivo da sprint
Representar a solução por meio de modelos que auxiliem a compreensão do sistema e apoiem as decisões de desenvolvimento.

---

## 3. Itens do Sprint Backlog
- TASK - Elaborar diagramas e modelos do sistema
- TASK - Produzir descrição textual dos modelos 
- TASK - Relacionar requisitos aos modelos produzidos
- TASK - Refinar Product Backlog com base na modelagem
- TASK - Desenvolver protótipos visuais das funcionalidades da Sprint 03
- US03 – Criar carona (back-end)
- US04 – Buscar carona (back-end)
- US07 – Visualizar caronas (back-end)
- US09 - Excluir carona (back-end)

---

## 4. Relação com o conteúdo da disciplina
Esta sprint está diretamente relacionada ao conteúdo de Modelagem de Sistemas, abordando a representação estrutural e comportamental da aplicação, além da integração entre requisitos e modelos.

---

## 5. Artefatos produzidos

### Modelos produzidos
- Diagrama de Casos de Uso  
- Diagrama de Componentes  
- Modelo de Dados (MER)  
- Diagrama de Sequência  

### Documentação
- Documento de modelagem do sistema  
- Documento de requisitos atualizado  
- Product Backlog atualizado  
- Diagramas adicionados ao repositório  

---

## 6. Relação com os requisitos
A relação entre os requisitos funcionais e os modelos produzidos foi registrada no documento de modelagem, por meio de uma tabela de vínculo entre requisito, modelo relacionado e justificativa.

---

## 7. Evidências no GitHub
- Arquivos criados/atualizados:
  - docs/05_modelagem.md  
  - docs/04_requisitos.md  
  - docs/03_product-backlog.md  
  - docs/images/diagrama-casos-uso-pegufla.png  
  - docs/images/diagrama-componentes-pegufla.png  
  - docs/images/modelo-dados-pegufla.jpeg  
  - docs/images/diagrama-sequencia-pegufla.png  

- Commits relevantes:
  - Atualização do Product Backlog  
  - Upload dos diagramas da Sprint 03  
  - Atualização da documentação de modelagem  
  - Atualização do documento de requisitos  

- Tag da sprint:
  - sprint 3  

---

## 8. Evolução da aplicação web
Durante esta sprint, o backend avançou além do planejado, realizando a implementação completa do CRUD de caronas, incluindo a funcionalidade de exclusão, que estava inicialmente prevista para uma sprint posterior.

O frontend concentrou-se na estruturação e estilização das telas com base nos protótipos definidos, não sendo possível realizar as integrações com o backend devido a limitações de tempo e outras demandas acadêmicas.

O design finalizou as telas previstas, contribuindo para a definição visual e organização da interface da aplicação.

---

## 9. Dificuldades encontradas
- Limitação de tempo do time frontend devido a avaliações acadêmicas  
- Problemas técnicos que impactaram a realização das integrações  
- Necessidade de ajustes no escopo durante a sprint, especialmente relacionados à modelagem de veículos  

---

## 10. Revisão do incremento

### O que foi concluído:
- Elaboração dos principais modelos do sistema  
- Definição da estrutura de dados  
- Implementação do CRUD de caronas no backend  
- Estruturação e estilização das telas no frontend  
- Finalização dos protótipos pelo design  
- Relacionamento entre requisitos e modelos  

### O que ficou pendente:
- Integração entre frontend e backend  
- Testes completos das funcionalidades implementadas  

---

## 11. Pendências para a próxima sprint
- Definição da arquitetura da aplicação (frontend, backend e serviços)
- Decomposição do sistema em módulos ou componentes
- Descrição dos principais módulos do sistema
- Definição e justificativa das decisões de projeto adotadas
- Análise de alternativas de implementação
- Alinhamento entre requisitos e estrutura proposta
- Atualização do Product Backlog com base nas decisões de projeto
- Início da integração entre frontend e backend

---

## 12. Relato da Sprint

### Planejamento
A sprint foi planejada com foco na modelagem do sistema, definindo os principais modelos necessários para representar a solução e apoiar as decisões de desenvolvimento.

### Execução
Foram elaborados os diagramas de casos de uso, componentes, modelo de dados e sequência, além da descrição textual dos modelos e da relação com os requisitos.

O backend avançou significativamente, implementando o CRUD completo de caronas. O frontend concentrou-se na estruturação e estilização das telas, não sendo possível realizar as integrações planejadas. O design finalizou os protótipos da aplicação.

### Dificuldades
As principais dificuldades envolveram o alinhamento entre os requisitos e os modelos, além de limitações de tempo do time frontend e problemas técnicos que impactaram a execução das integrações.

### Resultados
A sprint resultou em uma definição clara da estrutura do sistema por meio da modelagem, além de avanços importantes na implementação backend e na construção visual da aplicação. Apesar da ausência de integração, o sistema evoluiu de forma consistente para as próximas etapas de desenvolvimento.

---

## 13. Refinamentos realizados no backlog

Durante a Sprint 03, o Product Backlog foi refinado com base na modelagem do sistema, visando maior coerência entre os requisitos e os modelos elaborados.

A principal alteração foi a separação da funcionalidade de veículos da criação de caronas, passando a ser tratada como um módulo independente. Com isso, foi criado o requisito RF13 – Gerenciar veículos, permitindo ao usuário cadastrar, visualizar, editar e remover seus veículos.

Também foi ajustado o requisito de criação de caronas, que passou a exigir a seleção de um veículo previamente cadastrado.

Além disso, o fluxo de solicitação de vaga foi refinado, passando a ser representado como uma reserva com status pendente, conforme definido no modelo de dados e no diagrama de sequência.

Esses refinamentos tornaram o backlog mais consistente com a estrutura da aplicação e com os modelos produzidos.

---

## 14. Revisão da sprint

Durante a Sprint 03, foram elaborados os principais modelos do sistema PegUFLA, incluindo diagrama de casos de uso, diagrama de componentes, modelo de dados e diagrama de sequência.

A partir desses modelos, foram tomadas decisões importantes sobre a estrutura do sistema, como a separação da funcionalidade de veículos da criação de caronas e a definição do fluxo de solicitação de vaga como uma reserva com status pendente.

Como resultado, obteve-se uma visão mais clara e organizada da aplicação, permitindo alinhar os requisitos com a estrutura do sistema e orientar as próximas etapas de desenvolvimento.

Como próximos passos, estão previstos a integração entre frontend e backend, a continuidade do desenvolvimento das funcionalidades e a implementação do gerenciamento de veículos.
