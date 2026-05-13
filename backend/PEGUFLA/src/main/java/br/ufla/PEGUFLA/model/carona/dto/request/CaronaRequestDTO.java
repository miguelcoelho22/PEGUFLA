package br.ufla.PEGUFLA.model.carona.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

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

    @NotNull(message = "veículo da carona é um campo obrigatório")
    Long veiculoId
) {
}
