package br.ufla.PEGUFLA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import jakarta.mail.MessagingException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.carona.dto.request.CaronaRequestDTO;
import br.ufla.PEGUFLA.model.carona.dto.response.CaronaResponseDTO;
import br.ufla.PEGUFLA.model.enums.StatusReserva;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.repository.UserRepository;
import br.ufla.PEGUFLA.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CaronaService {

    private final CaronaRepository caronaRepository;
    private final UserRepository userRepository;
    private final VeiculoRepository veiculoRepository;
	private final EmailService emailService;

    public CaronaResponseDTO create(CaronaRequestDTO caronaRequestDTO, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User não encontrado"));

        Veiculo veiculo = veiculoRepository.findByIdAndUserId(caronaRequestDTO.veiculoId(), userId)
                .orElseThrow(() -> new NotFoundException("Veiculo não encontrado para este usuário"));

        this.validarHorarioSaida(caronaRequestDTO);

		return new CaronaResponseDTO(this.caronaRepository.save(new Carona(caronaRequestDTO.origem(),
				caronaRequestDTO.destino(), caronaRequestDTO.horarioSaida(),
                caronaRequestDTO.vagasTotais(), StatusViagem.CRIADA,
				user, veiculo)));
    }

    public void validarHorarioSaida(CaronaRequestDTO caronaRequestDTO) {
        if (caronaRequestDTO.horarioSaida().isBefore(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")))) {
            throw new ModelException("O horário de saída deve ser no futuro");
        }
    }

    @Scheduled(cron = "0 */10 * * * *")
    @Transactional
    public void atualizarStatusCaronas() {
        LocalDateTime agora = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
        this.caronaRepository.atualizarCaronaExpiradas(agora);
    }

	@Transactional
	public void cancelarCarona(Long id) {
		Carona carona = this.caronaRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Carona não encontrada"));

        if(carona.getStatusViagem() == StatusViagem.CONCLUIDA|| carona.getStatusViagem() == StatusViagem.CANCELADA) {
            throw new ModelException("Carona já está CONCLUIDA ou cancelada");
        }

		carona.setStatusViagem(StatusViagem.CANCELADA);

        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy 'às' HH:mm");
        String dataFormatada = carona.getHorarioSaida().format(formatador);

        String htmlMessage = """
        <!DOCTYPE html>
        <html lang="pt-BR">
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f5;">
            <table width="100%%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb;">
                <tr>
                    <td align="center" style="background-color: #dc2626; padding: 20px; color: #ffffff;">
                        <h2 style="margin: 0; font-size: 24px;">Reserva Cancelada</h2>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; color: #333333; line-height: 1.6;">
                        <p style="font-size: 16px; margin-top: 0;">Olá,</p>
                        <p style="font-size: 16px;">O motorista infelizmente cancelou a carona que você havia reservado.</p>
                        
                        <table width="100%%" border="0" cellspacing="0" cellpadding="10" style="background-color: #f9fafb; margin: 20px 0; border-left: 4px solid #dc2626;">
                            <tr>
                                <td style="font-size: 15px;">
                                    <strong>Origem:</strong> %s <br>
                                    <strong>Destino:</strong> %s <br>
                                    <strong>Horário:</strong> %s
                                </td>
                            </tr>
                        </table>
                        
                        <p style="font-size: 14px; color: #666666; margin-bottom: 0;">Lamentamos o inconveniente. Acesse o aplicativo PEGUFLA para buscar novas alternativas de trajeto.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """.formatted(
                    carona.getOrigem(),
                    carona.getDestino(),
                    dataFormatada
            );

	    carona.getReservaList().stream()
				.filter(r -> r.getStatusReserva() == StatusReserva.CONFIRMADA).forEach(reserva -> {
                    reserva.setStatusReserva(StatusReserva.CANCELADA);

                    try {
                        emailService.sendVerificationEmail(reserva.getUser().getEmail(), "Carona Cancelada", htmlMessage);
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
                });
	}
}
