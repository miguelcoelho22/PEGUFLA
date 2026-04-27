package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.carona.StatusViagem;
import br.ufla.PEGUFLA.model.carona.dto.request.CaronaRequestDTO;
import br.ufla.PEGUFLA.model.carona.dto.response.CaronaResponseDTO;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.repository.UserRepository;
import br.ufla.PEGUFLA.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class CaronaService {

    private final CaronaRepository caronaRepository;
    private final UserRepository userRepository;
    private final VeiculoRepository veiculoRepository;

    public CaronaResponseDTO create(CaronaRequestDTO caronaRequestDTO) {

        User user = userRepository.findById(caronaRequestDTO.userId())
                .orElseThrow(() -> new RuntimeException("User não encontrado"));

        Veiculo veiculo = veiculoRepository.findByIdAndUserId(caronaRequestDTO.veiculoId(), caronaRequestDTO.userId())
                .orElseThrow(() -> new RuntimeException("Veiculo não encontrado para este usuário"));

        this.validarHorarioSaida(caronaRequestDTO);
        this.validarVagasDisponiveis(caronaRequestDTO);

        return new CaronaResponseDTO(new Carona(caronaRequestDTO.origem(), caronaRequestDTO.destino(), caronaRequestDTO.horarioSaida(),
                caronaRequestDTO.vagasTotais(), caronaRequestDTO.vagasDisponiveis(), StatusViagem.CRIADA,
                        user, veiculo));
    }

    public void validarHorarioSaida(CaronaRequestDTO caronaRequestDTO) {
        if (caronaRequestDTO.horarioSaida().isBefore(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")))) {
            throw new ModelException("O horário de saída deve ser no futuro");
        }
    }

    public void validarVagasDisponiveis(CaronaRequestDTO caronaRequestDTO) {
        if (caronaRequestDTO.vagasDisponiveis() > caronaRequestDTO.vagasTotais()) {
            throw new ModelException("O número de vagas disponíveis não pode ser maior que o número total de vagas");
        }
    }
}
