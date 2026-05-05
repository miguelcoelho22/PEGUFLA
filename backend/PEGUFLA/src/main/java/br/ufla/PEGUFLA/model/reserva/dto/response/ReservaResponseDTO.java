package br.ufla.PEGUFLA.model.reserva.dto.response;

import br.ufla.PEGUFLA.model.carona.Carona;import br.ufla.PEGUFLA.model.reserva.Reserva;//@formatter:off
import br.ufla.PEGUFLA.model.user.User;import java.time.LocalDateTime;
public record ReservaResponseDTO(

        Long id,
        LocalDateTime dataHoraReserva,
        User user,
        Carona caronaId
) {
public ReservaResponseDTO(Reserva save) {
    this(save.getId(), save.getDataHoraReserva(), save.getUser(), save.getCarona());
    }}
