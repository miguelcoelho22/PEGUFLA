package br.ufla.PEGUFLA.model.reserva.dto.response;

import br.ufla.PEGUFLA.model.carona.Carona;import br.ufla.PEGUFLA.model.carona.dto.response.CaronaResponseDTO;import br.ufla.PEGUFLA.model.reserva.Reserva;//@formatter:off
import br.ufla.PEGUFLA.model.user.User;import br.ufla.PEGUFLA.model.user.response.UserResponseDTO;import java.time.LocalDateTime;
public record ReservaResponseDTO(

        Long id,
        LocalDateTime dataHoraReserva,
        UserResponseDTO user,
        CaronaResponseDTO caronaId
) {
public ReservaResponseDTO(Reserva save) {
    this(save.getId(), save.getDataHoraReserva(), new UserResponseDTO(save.getUser()), new CaronaResponseDTO(save.getCarona()));
    }}
