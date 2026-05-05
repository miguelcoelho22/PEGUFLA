package br.ufla.PEGUFLA.controller;

import br.ufla.PEGUFLA.model.reserva.Reserva;
import br.ufla.PEGUFLA.model.reserva.dto.request.ReservaRequestDTO;
import br.ufla.PEGUFLA.model.reserva.dto.response.ReservaResponseDTO;
import br.ufla.PEGUFLA.service.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @Operation(summary = "Cadastra uma nova reserva", description = "Cria uma nova reserva.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "reserva criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Reserva.class))),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "user não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "", content = @Content)})
    @PostMapping
    public ResponseEntity<ReservaResponseDTO> create(@RequestBody ReservaRequestDTO reservaRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.create(reservaRequestDTO));
    }

    @Operation(summary = "aprova reserva da carona", description = "aprova uma reserva que esta pendente")
    @GetMapping("/{reservaId}/aprovar}")
    public ResponseEntity<Void> aprovarReserva(@PathVariable Long reservaId, Authentication authentication) {

        UUID motoristaIdLogado = UUID.fromString(authentication.getName());

        this.reservaService.aprovarCarona(reservaId, motoristaIdLogado);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
