package br.ufla.PEGUFLA.model.mensagem.dto.response;

import br.ufla.PEGUFLA.model.user.response.UserResponseDTO;//@formatter:off
import java.time.LocalDateTime;
public record MensagemResponseDTO(
        Long id,
        String texto,
        LocalDateTime dataEnvio,
        UserResponseDTO remetente
) {
}
