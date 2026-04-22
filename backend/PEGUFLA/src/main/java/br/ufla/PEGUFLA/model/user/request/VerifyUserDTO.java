package br.ufla.PEGUFLA.model.user.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyUserDTO {

	@NotNull(message = "Email é um campo obrigatório")
	@Pattern(regexp = "^[\\w-\\.]+@ufla\\.br$", message = "O email deve obrigatoriamente pertencer ao domínio @ufla.br")
	private String email;

	@NotNull(message = "Código de verificação é um campo obrigatório")
	private String verificationCode;
}
