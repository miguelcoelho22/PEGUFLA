# 04. Requisitos

## 1. Levantamento de requisitos

Os requisitos do sistema foram identificados a partir de:

* análise do problema enfrentado pelos estudantes da UFLA;
* discussão em grupo sobre necessidades reais do contexto;
* observação de como atualmente os estudantes organizam caronas (grupos informais como WhatsApp);
* definição das funcionalidades essenciais para viabilizar uma aplicação web funcional.

---

## 2. Requisitos funcionais

| ID   | Requisito funcional | Descrição                                             | Prioridade |
| ---- | ------------------- | ----------------------------------------------------- | ---------- |
| RF01 | Cadastro de usuário | O sistema deve permitir que usuários se cadastrem     | Alta       |
| RF02 | Login de usuário    | O sistema deve permitir autenticação                  | Alta       |
| RF03 | Criar carona        | Usuário pode oferecer carona                          | Alta       |
| RF04 | Buscar carona       | Usuário pode procurar caronas disponíveis             | Alta       |
| RF05 | Solicitar carona    | Usuário pode solicitar participação em uma carona     | Alta       |
| RF06 | Cancelar carona     | Usuário pode cancelar uma carona criada ou solicitada | Média      |
| RF07 | Visualizar detalhes | Usuário pode ver informações da carona                | Média      |
| RF08 | Gerenciar perfil    | Usuário pode editar seus dados                        | Baixa      |

---

## 3. Requisitos não funcionais

| ID    | Requisito não funcional | Descrição                          | Categoria      |
| ----- | ----------------------- | ---------------------------------- | -------------- |
| RNF01 | Acesso web              | Sistema acessível via navegador    | Usabilidade    |
| RNF02 | Tempo de resposta       | Sistema deve responder rapidamente | Desempenho     |
| RNF03 | Autenticação            | Ações restritas exigem login       | Segurança      |
| RNF04 | Persistência de dados   | Dados devem ser armazenados        | Confiabilidade |
| RNF05 | Interface intuitiva     | Sistema fácil de usar              | Usabilidade    |

---

## 4. Regras de negócio

| ID   | Regra           | Descrição                                            |
| ---- | --------------- | ---------------------------------------------------- |
| RN01 | Carona válida   | Uma carona deve ter origem, destino e horário        |
| RN02 | Limite de vagas | Cada carona possui número limitado de vagas          |
| RN03 | Não duplicidade | Usuário não pode solicitar a mesma carona duas vezes |
| RN04 | Cancelamento    | Usuário pode cancelar apenas suas próprias caronas   |
| RN05 | Email institucional obrigatório | O usuário deve se cadastrar utilizando um email institucional da UFLA |

---

## 5. Critérios de aceitação por funcionalidade

### Funcionalidade: Cadastro de usuário

* Deve permitir cadastro com nome, email e senha
* Email deve ser válido e no domínio @ufla.br
* Senha deve possuir mínimo de caracteres
* Não permitir cadastro com email já existente
* Sistema deve confirmar cadastro com sucesso

---

### Funcionalidade: Login

* Deve permitir login com email e senha
* Deve validar credenciais corretamente
* Deve impedir acesso com dados inválidos
* Deve redirecionar usuário autenticado

---

### Funcionalidade: Criar carona

* Deve permitir informar origem, destino, horário e vagas
* Todos os campos obrigatórios devem ser preenchidos
* Sistema deve salvar a carona corretamente
* Carona criada deve aparecer para outros usuários

---

### Funcionalidade: Buscar carona

* Deve permitir buscar por origem e destino
* Deve exibir lista de caronas disponíveis
* Deve indicar quando não houver resultados
* Deve permitir acessar detalhes da carona

---

### Funcionalidade: Solicitar carona

* Deve permitir solicitar vaga em uma carona
* Deve verificar disponibilidade de vagas
* Deve registrar a solicitação
* Deve impedir múltiplas solicitações duplicadas

---

### Funcionalidade: Cancelar/Excluir carona

