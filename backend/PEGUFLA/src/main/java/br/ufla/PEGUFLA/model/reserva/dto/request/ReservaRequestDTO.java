package br.ufla.PEGUFLA.model.reserva.dto.request;

import jakarta.validation.Valid;import jakarta.validation.constraints.NotNull;//@formatter:off
import org.springframework.beans.factory.annotation.Value;
public record ReservaRequestDTO(

        @NotNull(message = "O campo userId é obrigatório.")
        @Valid Long userId,

        @NotNull(message = "O campo caronaId é obrigatório.")
        @Valid Long caronaId
) {
}
