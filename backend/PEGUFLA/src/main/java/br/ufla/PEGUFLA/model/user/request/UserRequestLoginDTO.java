package br.ufla.PEGUFLA.model.user.request;

import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;

public record UserRequestLoginDTO(

        @NotNull(message = "email é um campo obrigatório")
        String login,

        @NotNull(message = "senha é um campo obrigatório")
        String password) {
}
