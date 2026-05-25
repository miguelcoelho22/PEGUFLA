package br.ufla.PEGUFLA.model.user.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResetPasswordDTO {

    @NotNull(message = "o campo email  é obrigatório")
    private String email;

    @NotNull(message = "o campo nova senha é um campo obrigatório")
    private String newPassword;

    @NotNull(message = "o campo codigo de verificação é um campo obrigatório")
    private String verificationCode;
}
