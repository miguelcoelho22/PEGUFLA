package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.reserva.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}
