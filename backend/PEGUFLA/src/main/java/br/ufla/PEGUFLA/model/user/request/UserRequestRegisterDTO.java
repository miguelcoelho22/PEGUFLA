package br.ufla.PEGUFLA.model.user.request;

import jakarta.validation.constraints.NotNull;

public record UserRequestRegisterDTO(
		@NotNull(message = "Email é um campo obrigatório")
		String email,

		@NotNull(message = "senha é um campo obrigatório")
		String password,

		@NotNull(message = "Nome é um campo obrigatório")
		String name,

		@NotNull(message = "Sobrenome é um campo obrigatório")
		String lastName) {

}
