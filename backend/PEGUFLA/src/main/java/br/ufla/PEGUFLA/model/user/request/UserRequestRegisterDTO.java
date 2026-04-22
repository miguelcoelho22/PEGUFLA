package br.ufla.PEGUFLA.model.user.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UserRequestRegisterDTO(
		@NotNull(message = "Email é um campo obrigatório")
		@Pattern(regexp = "^[\\w-\\.]+@ufla\\.br$", message = "O email deve obrigatoriamente pertencer ao domínio @ufla.br")
		String email,

		@NotNull(message = "senha é um campo obrigatório")
		String password,

		@NotNull(message = "Nome é um campo obrigatório")
		String name,

		@NotNull(message = "Sobrenome é um campo obrigatório")
		String lastName) {

}
