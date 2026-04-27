package br.ufla.PEGUFLA.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.model.veiculo.dto.request.VeiculoRequestDTO;
import br.ufla.PEGUFLA.model.veiculo.dto.response.VeiculoResponseDTO;
import br.ufla.PEGUFLA.repository.VeiculoRepository;
import br.ufla.PEGUFLA.service.VeiculoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/veiculo")
@RequiredArgsConstructor
public class VeiculoController {

	private final VeiculoService veiculoService;
	private final VeiculoRepository veiculoRepository;

	@Operation(summary = "Cadastra um novo veiculo", description = "Cria um novo veiculo.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "veiculo criado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Veiculo.class))),
			@ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
			@ApiResponse(responseCode = "404", description = "user não encontrado", content = @Content),
			@ApiResponse(responseCode = "409", description = "", content = @Content)})
	@PostMapping
	public ResponseEntity<VeiculoResponseDTO> create(@RequestBody VeiculoRequestDTO veiculoRequestDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(this.veiculoService.create(veiculoRequestDTO));
	}

	@Operation(summary = "Lista veiculos com paginação e filtros", description = "Retorna uma lista paginada de veiculos")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Busca realizada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Veiculo.class)))})
	@GetMapping
	public ResponseEntity<List<Veiculo>> findAll() {
		return ResponseEntity.status(HttpStatus.OK).body(this.veiculoRepository.findAll());
	}

	@Operation(summary = "Deleta um veiculo existente", description = "Deleta as informações de um veiculo com base no seu ID.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "204", description = "veiculo deletado com sucesso", content = @Content),
			@ApiResponse(responseCode = "404", description = "veiculo não encontrado", content = @Content)})
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		Veiculo veiculo = this.veiculoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Veiculo não encontrado"));
		this.veiculoRepository.delete(veiculo);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@Operation(summary = "Busca um veiculo por ID", description = "Retorna um veiculo específico com base no seu ID.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Vveiculo encontrado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Veiculo.class))),
			@ApiResponse(responseCode = "404", description = "veiculo não encontrado", content = @Content)})
	@GetMapping("/{id}")
	public ResponseEntity<VeiculoResponseDTO> findById(@PathVariable Long id) {
		Veiculo veiculo = this.veiculoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Veiculo não encontrado"));
		return ResponseEntity.status(HttpStatus.OK).body(new VeiculoResponseDTO(veiculo));
	}

	@Operation(summary = "Atualiza um novo veiculo", description = "Atualiza as informações de um veiculo com base no seu ID.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "veiculo atualizado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Veiculo.class))),
			@ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
			@ApiResponse(responseCode = "404", description = "", content = @Content),
			@ApiResponse(responseCode = "409", description = "Já existe um veiculo", content = @Content)})
	@PutMapping("/{id}")
	public ResponseEntity<VeiculoResponseDTO> update(
			@Parameter(description = "ID do veiculo a ser atualizado.", required = true) @PathVariable Long id,
			@RequestBody VeiculoRequestDTO veiculoRequestDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(this.veiculoService.update(id, veiculoRequestDTO));
	}


	@Operation(summary = "Busca um veiculo por ID do usuario", description = "Retorna um veiculo específico com base no seu ID.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "veiculo encontrado com sucesso", content = @Content(mediaType = "application/json")),
			@ApiResponse(responseCode = "404", description = "veiculo não encontrado", content = @Content)})
	@GetMapping("/{userId}")
	public ResponseEntity<List<VeiculoResponseDTO>> findVeiculoByUserId(
			@Parameter(description = "ID do usuário associado ao veículo.", required = true) @PathVariable Long userId) {
		List<Veiculo> veiculos = this.veiculoRepository.findByUserId(userId);

		List<VeiculoResponseDTO> response = veiculos.stream()
				.map(VeiculoResponseDTO::new)
				.toList();

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
