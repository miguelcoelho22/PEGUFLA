package br.ufla.PEGUFLA.model.carona.dto.response;

import java.time.LocalDateTime;

import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.user.response.UserResponseDTO;
import br.ufla.PEGUFLA.model.veiculo.dto.response.VeiculoResponseDTO;
import jakarta.validation.constraints.NotNull;

@NotNull
public record CaronaResponseDTO(
		Long id,

		String origem,

		String destino,

		LocalDateTime horarioSaida,

		int vagasTotais,

		int vagasDisponiveis,

		StatusViagem statusViagem,

		UserResponseDTO user,

		VeiculoResponseDTO veiculo) {

	public CaronaResponseDTO(Carona carona){
		this(carona.getId(), carona.getOrigem(), carona.getDestino(), carona.getHorarioSaida(), carona.getVagasTotais(),
				carona.getVagasDisponiveis(), carona.getStatusViagem(), new UserResponseDTO(carona.getUser()),
				new VeiculoResponseDTO(carona.getVeiculo()));
	}
}
