package br.ufla.PEGUFLA.model.carona.dto.request;

import br.ufla.PEGUFLA.model.carona.StatusViagem;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.model.veiculo.dto.request.VeiculoRequestDTO;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

//@formatter:off
public record CaronaRequestDTO(

    @NotNull(message = "origem da carona é um campo obrigatório")
    String origem,

    @NotNull(message = "destino da carona é um campo obrigatório")
    String destino,

    @NotNull(message = "horário de saída da carona é um campo obrigatório")
    LocalDateTime horarioSaida,

    @NotNull(message = "vagas totais da carona é um campo obrigatório")
    int vagasTotais,

    @NotNull(message = "usuário que criou a  carona é um campo obrigatório")
    String userId,

    @NotNull(message = "veículo da carona é um campo obrigatório")
    Long veiculoId
) {
}
