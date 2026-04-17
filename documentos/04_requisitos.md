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

---

## 5. Critérios de acessibilidade por funcionalidade

**Funcionalidade: Cadastro de usuário**

* Campos obrigatórios claramente identificados
* Mensagens de erro compreensíveis
* Interface responsiva

**Funcionalidade: Buscar carona**

* Filtros simples (origem/destino)
* Lista clara de resultados
* Navegação intuitiva

---

## 6. Casos de uso ou cenários

### Caso de uso: Criar carona

**Atores:** Usuário (motorista)
**Objetivo:** Permitir oferecer uma carona

**Fluxo principal:**

1. Usuário faz login
2. Acessa opção "Criar carona"
3. Informa origem, destino, horário e vagas
4. Sistema salva a carona

**Fluxos alternativos:**

* Dados inválidos → sistema exibe erro
* Usuário não logado → redirecionamento para login

---

## 7. Rastreabilidade

| Problema                         | Backlog | Requisito | Teste |
| -------------------------------- | ------- | --------- | ----- |
| Dificuldade em encontrar caronas | PB01    | RF01      | CT01  |
| Falta de organização             | PB03    | RF03      | CT02  |
| Falta de segurança               | PB02    | RNF03     | CT03  |
