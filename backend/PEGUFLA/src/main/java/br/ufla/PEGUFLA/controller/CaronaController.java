package br.ufla.PEGUFLA.controller;

import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.carona.dto.request.CaronaRequestDTO;
import br.ufla.PEGUFLA.model.carona.dto.response.CaronaResponseDTO;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.service.CaronaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/carona")
@RestController
@RequiredArgsConstructor
public class CaronaController {

    private final CaronaService caronaService;
    private final CaronaRepository caronaRepository;

    @Operation(summary = "Cadastra uma nova carona", description = "Cria uma nova carona.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "carona criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Carona.class))),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "user não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "", content = @Content)})
    @PostMapping
    public ResponseEntity<CaronaResponseDTO> create(@RequestBody CaronaRequestDTO caronaRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(this.caronaService.create(caronaRequestDTO));
    }

    @Operation(summary = "Lista veiculos com paginação e filtros", description = "Retorna uma lista paginada de veiculos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Veiculo.class)))})
    @GetMapping
    public ResponseEntity<List<Carona>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(this.caronaRepository.findAll());
     }

    @Operation(summary = "Deleta um veiculo existente", description = "Deleta as informações de um veiculo com base no seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "veiculo deletado com sucesso", content = @Content),
            @ApiResponse(responseCode = "404", description = "veiculo não encontrado", content = @Content)})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Carona carona = this.caronaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carona não encontrada"));
        this.caronaRepository.delete(carona);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(summary = "Busca um veiculo por ID", description = "Retorna um veiculo específico com base no seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vveiculo encontrado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Veiculo.class))),
            @ApiResponse(responseCode = "404", description = "veiculo não encontrado", content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<CaronaResponseDTO> findById(@PathVariable Long id) {
        Carona carona = this.caronaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carona não encontrada"));
        return ResponseEntity.status(HttpStatus.OK).body(new CaronaResponseDTO(carona));
    }

}
