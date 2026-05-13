package br.ufla.PEGUFLA.model.veiculo.dto.request;

import jakarta.validation.constraints.NotNull;//@formatter:off
public record VeiculoRequestDTO(

        @NotNull(message = "O campo modelo é obrigatório.")
        String modelo,

        @NotNull(message = "O campo marca é obrigatório.")
        String marca,

        @NotNull(message = "O campo cor é obrigatório.")
        String cor,

        @NotNull(message = "O campo placa é obrigatório.")
        String placa
) {
}
