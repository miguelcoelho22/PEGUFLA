# Modelagem do Sistema PegUFLA

## 1. Diagrama de Casos de Uso

![Diagrama de casos de uso](../docs/images/casos-de-uso-pegufla.png)

O diagrama de casos de uso apresenta o ator principal do sistema, o usuário, e as funcionalidades centrais oferecidas pela aplicação, como cadastro, login, recuperação de senha, criação e busca de caronas, solicitação de vaga, gerenciamento de reservas, histórico e mensagens internas.

Foi utilizado apenas um ator, pois o sistema não possui perfis fixos de motorista e passageiro. O mesmo usuário pode realizar diferentes ações conforme o contexto, como criar caronas, solicitar participação ou gerenciar solicitações de uma carona criada. Considera-se que a maioria das funcionalidades depende de autenticação prévia, com exceção de cadastro, login e recuperação de senha.

## Diagrama de Componentes

![Diagrama de Componentes](../docs/images/diagrama-componentes-pegufla.png)

O diagrama de componentes representa a estrutura geral da aplicação web PegUFLA, separando frontend, backend, serviços internos e banco de dados. Esse modelo auxilia na compreensão da organização do sistema e na justificativa das decisões arquiteturais adotadas.

## Modelo de Dados

![Modelo de Dados](../docs/images/modelo-dados-pegufla.jpeg)

O modelo de dados apresenta as entidades centrais do sistema, como usuário, veículo, carona, reserva e mensagem, bem como seus relacionamentos. Ele serve de base para a implementação do banco de dados e para a compreensão das regras de negócio da aplicação.

## Diagrama de Sequência

![Diagrama de Sequência](../docs/images/diagrama-sequencia-pegufla.png)

O diagrama de sequência detalha o fluxo de solicitação de vaga em uma carona no sistema PegUFLA, mostrando como o usuário interage com a interface web e como a solicitação percorre o backend e o banco de dados.

Nesse fluxo, o usuário seleciona uma carona, visualiza seus detalhes e solicita uma vaga. O sistema verifica a disponibilidade e, caso existam vagas, registra uma reserva com status pendente. Caso não haja disponibilidade, uma mensagem de erro é retornada ao usuário.
