package br.ufla.PEGUFLA.controller;

import java.util.List;
import java.util.UUID;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import br.ufla.PEGUFLA.model.reserva.Reserva;
import br.ufla.PEGUFLA.model.reserva.dto.request.ReservaRequestDTO;
import br.ufla.PEGUFLA.model.reserva.dto.response.ReservaResponseDTO;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.repository.ReservaRepository;
import br.ufla.PEGUFLA.service.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/reserva")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;
	private final ReservaRepository reservaRepository;

    @Operation(summary = "Cadastra uma nova reserva", description = "Cria uma nova reserva.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "reserva criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Reserva.class))),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "user não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "", content = @Content)})
    @PostMapping
    public ResponseEntity<ReservaResponseDTO> create(@RequestBody ReservaRequestDTO reservaRequestDTO, @AuthenticationPrincipal User user){

        if(user == null || user.getId() == null){
            throw new NotFoundException("Usuario nao encontrado");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.create(reservaRequestDTO, user.getId()));
    }

    @Operation(summary = "aprova reserva da carona", description = "aprova uma reserva que esta pendente")
    @GetMapping("/{reservaId}/aprovar")
    public ResponseEntity<Void> aprovarReserva(@PathVariable Long reservaId, Authentication authentication) {
        User motoristaLogado = (User) authentication.getPrincipal();

        if(motoristaLogado.getId() == null){
            throw new NotFoundException("Motorista não encontrado");
        }

        this.reservaService.aprovarCarona(reservaId, motoristaLogado.getId());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(summary = "rejeita reserva da carona", description = "rejeita uma reserva que esta pendente")
    @GetMapping("/{reservaId}/rejeitar")
    public ResponseEntity<Void> rejeitarReserva(@PathVariable Long reservaId, @AuthenticationPrincipal User user) {

        if(user == null || user.getId() == null){
            throw new NotFoundException("Motorista não encontrado");
        }

        this.reservaService.rejeitarCarona(reservaId, user.getId());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

	@Operation(summary = "Lista reservas com paginação e filtros", description = "Retorna uma lista de reservas")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Busca realizada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Reserva.class)))})
	@GetMapping
	public ResponseEntity<List<ReservaResponseDTO>> findAll() {
		List<ReservaResponseDTO> reservaResponseDTOS = this.reservaRepository.findAll().stream()
				.map(ReservaResponseDTO::new).toList();
		return ResponseEntity.status(HttpStatus.OK).body(reservaResponseDTOS);
	}

    @Operation(summary = "Busca uma reserva por ID", description = "Retorna uma reserva específico com base no seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "reserva encontrado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Reserva.class))),
            @ApiResponse(responseCode = "404", description = "reserva não encontrado", content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> findById(@PathVariable Long id) {
        Reserva reserva = this.reservaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("reserva não encontrada"));
        return ResponseEntity.status(HttpStatus.OK).body(new ReservaResponseDTO(reserva));
    }

    @Operation(summary = "Deleta uma reserva existente", description = "Deleta as informações de uma reserva com base no seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "reserva deletado com sucesso", content = @Content),
            @ApiResponse(responseCode = "404", description = "reserva não encontrado", content = @Content)})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Reserva reserva = this.reservaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("reserva não encontrada"));
        this.reservaRepository.delete(reserva);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(summary = "visualiza as solicitações de reservas pendentes", description = "visualiza as solicitações de reservas pendentes com base no id da carona")
    @GetMapping("/solicitacoesReserva/{idCarona}")
    public ResponseEntity<List<ReservaResponseDTO>> visualizarSolicitacoesReserva(@PathVariable Long idCarona) {

        List<Reserva> reservas = this.reservaService.visualizarSolicitacoesReserva(idCarona);

        return ResponseEntity.status(HttpStatus.OK).body(reservas.stream().map(ReservaResponseDTO::new).toList());
    }

    @Operation(summary = "cancelar solicitação de reserva", description = "cancela solicitação de reserva com base no id da carona")
    @PatchMapping("/cancelarReserva/{idReserva}")
    public ResponseEntity<Void> cancelarReserva(@PathVariable Long idReserva,@AuthenticationPrincipal User user) {

        if(user == null || user.getId() == null){
            throw new NotFoundException("Passageiro não encontrado");
        }

        this.reservaService.cancelarReserva(idReserva, user.getId());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

