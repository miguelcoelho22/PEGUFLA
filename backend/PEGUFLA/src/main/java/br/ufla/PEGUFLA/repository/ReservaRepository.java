package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.StatusReserva;
import br.ufla.PEGUFLA.model.reserva.Reserva;
import br.ufla.PEGUFLA.model.reserva.dto.response.ReservaResponseDTO;
import br.ufla.PEGUFLA.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByCaronaIdAndStatusReserva(Long id, StatusReserva statusReserva);

    List<Reserva> findAllByCaronaIdAndStatusReserva(Long idCarona, StatusReserva statusReserva);

    boolean existsByUserAndCarona(User user, Carona carona);

    List<Reserva> findByCaronaId(Long caronaId);

    List<Reserva> findByUserId(Long userId);
}
