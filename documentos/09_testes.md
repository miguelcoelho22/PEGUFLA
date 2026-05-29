
# 08. Testes

## 1. Estratégia de testes
A estratégia adota uma abordagem em duas camadas para garantir a integridade do backend. A primeira camada valida isoladamente as regras de negócio por meio de testes unitários na camada de serviço. A segunda camada assegura que a interface de comunicação do sistema (API REST) obedece aos contratos estabelecidos, validando os fluxos de requisição e resposta HTTP sem depender do estado do banco de dados em produção.

### Objetivos
- Garantir a corretude da lógica de domínio e regras de negócio isoladas.
- Validar o contrato de comunicação (JSON/HTTP) dos endpoints expostos.
- Prevenir regressões estruturais nas respostas da API durante evoluções do código.

---

## 2. Tipos de teste executados
| Tipo de teste | Objetivo | Evidência esperada |
|---|---|---|
| **Teste Unitário** | Validar regras de negócio e cálculos isolados nas classes de Service (`Authentication`, `Carona`, `Mensagem`, `Reserva`, `Veiculo`). | Relatório de execução de testes com status de sucesso. |
| **Teste de Contrato / API** | Validar a estrutura de entrada/saída de dados (DTOs) e códigos de status HTTP nos Controllers. | Registro de execução de requisições simuladas (ex: via `MockMvc`) contra os endpoints. |

---

## 3. Casos de teste

### 3.1. Testes Unitários (Camada de Serviço)
| ID | Requisito relacionado | Cenário | Entrada | Resultado esperado | Resultado obtido |
|---|---|---|---|---|---|
| CT01 | RF-Auth | Validação de credenciais na camada de serviço | DTO com e-mail e senha correspondentes ao mock do repositório | Retorno de token/sessão válida | Sucesso |
| CT02 | RF-Carona | Criação de carona com dados válidos | Objeto contendo origem, destino, horário e ID do veículo | Entidade salva retornada | Sucesso |
| CT03 | RF-Reserva | Tentativa de reserva em carona sem vagas | ID de usuário e ID de carona mockada com lotação máxima | Lançamento de exceção de regra de negócio | Sucesso |
| CT04 | RF-Veiculo | Cadastro de novo veículo associado a usuário | Dados de placa, modelo e ID do proprietário válido | Veículo registrado e persistido no mock | Sucesso |

### 3.2. Testes de Contrato / API (Camada Web)
| ID | Requisito relacionado | Cenário HTTP | Entrada Simulação HTTP | Resultado esperado (Contrato) | Resultado obtido |
|---|---|---|---|---|---|
| CT05 | RF-Auth | Requisição de login com payload inválido | `POST /api/auth/login` com JSON sem campo de senha | HTTP 400 Bad Request com corpo de erro padronizado | Sucesso |
| CT06 | RF-Carona | Requisição para listar caronas disponíveis | `GET /api/caronas?origem=X&destino=Y` | HTTP 200 OK e array JSON com chaves mapeadas no DTO | Sucesso |
| CT07 | RF-Reserva | Efetivação de reserva via endpoint | `POST /api/reservas` com DTO de reserva válido e Token JWT | HTTP 201 Created e Location Header preenchido | Sucesso |
| CT08 | RF-Mensagem | Envio de mensagem em chat inexistente | `POST /api/mensagens` para ID de carona inválida | HTTP 404 Not Found | Sucesso |

---

## 4. Critérios de aceitação dos testes
- **Isolamento Unitário:** Testes de serviço não devem acessar banco de dados, rede ou sistema de arquivos. Dependências devem ser totalmente mimetizadas.
- **Conformidade de Contrato:** Testes de API devem validar obrigatoriamente os códigos de status HTTP corretos (ex: 201 para criação, 400 para erro de cliente, 401 para não autorizado).
- **Cobertura Contratual:** As rotas principais devem ser testadas contra quebras estruturais no formato de saída.

---

## 5. Registro de defeitos
| ID | Defeito | Severidade | Status | Ação tomada |
|---|---|---|---|---|
| BUG01 | Endpoint de criação de veículo retornava 200 OK em vez de 201 Created. | Baixa | Corrigido | Ajustada a semântica da resposta no Controller de Veículos. |
| BUG02 | Falha de encapsulamento no DTO da carona, expondo dados internos indesejados na resposta da API. | Alta | Corrigido | Criação de DTO de saída estrito para o contrato de resposta. |

---

## 6. Evidências
Inserir:
- Logs de execução do build indicando sucesso na suíte de testes.
- Capturas de tela demonstrando a aprovação das classes de Service e dos testes de Controller Web.
- Exportação de coleções do Postman/Insomnia utilizadas para validação exploratória e secundária dos contratos em tempo de execução.

---

## 7. Exemplo resumido
> O contrato da API de Reservas foi validado pelo caso de teste **CT07**. Utilizando infraestrutura de testes de simulação Web, foi disparada uma requisição POST contendo o JSON com os dados da reserva. O teste assegura não apenas que o serviço backend processou a lógica, mas que a camada HTTP exposta respondeu estritamente com o status `201 Created` e que o payload JSON de retorno obedece ao contrato formatado e acordado com o front-end.
