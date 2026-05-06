package br.ufla.PEGUFLA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import br.ufla.PEGUFLA.model.enums.StatusViagem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.StatusReserva;
import br.ufla.PEGUFLA.model.reserva.Reserva;
import br.ufla.PEGUFLA.model.reserva.dto.request.ReservaRequestDTO;
import br.ufla.PEGUFLA.model.reserva.dto.response.ReservaResponseDTO;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.repository.ReservaRepository;
import br.ufla.PEGUFLA.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservaService {

	private final ReservaRepository reservaRepository;
	private final UserRepository userRepository;
	private final CaronaRepository caronaRepository;

	@Transactional
	public ReservaResponseDTO create(ReservaRequestDTO reservaRequestDTO) {

		User user = this.userRepository.findById(reservaRequestDTO.userId())
				.orElseThrow(() -> new NotFoundException("User não encontrado"));

		Carona carona = this.caronaRepository.findById(reservaRequestDTO.caronaId())
				.orElseThrow(() -> new NotFoundException("Carona não encontrada"));

		if (this.reservaRepository.existsByUserAndCarona(user, carona)) {
			throw new ModelException("Você já solicitou uma reserva para esta carona.");
		}

		if(carona.getUser().equals(user)){
			throw new ModelException("O motorista da carona não pode reservar sua própria carona.");
		}

		if(carona.getStatusViagem() != StatusViagem.CRIADA){
			throw new ModelException("Não é possível reservar uma carona que já foi iniciada ou finalizada.");
		}

		this.validarCarona(carona);
		return new ReservaResponseDTO(this.reservaRepository.save(
				new Reserva(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")), StatusReserva.PENDENTE, user, carona)));
	}

	public void validarCarona(Carona carona) {

		if (carona.getHorarioSaida().isBefore(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")))) {
			throw new ModelException("Carona já ocorreu");
		}

		if (carona.getVagasDisponiveis() <= 0) {
			throw new ModelException("Não há vagas disponíveis para esta carona.");
		}
	}

	@Transactional
	public void aprovarCarona(Long reservaId, Long motoristaId) {
		Reserva reserva = this.reservaRepository.findById(reservaId)
				.orElseThrow(() -> new NotFoundException("Reserva não encontrada"));

		Carona carona = reserva.getCarona();

		if (!carona.getUser().getId().toString().equals(motoristaId.toString())) {
			throw new ModelException("Apenas o motorista da carona pode aprovar reservas.");
		}

		if (reserva.getStatusReserva() != StatusReserva.PENDENTE) {
			throw new ModelException("Apenas reservas pendentes podem ser aprovadas.");
		}

		carona.confirmarReserva();
		reserva.setStatusReserva(StatusReserva.CONFIRMADA);

		if(carona.getStatusViagem() == StatusViagem.CHEIA){
			this.reservaRepository.findByCaronaIdAndStatusReserva(carona.getId(), StatusReserva.PENDENTE)
					.forEach(reservaPendente -> reservaPendente.setStatusReserva(StatusReserva.REJEITADA));
		}
	}

	public void rejeitarCarona(Long reservaId, Long id) {
		Reserva reserva = this.reservaRepository.findById(reservaId)
				.orElseThrow(() -> new NotFoundException("Reserva não encontrada"));

		if(!reserva.getCarona().getUser().getId().toString().equals(id.toString())) {
			throw new ModelException("Apenas o motorista da carona pode rejeitar reservas.");
		}

		if(reserva.getStatusReserva() != StatusReserva.PENDENTE) {
			throw new ModelException("Apenas reservas pendentes podem ser rejeitadas.");
		}

		reserva.setStatusReserva(StatusReserva.REJEITADA);
	}

	public List<Reserva> visualizarSolicitacoesReserva(Long idCarona) {
		Carona carona = this.caronaRepository.findById(idCarona)
				.orElseThrow(() -> new NotFoundException("Carona não encontrada"));

		if(carona.getStatusViagem() == StatusViagem.CONCLUIDA || carona.getStatusViagem() == StatusViagem.CANCELADA) {
			throw new ModelException("Carona já está CONCLUIDA ou cancelada");
		}

		return this.reservaRepository.findAllByCaronaIdAndStatusReserva(idCarona, StatusReserva.PENDENTE);
	}

	@Transactional
	public void cancelarReserva(Long idReserva, Long id) {

		Reserva reserva = this.reservaRepository.findById(idReserva)
				.orElseThrow(() -> new NotFoundException("Reserva não encontrada"));

		if(reserva.getStatusReserva() != StatusReserva.PENDENTE && reserva.getStatusReserva() != StatusReserva.CONFIRMADA) {
			throw new ModelException("Apenas reservas pendentes ou confirmadas podem ser canceladas.");
		}

		if(!reserva.getUser().getId().toString().equals(id.toString())) {
			throw new ModelException("Apenas o passageiro que fez a reserva pode cancelá-la.");
		}

		reserva.setStatusReserva(StatusReserva.CANCELADA);

		Carona carona = reserva.getCarona();

		if(reserva.getStatusReserva() == StatusReserva.CONFIRMADA) {
			carona.setVagasDisponiveis(carona.getVagasDisponiveis() + 1);
			if(carona.getStatusViagem() == StatusViagem.CHEIA) {
				carona.setStatusViagem(StatusViagem.CRIADA);
			}
		}

		if(reserva.getStatusReserva() == StatusReserva.PENDENTE || reserva.getStatusReserva() == StatusReserva.CONFIRMADA) {
			reserva.setStatusReserva(StatusReserva.CANCELADA);
		}
	}
}
