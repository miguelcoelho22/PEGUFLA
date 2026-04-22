package br.ufla.PEGUFLA.model.user.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Value;

public record UserRequestLoginDTO(

        @NotNull(message = "email é um campo obrigatório")
        @Pattern(regexp = "^[\\w-\\.]+@ufla\\.br$", message = "O email deve obrigatoriamente pertencer ao domínio @ufla.br")
        String email,

        @NotNull(message = "senha é um campo obrigatório")
        String password) {
}
