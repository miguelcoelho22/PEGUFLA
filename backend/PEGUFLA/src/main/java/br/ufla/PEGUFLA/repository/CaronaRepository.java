package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.carona.Carona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaronaRepository extends JpaRepository<Carona, Long> {
}
