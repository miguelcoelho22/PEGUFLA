package br.ufla.PEGUFLA.model.reserva.dto.request;

import jakarta.validation.Valid;import jakarta.validation.constraints.NotNull;

//@formatter:off
public record ReservaRequestDTO(

        @NotNull(message = "O campo caronaId é obrigatório.")
        @Valid Long caronaId
) {
}
