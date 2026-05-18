package br.ufla.PEGUFLA.model.mensagem.dto.request;

import jakarta.validation.constraints.NotNull;

//@formatter:off
public record MensagemRequestDTO(

        @NotNull(message = "O campo texto é obrigatório.")
        String texto
) {
}
