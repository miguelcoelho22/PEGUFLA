# 03. Product Backlog

## 1. Visão geral

O Product Backlog reúne as funcionalidades, necessidades e melhorias da solução proposta para o sistema PegUFLA.

O backlog é dinâmico e será atualizado ao longo do projeto, conforme evolução das sprints e refinamento das demandas identificadas.

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

## 3. Backlog do produto

| ID | Tipo | Item do backlog | Descrição | Prioridade | Critérios de aceitação | Estimativa | Sprint prevista |
|----|------|-------------------|----------|-----------|------------------------|-----------|--------|
| PB01 | História de usuário | Como estudante, quero me cadastrar para acessar o sistema | Cadastro de usuário | Alta | Email institucional válido da UFLA, senha mínima, cadastro salvo | 3 pts | 2 |
| PB02 | História de usuário | Como usuário, quero fazer login para acessar minha conta | Autenticação | Alta | Validação de credenciais, acesso permitido | 3 pts | 2 |
| PB03 | História de usuário | Como motorista, quero criar uma carona para oferecer vagas | Criação de carona | Alta | Definir origem, destino, vagas e horário | 5 pts | 3 |
| PB04 | História de usuário | Como usuário, quero buscar caronas para encontrar opções disponíveis | Busca de carona | Alta | Filtrar por origem/destino, listar resultados | 5 pts | 3 |
| PB05 | História de usuário | Como usuário, quero visualizar detalhes da carona | Visualização | Alta | Exibir motorista, horário, vagas | 2 pts | 3 |
| PB06 | História de usuário | Como passageiro, quero solicitar vaga em uma carona | Solicitação | Alta | Solicitação enviada ao motorista | 3 pts | 4 |
| PB07 | História de usuário | Como motorista, quero aprovar ou rejeitar solicitações | Gerenciamento | Alta | Alterar status da solicitação | 3 pts | 4 |
| PB08 | História de usuário | Como usuário, quero cancelar minha participação | Cancelamento | Média | Remover usuário da carona | 2 pts | 4 |
| PB09 | História de usuário | Como motorista, quero excluir uma carona criada | Exclusão | Média | Carona removida do sistema | 2 pts | 5 |
| PB10 | História de usuário | Como usuário, quero visualizar histórico de caronas | Histórico | Média | Listar caronas criadas/participadas | 3 pts | 5 |
| PB11 | História de usuário | Como motorista e passageiro, quero trocar mensagens após aprovação da carona | Sistema de mensagens internas assíncronas | Baixa | Envio e leitura de mensagens entre usuários vinculados à carona | 5 pts | 6 |

---

## 4. Histórias de usuário

### US01 – Cadastro de usuário
Como estudante da UFLA, quero me cadastrar no sistema, para acessar a plataforma PegUFLA.

**Critérios de aceitação:**
- nome deve ser obrigatório  
- sobrenome deve ser obrigatório  
- e-mail deve ser institucional da UFLA  
- senha deve atender ao tamanho mínimo definido  
- sistema deve impedir e-mail já cadastrado  
- cadastro deve ser concluído com sucesso  

---

### US02 – Login
Como usuário cadastrado, quero realizar login no sistema, para acessar minha conta.

**Critérios de aceitação:**
- e-mail e senha devem ser obrigatórios  
- sistema deve validar credenciais  
- acesso deve ser permitido com dados válidos  
- sistema deve exibir erro para dados inválidos  

---

### US03 – Criar carona
Como usuário autenticado, quero criar uma carona, para oferecer vagas a outros estudantes quando eu tiver disponibilidade de veículo.

**Critérios de aceitação:**
- informar origem e destino  
- informar data e horário  
- definir número de vagas disponíveis  
- sistema deve validar campos obrigatórios  
- carona deve ser registrada com sucesso  

---

### US04 – Buscar carona
Como usuário autenticado, quero buscar caronas disponíveis, para encontrar opções compatíveis com meu trajeto e horário.

**Critérios de aceitação:**
- permitir informar filtros de busca  
- listar caronas compatíveis com os filtros  
- exibir informações resumidas de cada carona  
- informar quando não houver resultados  

---

### US05 – Solicitar vaga
Como usuário autenticado, quero solicitar vaga em uma carona disponível, para participar do trajeto oferecido.

**Critérios de aceitação:**
- usuário deve conseguir enviar solicitação  
- status inicial deve ser pendente  
- sistema deve impedir solicitação duplicada  
- responsável pela carona deve visualizar a solicitação  

---

### US06 – Aprovar/Rejeitar solicitação
Como usuário responsável por uma carona criada, quero aprovar ou rejeitar solicitações recebidas, para gerenciar os participantes.

**Critérios de aceitação:**
- visualizar solicitações recebidas  
- aprovar ou rejeitar solicitações  
- sistema deve atualizar status corretamente  
- sistema deve respeitar limite de vagas disponíveis  

---

### US07 – Visualizar detalhes da carona
Como usuário autenticado, quero visualizar os detalhes de uma carona selecionada, para analisar as informações antes de solicitar participação.

**Critérios de aceitação:**
- exibir origem e destino  
- exibir data e horário  
- exibir vagas disponíveis  
- identificar usuário responsável pela carona  
- sistema deve informar erro se a carona não existir  

---

### US08 – Cancelar participação
Como usuário autenticado, quero cancelar minha participação em uma carona, para desistir do trajeto quando necessário.

**Critérios de aceitação:**
- usuário deve conseguir cancelar participação própria  
- sistema deve atualizar status da participação  
- vaga deve ser liberada após cancelamento  

---

### US09 – Excluir carona
Como usuário responsável por uma carona criada, quero excluir a carona, para removê-la do sistema quando não puder mais realizá-la.

**Critérios de aceitação:**
- apenas responsável pela carona pode excluir  
- carona deve ser removida definitivamente  
- sistema deve informar erro se a carona não existir  

---

### US10 – Histórico de caronas
Como usuário autenticado, quero visualizar meu histórico de caronas criadas e participadas, para acompanhar minhas utilizações anteriores no sistema.

**Critérios de aceitação:**
- exibir caronas criadas pelo usuário  
- exibir caronas participadas pelo usuário  
- mostrar informações básicas relevantes  
- informar quando não houver histórico disponível  

---

### US11 – Mensagens internas
Como usuário autenticado participante de uma carona aprovada, quero trocar mensagens com os demais envolvidos, para facilitar a comunicação sobre o trajeto.

**Critérios de aceitação:**
- permitir envio de mensagens entre participantes autorizados  
- registrar mensagens corretamente  
- permitir consulta ao histórico da conversa  
- impedir acesso de usuários não vinculados à carona  
---

## 5. Observações

- O backlog será atualizado continuamente ao longo das sprints  
- Itens podem ser refinados, divididos ou priorizados novamente  
- Novas histórias podem ser adicionadas conforme evolução do projeto  
- As estimativas podem ser ajustadas conforme aprendizado da equipe
- Itens de baixa prioridade poderão ser implementados apenas após conclusão das funcionalidades essenciais.
