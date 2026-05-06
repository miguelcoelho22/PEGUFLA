package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.enums.StatusReserva;
import br.ufla.PEGUFLA.model.reserva.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByCaronaIdAndStatusReserva(Long id, StatusReserva statusReserva);

}
