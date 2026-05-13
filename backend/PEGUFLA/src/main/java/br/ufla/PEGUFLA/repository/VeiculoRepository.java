package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findByUserId(Long userId);

    boolean existsByPlaca(@NotNull(message = "O campo placa é obrigatório.") String placa);

    Optional<Veiculo> findByIdAndUserId(Long id, Long userId);
}