* Deve permitir que o usuário cancele uma carona criada
* Deve permitir que o usuário cancele uma solicitação de carona
* Deve impedir que o usuário cancele caronas de outros usuários
* Sistema deve atualizar o status da carona após cancelamento
* Sistema deve refletir a alteração para outros usuários

---

### Funcionalidade: Visualizar detalhes da carona

* Deve exibir origem, destino, horário e vagas disponíveis
* Deve exibir informações do motorista
* Deve permitir acesso a partir da lista de caronas
* Informações devem estar atualizadas

---

### Funcionalidade: Gerenciar perfil

* Deve permitir visualizar dados do usuário
* Deve permitir editar informações pessoais
* Deve validar dados antes de salvar
* Alterações devem ser persistidas no sistema

---

## 6. Casos de uso ou cenários

---

### Caso de uso: Cadastro de usuário

**Atores:** Usuário
**Objetivo:** Permitir que um novo usuário se registre no sistema

**Fluxo principal:**

1. Usuário acessa a tela de cadastro
2. Preenche nome, email e senha
3. Sistema valida os dados
4. Sistema cria a conta
5. Usuário é redirecionado para login

**Fluxos alternativos:**

* Email já cadastrado → sistema exibe erro
* Dados inválidos → sistema solicita correção

---

### Caso de uso: Login de usuário

**Atores:** Usuário
**Objetivo:** Permitir acesso ao sistema

**Fluxo principal:**

1. Usuário acessa a tela de login
2. Informa email e senha
3. Sistema valida credenciais
4. Usuário acessa o sistema

**Fluxos alternativos:**

* Dados incorretos → sistema exibe erro
* Usuário não cadastrado → redireciona para cadastro

---

### Caso de uso: Criar carona

**Atores:** Usuário (motorista)
**Objetivo:** Permitir oferecer uma carona

**Fluxo principal:**

1. Usuário faz login
2. Acessa "Criar carona"
3. Informa origem, destino, horário e vagas
4. Sistema valida dados
5. Sistema registra a carona

**Fluxos alternativos:**

* Dados incompletos → erro
* Usuário não autenticado → redireciona para login

---

### Caso de uso: Buscar carona

**Atores:** Usuário (passageiro)
**Objetivo:** Encontrar caronas disponíveis

**Fluxo principal:**

1. Usuário acessa o sistema
2. Informa origem e destino
3. Sistema busca caronas disponíveis
4. Sistema exibe lista de resultados

**Fluxos alternativos:**

* Nenhuma carona encontrada → sistema informa
* Dados inválidos → erro

---

### Caso de uso: Solicitar carona

**Atores:** Usuário (passageiro)
**Objetivo:** Solicitar participação em uma carona

**Fluxo principal:**

1. Usuário visualiza uma carona
2. Clica em "Solicitar carona"
3. Sistema registra a solicitação
4. Motorista pode visualizar a solicitação

**Fluxos alternativos:**

* Sem vagas disponíveis → sistema bloqueia ação
* Usuário não logado → redireciona para login

---

### Caso de uso: Cancelar carona

**Atores:** Usuário
**Objetivo:** Permitir cancelar uma carona criada ou solicitada

**Fluxo principal:**

1. Usuário acessa suas caronas
2. Seleciona a carona
3. Clica em cancelar
4. Sistema remove ou atualiza o status da carona

**Fluxos alternativos:**

* Usuário tenta cancelar carona de outro → erro
* Carona já cancelada → sistema informa

---

### Caso de uso: Gerenciar perfil

**Atores:** Usuário
**Objetivo:** Atualizar dados pessoais

**Fluxo principal:**

1. Usuário acessa perfil
2. Edita informações
3. Salva alterações
4. Sistema atualiza dados

**Fluxos alternativos:**

* Dados inválidos → erro
* Falha no sistema → mensagem de erro

---


---

## 7. Rastreabilidade

| Problema                         | Backlog | Requisito | Teste |
| -------------------------------- | ------- | --------- | ----- |
| Dificuldade em encontrar caronas | PB01    | RF01      | CT01  |
| Falta de organização             | PB03    | RF03      | CT02  |
| Falta de segurança               | PB02    | RNF03     | CT03  |
