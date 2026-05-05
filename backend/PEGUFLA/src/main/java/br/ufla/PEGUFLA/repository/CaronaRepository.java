package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.carona.Carona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface CaronaRepository extends JpaRepository<Carona, Long> {

    @Modifying
    @Query("UPDATE carona c SET c.statusViagem = 'CONCLUIDA' WHERE c.horarioSaida < :agora AND c.statusViagem = 'CRIADA'")
    void atualizarCaronaExpiradas(@Param("agora") LocalDateTime agora);
}
