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
| RF04 | Buscar carona | Permitir ao usuário pesquisar caronas disponíveis e visualizar os resultados encontrados | Alta |
| RF05 | Solicitar vaga | Permitir solicitar participação em carona | Alta |
| RF06 | Aprovar/rejeitar solicitação | Motorista gerencia solicitações | Alta |
| RF07 | Visualizar detalhes da carona | Permitir ao usuário consultar informações detalhadas de uma carona selecionada | Alta |
| RF08 | Cancelar participação | Usuário pode sair da carona | Média |
| RF09 | Excluir carona | Motorista pode excluir carona criada | Média |
| RF10 | Histórico de caronas | Permitir ao usuário visualizar caronas criadas e participadas | Média
| RF11 | Mensagens internas | Permitir comunicação entre motorista e passageiro aprovado | Baixa |
| RF12 | Recuperar senha | Permitir ao usuário redefinir sua senha de acesso por meio do e-mail institucional cadastrado | Média |

---

## 3. Requisitos não funcionais

| ID | Requisito não funcional | Descrição | Categoria |
|----|------------------------|----------|----------|
| RNF01 | Acesso via navegador | Sistema deve ser web | Usabilidade |
| RNF02 | Autenticação obrigatória | Ações protegidas exigem login | Segurança |
| RNF03 | Persistência de dados | Dados devem ser armazenados | Confiabilidade |
| RNF04 | Interface responsiva | Funcionar em celular e desktop | Usabilidade |
| RNF05 | Tempo de resposta | Principais operações devem responder em até 3 segundos em condições normais | Desempenho |

---

## 4. Regras de negócio

| ID | Regra | Descrição |
|----|------|----------|
| RN01 | Email institucional obrigatório | O email cadastrado deve ser obrigatoriamente da UFLA |
| RN02 | Usuários autenticados podem criar caronas | Qualquer usuário cadastrado e autenticado no sistema poderá oferecer caronas e também solicitar participação em caronas disponíveis |
| RN03 | Aprovação obrigatória | Passageiros só entram com aprovação do motorista |
| RN04 | Vagas limitadas | Número de passageiros não pode exceder o limite |
| RN05 | Chat restrito | Chat só é liberado após aprovação na carona |

---

## 5. Critérios de aceitação por funcionalidade

### Cadastro de usuário
- Deve permitir inserir nome, sobrenome, email e senha  
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

### Histórico de caronas
- Exibir caronas criadas pelo usuário
- Exibir caronas participadas
- Mostrar origem, destino, data e status

### Mensagens internas
- Disponível apenas após aprovação
- Permitir envio e leitura de mensagens
- Histórico mantido
- Atualização periódica das mensagens

### Recuperar senha
- Usuário deve informar e-mail cadastrado  
- Sistema deve validar se o e-mail existe  
- Sistema deve enviar código de verificação para o e-mail informado  
- Usuário deve informar código recebido  
- Sistema deve validar código informado  
- Sistema deve permitir redefinição de senha após validação  
- Nova senha deve atender ao tamanho mínimo definido  
- Usuário deve conseguir acessar o sistema com a nova senha  
- Sistema deve informar erro para e-mail inexistente ou código inválido  

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
- Email já cadastrado → sistema informa duplicidade  
- Senha fora do padrão → sistema solicita correção  

---

### Caso de uso: Login
**Atores:** Usuário  
**Objetivo:** Acessar sistema  

**Fluxo principal:**
1. Usuário insere credenciais  
2. Sistema valida  
3. Acesso concedido  

**Fluxo alternativo:**
- Credenciais inválidas → sistema exibe erro  
- Conta não cadastrada → sistema informa necessidade de cadastro  

---

### Caso de uso: Criar carona
**Atores:** Motorista  
**Objetivo:** Oferecer carona  

**Fluxo principal:**
1. Motorista preenche dados  
2. Sistema registra carona  
3. Carona fica disponível  

**Fluxo alternativo:**
- Dados incompletos → sistema solicita correção  
- Quantidade de vagas inválida → sistema exibe erro  

---

### Caso de uso: Buscar carona
**Atores:** Usuário  
**Objetivo:** Encontrar carona  

**Fluxo principal:**
1. Usuário informa filtros  
2. Sistema retorna resultados  

**Fluxo alternativo:**
- Nenhuma carona encontrada → sistema informa ausência de resultados  
- Filtros inválidos → sistema solicita nova busca  

---

### Caso de uso: Solicitar vaga
**Atores:** Passageiro  
**Objetivo:** Solicitar participação  

**Fluxo principal:**
1. Usuário solicita vaga  
2. Sistema registra solicitação  

**Fluxo alternativo:**
- Carona sem vagas disponíveis → sistema bloqueia solicitação  
- Usuário já solicitou participação → sistema informa solicitação existente  

---

### Caso de uso: Aprovar solicitação
**Atores:** Motorista  
**Objetivo:** Gerenciar solicitações  

**Fluxo principal:**
1. Motorista visualiza pedidos  
2. Aprova ou rejeita  
3. Sistema atualiza status  

**Fluxo alternativo:**
- Vagas esgotadas → sistema impede nova aprovação  
- Solicitação já respondida → sistema informa status atual  

---

### Caso de uso: Excluir carona
**Atores:** Motorista  
**Objetivo:** Remover carona  

**Fluxo principal:**
1. Motorista seleciona carona  
2. Sistema remove carona  

**Fluxo alternativo:**
- Carona não encontrada → sistema informa erro  
- Usuário sem permissão → sistema bloqueia exclusão  

---

### Caso de uso: Visualizar histórico de caronas

**Atores:** Usuário  

**Objetivo:** Consultar caronas criadas e participadas anteriormente.

**Fluxo principal:**
1. Usuário acessa área de histórico  
2. Sistema recupera registros vinculados ao usuário  
3. Sistema exibe lista de caronas anteriores  

**Fluxo alternativo:**
- Nenhum registro encontrado → sistema informa ausência de histórico  
- Usuário não autenticado → sistema solicita login

---

### Caso de uso: Chat
**Atores:** Motorista e Passageiro  
**Objetivo:** Comunicação  

**Fluxo principal:**
1. Chat é liberado após aprovação  
2. Usuários trocam mensagens  
3. Sistema registra histórico  

**Fluxo alternativo:**
- Usuário não aprovado na carona → chat indisponível  
- Falha no envio da mensagem → sistema solicita nova tentativa

---

### Caso de uso: Recuperar senha
**Atores:** Usuário  
**Objetivo:** Redefinir a senha de acesso ao sistema por meio de verificação no e-mail cadastrado.

**Fluxo principal:**
1. Usuário acessa a opção "Esqueci minha senha"
2. Informa o e-mail institucional cadastrado
3. Sistema valida se o e-mail existe
4. Sistema envia código de verificação para o e-mail informado
5. Usuário informa o código recebido
6. Sistema valida o código informado
7. Sistema libera a redefinição de senha
8. Usuário informa a nova senha
9. Sistema salva a nova senha
10. Usuário pode realizar login com a nova senha

**Fluxo alternativo:**
- E-mail não cadastrado → sistema exibe erro  
- Código inválido ou expirado → sistema exibe erro e solicita novo código  
- Nova senha inválida → sistema solicita correção  

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
| Falta de acompanhamento das caronas anteriores | PB10 - Histórico | RF10 | CT10 - Teste de visualização do histórico |
| Falta de comunicação entre usuários | PB11 - Chat | RF11 | CT11 - Teste de envio de mensagens |
