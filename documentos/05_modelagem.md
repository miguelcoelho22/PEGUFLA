# Modelagem do Sistema PegUFLA

## 1. Diagrama de Casos de Uso

O diagrama de casos de uso representa as principais funcionalidades do sistema e a interação do usuário com essas funcionalidades.

O ator principal do sistema é o usuário, que pode realizar ações como cadastro, login, criação e busca de caronas, além de interagir com outros usuários por meio da plataforma.

![Diagrama de casos de uso](../docs/images/casos-de-uso-pegufla.png)

## Diagrama de Componentes

O diagrama de componentes representa a arquitetura geral do sistema PegUFLA, evidenciando a separação entre frontend, backend e banco de dados, além dos principais serviços responsáveis pelas funcionalidades da aplicação.

O frontend web é responsável pela interface com o usuário, realizando requisições ao backend por meio de HTTP/HTTPS. O backend foi previsto como uma API desenvolvida em Java com Spring Boot, centralizando as regras de negócio e organizando as funcionalidades em serviços específicos, como autenticação, gerenciamento de caronas, reservas, mensagens e veículos.

Cada serviço é responsável por uma parte do sistema e realiza operações de leitura e escrita no banco de dados, garantindo maior organização e modularização da aplicação.

![Diagrama de Componentes](../docs/images/diagrama-componentes-pegufla.png)

## Modelo de Dados

O modelo de dados representa as principais entidades do sistema PegUFLA e seus relacionamentos, servindo como base para a organização das informações no banco de dados.

Neste modelo, são representadas entidades como **Usuário**, **Veículo**, **Carona**, **Reserva** e **Mensagem**. O usuário pode cadastrar veículos, criar caronas, solicitar participação em caronas por meio de reservas e trocar mensagens vinculadas a uma carona.

Esse modelo auxilia na compreensão da estrutura de dados necessária para atender aos requisitos funcionais do sistema.

![Modelo de Dados](../docs/images/modelo-dados-pegufla.jpeg)
