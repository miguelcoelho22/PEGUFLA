package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.mensagem.Mensagem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface CaronaRepository extends JpaRepository<Carona, Long> {

    @Modifying
    @Query("UPDATE carona c SET c.statusViagem = 'CONCLUIDA' WHERE c.horarioSaida < :agora AND c.statusViagem = 'CRIADA'")
    void atualizarCaronaExpiradas(@Param("agora") LocalDateTime agora);


    @Query("SELECT DISTINCT c FROM carona c LEFT JOIN c.reservaList r " +
            "WHERE c.statusViagem = 'CONCLUIDA' " +
            "AND (c.user.id = :userId OR (r.user.id = :userId AND r.statusReserva = 'CONFIRMADA')) " +
            "ORDER BY c.horarioSaida DESC")
    Page<Carona> findHistoricoByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END " +
            "FROM carona c " +
            "LEFT JOIN c.reservaList r " +
            "WHERE c.id = :caronaId " +
            "AND c.statusViagem NOT IN ('CANCELADA', 'CONCLUIDA') " +
            "AND (" +
            "    c.user.id = :usuarioId " +
            "    OR (r.user.id = :usuarioId AND r.statusReserva = 'APROVADA')" +
            ")")
    boolean isUsuarioAutorizadoEAtivo(@Param("caronaId") Long caronaId, @Param("usuarioId") Long usuarioId);

    @Query("SELECT DISTINCT m FROM mensagem m " +
            "JOIN m.carona c " +
            "LEFT JOIN c.reservaList r " +
            "WHERE c.id = :caronaId " +
            "AND c.statusViagem NOT IN ('CANCELADA', 'CONCLUIDA') " +
            "AND (" +
            "    c.user.id = :usuarioId " +
            "    OR (r.user.id = :usuarioId AND r.statusReserva = 'APROVADA')" +
            ") " +
            "AND m.id > :depoisDe " +
            "ORDER BY m.dataEnvio ASC")
    List<Mensagem> findNovasMensagensParaParticipante(@Param("caronaId") Long caronaId, @Param("usuarioId") Long usuarioId,@Param("depoisDe") Long depoisDe);

    Optional<Carona> findByIdAndStatusViagem(Long idCarona, StatusViagem statusViagem);
}
