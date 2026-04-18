# 03. Product Backlog

## 1. Visão geral

O Product Backlog reúne funcionalidades, melhorias, requisitos e necessidades identificadas para o desenvolvimento do sistema PegUFLA.

O backlog é dinâmico e será constantemente atualizado ao longo do projeto, conforme evolução das sprints e melhor entendimento do problema.

---

## 2. Estratégia de priorização

Os itens foram priorizados com base em:

- valor para o usuário;
- impacto no problema principal;
- dependência entre funcionalidades;
- viabilidade técnica;
- risco de implementação.

Itens essenciais para funcionamento básico do sistema foram priorizados nas primeiras sprints.

---

## 3. Product Backlog detalhado

| ID | Tipo | História de usuário | Descrição | Prioridade | Critérios de aceitação | Estimativa | Sprint |
|----|------|-------------------|----------|-----------|------------------------|-----------|--------|
| PB01 | História | Como estudante, quero me cadastrar para acessar o sistema | Cadastro de usuário | Alta | Email institucional válido da UFLA, senha mínima, cadastro salvo | 3 pts | 2 |
| PB02 | História | Como usuário, quero fazer login para acessar minha conta | Autenticação | Alta | Validação de credenciais, acesso permitido | 3 pts | 2 |
| PB03 | História | Como motorista, quero criar uma carona para oferecer vagas | Criação de carona | Alta | Definir origem, destino, vagas e horário | 5 pts | 3 |
| PB04 | História | Como usuário, quero buscar caronas para encontrar opções disponíveis | Busca de carona | Alta | Filtrar por origem/destino, listar resultados | 5 pts | 3 |
| PB05 | História | Como usuário, quero visualizar detalhes da carona | Visualização | Alta | Exibir motorista, horário, vagas | 2 pts | 3 |
| PB06 | História | Como passageiro, quero solicitar vaga em uma carona | Solicitação | Alta | Solicitação enviada ao motorista | 3 pts | 4 |
| PB07 | História | Como motorista, quero aprovar ou rejeitar solicitações | Gerenciamento | Alta | Alterar status da solicitação | 3 pts | 4 |
| PB08 | História | Como usuário, quero cancelar minha participação | Cancelamento | Média | Remover usuário da carona | 2 pts | 4 |
| PB09 | História | Como motorista, quero excluir uma carona criada | Exclusão | Média | Carona removida do sistema | 2 pts | 5 |
| PB10 | História | Como usuário, quero visualizar minhas caronas | Histórico | Média | Listar caronas criadas/participadas | 3 pts | 5 |
| PB11 | História | Como motorista e passageiro, quero trocar mensagens após aprovação da carona | Sistema de mensagens internas assíncronas | Baixa | Envio e leitura de mensagens entre usuários vinculados à carona | 5 pts | 6 |

---

## 4. Histórias detalhadas (principais)

### US01 – Cadastro de usuário
Como estudante, quero me cadastrar para acessar o sistema.

**Critérios de aceitação:**
- nome deve ser obrigatório  
- email deve ser válido e da UFLA  
- senha deve ter tamanho mínimo  
- sistema deve confirmar cadastro  

---

### US02 – Login
Como usuário, quero fazer login para acessar minha conta.

**Critérios de aceitação:**
- email e senha obrigatórios  
- validação de credenciais  
- acesso ao sistema após login  

---

### US03 – Criar carona
Como motorista, quero criar uma carona para oferecer vagas.

**Critérios de aceitação:**
- informar origem e destino  
- definir número de vagas  
- definir horário  
- carona deve aparecer na lista  

---

### US04 – Buscar carona
Como usuário, quero buscar caronas disponíveis.

**Critérios de aceitação:**
- filtrar por origem/destino  
- listar caronas disponíveis  
- exibir informações básicas  

---

### US05 – Solicitar vaga
Como passageiro, quero solicitar vaga em uma carona.

**Critérios de aceitação:**
- envio da solicitação  
- status pendente  
- visível ao motorista  

---

### US06 – Aprovar/Rejeitar
Como motorista, quero gerenciar solicitações.

**Critérios de aceitação:**
- visualizar solicitações  
- aprovar ou rejeitar  
- atualizar status  

---

### US07 – Excluir carona
Como motorista, quero excluir uma carona.

**Critérios de aceitação:**
- selecionar carona  
- remover do sistema  

---

### US08 – Mensagens internas
Como motorista e passageiro, quero trocar mensagens após a aprovação da carona.

**Critérios de aceitação:**
- mensagens disponíveis apenas após aprovação;
- permitir envio e leitura de mensagens;
- histórico vinculado à carona;
- funcionalidade implementada apenas se concluídas as prioridades superiores.

---

## 5. Observações

- O backlog será atualizado continuamente ao longo das sprints  
- Itens podem ser refinados, divididos ou priorizados novamente  
- Novas histórias podem ser adicionadas conforme evolução do projeto  
- As estimativas podem ser ajustadas conforme aprendizado da equipe
- Itens de baixa prioridade poderão ser implementados apenas após conclusão das funcionalidades essenciais.
