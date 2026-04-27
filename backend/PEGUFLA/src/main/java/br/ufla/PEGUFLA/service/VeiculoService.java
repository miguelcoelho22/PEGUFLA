package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import org.springframework.stereotype.Service;

import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.model.veiculo.dto.request.VeiculoRequestDTO;
import br.ufla.PEGUFLA.model.veiculo.dto.response.VeiculoResponseDTO;
import br.ufla.PEGUFLA.repository.UserRepository;
import br.ufla.PEGUFLA.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;

@Service
@RequiredArgsConstructor
public class VeiculoService {

	private final VeiculoRepository veiculoRepository;
	private final UserRepository userRepository;

	public VeiculoResponseDTO create(VeiculoRequestDTO veiculoRequestDTO) {

		User user = userRepository.findById(veiculoRequestDTO.userId())
				.orElseThrow(() -> new RuntimeException("User não encontrado"));

		return new VeiculoResponseDTO(this.veiculoRepository.save(new Veiculo(veiculoRequestDTO.modelo(),
				veiculoRequestDTO.marca(), veiculoRequestDTO.cor(), veiculoRequestDTO.placa(), user)));
	}

	public VeiculoResponseDTO update(Long id, VeiculoRequestDTO veiculoRequestDTO) {

		Veiculo veiculo = veiculoRepository.findByIdAndUserId(id, veiculoRequestDTO.userId())
				.orElseThrow(() -> new RuntimeException("Veiculo não encontrado para este usuário"));

		if(veiculoRequestDTO.placa() != null && !veiculoRequestDTO.placa().equals(veiculo.getPlaca())) {
			if(veiculoRepository.existsByPlaca(veiculoRequestDTO.placa())) {
				throw new ModelException("Esta placa já está cadastrada no sistema");
			}
			veiculo.setPlaca(veiculoRequestDTO.placa());
		}

		if(veiculoRequestDTO.modelo() != null) veiculo.setModelo(veiculoRequestDTO.modelo());
		if(veiculoRequestDTO.marca() != null) veiculo.setMarca(veiculoRequestDTO.marca());
		if(veiculoRequestDTO.cor() != null) veiculo.setCor(veiculoRequestDTO.cor());

		return new VeiculoResponseDTO(veiculo);
	}
}
