# 09. Testes

## 1. Estratégia de testes
A estratégia de validação do backend do PegUFLA baseia-se em três pilares: testes unitários para a lógica de negócio (Service Layer), testes de API REST para validar a interface da API (Controller Layer) e testes de integração para fluxos externos (Mensageria/E-mail). O objetivo é garantir que cada unidade de código seja robusta, que os contratos HTTP sejam respeitados e que a comunicação com o mundo externo funcione como esperado.

### Objetivos
- Garantir a corretude da lógica de domínio através de isolamento.
- Validar a conformidade das respostas da API (status code e estrutura JSON).
- Confirmar a integridade da entrega de notificações ao usuário final.

---

## 2. Tipos de teste previstos
| Tipo de teste | Objetivo | Evidência esperada |
|---|---|---|
| Teste unitário | Validar regras de negócio e cálculos isolados | Relatório de execução da suíte de testes (Green build) |
| Teste de contrato/API | Validar a estrutura de dados e status HTTP | Logs de requisição e resposta (Status/Body) |
| Teste de integração | Validar comunicação com serviços externos | Logs de envio e confirmação de recebimento (E-mail/Serviços) |

---

## 3. Casos de teste
| ID | Requisito relacionado | Cenário | Entrada | Resultado esperado | Resultado obtido |
|---|---|---|---|---|---|
| CT01 | RF-Auth | Cadastro com e-mail único | DTO de registro válido | Usuário criado, e-mail enviado | Sucesso |
| CT02 | RF-Carona | Criação de carona válida | DTO de carona completo | Status 201 Created | Sucesso |
| CT03 | RF-Reserva | Reserva em carona disponível | ID usuário e carona | Vaga decrementada | Sucesso |
| CT04 | RF-Veiculo | Atualização de modelo | Dados de veículo | Veículo atualizado | Sucesso |
| CT05 | RF-Mensagem | Envio de chat | Texto e IDs válidos | Mensagem persistida | Sucesso |

---

## 4. Critérios de aceitação dos testes
- Cobertura mínima da lógica de negócio através de testes unitários (Service).
- Sucesso nos códigos de status HTTP para operações de CRUD (200, 201, 204).
- Respeito à estrutura do DTO definida no contrato da API.
- Registro de logs para toda falha de integração identificada.

---

## 5. Registro de defeitos
| ID | Defeito | Severidade | Status | Ação tomada |
|---|---|---|---|---|
| BUG01 | Endpoint de criação de veículo retornava 200 OK em vez de 201 Created. | Baixa | Corrigido | Ajustada a semântica da resposta no Controller de Veículos. |
| BUG02 |  	Falha de encapsulamento no DTO da carona, expondo dados internos indesejados na resposta da API. | Alta | Corrigido | Criação de DTO de saída estrito para o contrato de resposta. |

---

## 6. Evidências



---

## 7. Exemplo resumido
> O contrato da API de Caronas (RF-Carona) será validado através do caso de teste CT02, onde uma requisição POST é enviada ao endpoint com os dados obrigatórios. Espera-se o retorno 201 Created com o DTO completo, incluindo dados do usuário e veículo, validando a integridade da comunicação e das regras de negócio associadas.
