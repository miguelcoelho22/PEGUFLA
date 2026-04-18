# 04. Requisitos

## 1. Levantamento de requisitos

Os requisitos foram identificados por meio de:

- análise do problema enfrentado por estudantes da UFLA;
- discussão em grupo com base na vivência acadêmica;
- observação de soluções informais (ex: grupos de WhatsApp);
- definição das principais necessidades dos usuários (motoristas e passageiros).

---

## 2. Requisitos funcionais

| ID | Requisito funcional | Descrição | Prioridade |
|----|-------------------|----------|-----------|
| RF01 | Cadastro de usuário | Permitir que usuários criem uma conta | Alta |
| RF02 | Login | Permitir autenticação no sistema | Alta |
| RF03 | Criar carona | Permitir que usuários ofereçam caronas | Alta |
| RF04 | Buscar carona | Permitir que usuários encontrem caronas | Alta |
| RF05 | Solicitar vaga | Permitir solicitar participação em carona | Alta |
| RF06 | Aprovar/rejeitar solicitação | Motorista gerencia solicitações | Alta |
| RF07 | Visualizar caronas | Listar caronas disponíveis | Alta |
| RF08 | Cancelar participação | Usuário pode sair da carona | Média |
| RF09 | Excluir carona | Motorista pode excluir carona criada | Média |
| RF10 | Mensagens internas | Permitir comunicação entre motorista e passageiro aprovado | Baixa |

---

## 3. Requisitos não funcionais

| ID | Requisito não funcional | Descrição | Categoria |
|----|------------------------|----------|----------|
| RNF01 | Acesso via navegador | Sistema deve ser web | Usabilidade |
| RNF02 | Autenticação obrigatória | Ações protegidas exigem login | Segurança |
| RNF03 | Persistência de dados | Dados devem ser armazenados | Confiabilidade |
| RNF04 | Interface responsiva | Funcionar em celular e desktop | Usabilidade |
| RNF05 | Tempo de resposta | Sistema deve responder rapidamente | Desempenho |

---

## 4. Regras de negócio

| ID | Regra | Descrição |
|----|------|----------|
| RN01 | Email institucional obrigatório | O email cadastrado deve ser obrigatoriamente da UFLA |
| RN02 | Apenas motoristas criam caronas | Apenas usuários com veículo podem oferecer caronas |
| RN03 | Aprovação obrigatória | Passageiros só entram com aprovação do motorista |
| RN04 | Vagas limitadas | Número de passageiros não pode exceder o limite |
| RN05 | Chat restrito | Chat só é liberado após aprovação na carona |

---

## 5. Critérios de aceitação por funcionalidade

### Cadastro de usuário
- Deve permitir inserir nome, email e senha  
- Email deve ser válido e da UFLA  
- Senha deve ter tamanho mínimo  
- Sistema deve confirmar cadastro com sucesso  

### Login
- Usuário deve informar email e senha  
- Sistema deve validar credenciais  
- Deve permitir acesso ao sistema  

### Criar carona
- Deve permitir definir origem e destino  
- Deve permitir definir número de vagas  
- Deve registrar data e horário  
- Carona deve ser exibida no sistema  

### Buscar carona
- Deve permitir filtrar por origem e destino  
- Deve listar caronas disponíveis  
- Deve exibir informações da carona  

### Solicitar vaga
- Usuário deve conseguir solicitar vaga  
- Solicitação deve ser enviada ao motorista  
- Status deve ficar como pendente  

### Aprovar/rejeitar solicitação
- Motorista deve visualizar solicitações  
- Deve poder aprovar ou rejeitar  
- Sistema deve atualizar status  

### Cancelar participação
- Usuário deve cancelar participação  
- Sistema deve atualizar vagas disponíveis  

### Excluir carona
- Motorista deve excluir carona criada  
- Sistema deve remover carona da lista  

### Mensagens internas
- Disponível apenas após aprovação
- Permitir envio e leitura de mensagens
- Histórico mantido
- Atualização periódica das mensagens

---

## 6. Casos de uso

### Caso de uso: Cadastro de usuário
**Atores:** Usuário  
**Objetivo:** Criar conta no sistema  

**Fluxo principal:**
1. Usuário acessa cadastro  
2. Preenche dados  
3. Sistema valida  
4. Conta é criada  

**Fluxo alternativo:**
- Email inválido → sistema exibe erro  

---

### Caso de uso: Login
**Atores:** Usuário  
**Objetivo:** Acessar sistema  

**Fluxo principal:**
1. Usuário insere credenciais  
2. Sistema valida  
3. Acesso concedido  

**Fluxo alternativo:**
- Credenciais inválidas → erro  

---

### Caso de uso: Criar carona
**Atores:** Motorista  
**Objetivo:** Oferecer carona  

**Fluxo principal:**
1. Motorista preenche dados  
2. Sistema registra carona  
3. Carona fica disponível  

---

### Caso de uso: Buscar carona
**Atores:** Usuário  
**Objetivo:** Encontrar carona  

**Fluxo principal:**
1. Usuário informa filtros  
2. Sistema retorna resultados  

---

### Caso de uso: Solicitar vaga
**Atores:** Passageiro  
**Objetivo:** Solicitar participação  

**Fluxo principal:**
1. Usuário solicita vaga  
2. Sistema registra solicitação  

---

### Caso de uso: Aprovar solicitação
**Atores:** Motorista  
**Objetivo:** Gerenciar solicitações  

**Fluxo principal:**
1. Motorista visualiza pedidos  
2. Aprova ou rejeita  
3. Sistema atualiza status  

---

### Caso de uso: Excluir carona
**Atores:** Motorista  
**Objetivo:** Remover carona  

**Fluxo principal:**
1. Motorista seleciona carona  
2. Sistema remove carona  

---

### Caso de uso: Chat
**Atores:** Motorista e Passageiro  
**Objetivo:** Comunicação  

**Fluxo principal:**
1. Chat é liberado após aprovação  
2. Usuários trocam mensagens  
3. Sistema registra histórico  

---

## 7. Rastreabilidade

| Problema identificado | Item do Backlog | Requisito | Teste relacionado |
|----------------------|---------------|----------|-------------------|
| Falta de identificação dos usuários | PB01 - Cadastro | RF01 | CT01 - Teste de cadastro válido |
| Dificuldade de acesso ao sistema | PB02 - Login | RF02 | CT02 - Teste de autenticação |
| Falta de oferta organizada de caronas | PB03 - Criar carona | RF03 | CT03 - Teste de criação de carona |
| Dificuldade de encontrar caronas | PB04 - Buscar carona | RF04 | CT04 - Teste de busca com filtros |
| Falta de controle sobre participação | PB05 - Solicitar vaga | RF05 | CT05 - Teste de solicitação de vaga |
| Falta de controle do motorista | PB06 - Aprovação | RF06 | CT06 - Teste de aprovação/rejeição |
| Falta de visualização das opções | PB07 - Listagem | RF07 | CT07 - Teste de exibição de caronas |
| Falta de flexibilidade para usuários | PB08 - Cancelamento | RF08 | CT08 - Teste de cancelamento |
| Falta de controle sobre caronas criadas | PB09 - Excluir carona | RF09 | CT09 - Teste de exclusão de carona |
| Falta de comunicação entre usuários | PB10 - Chat | RF10 | CT10 - Teste de envio de mensagens |
