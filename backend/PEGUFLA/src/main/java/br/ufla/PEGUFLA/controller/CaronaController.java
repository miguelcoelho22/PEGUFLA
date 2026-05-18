package br.ufla.PEGUFLA.controller;

import java.util.List;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.mensagem.dto.request.MensagemRequestDTO;
import br.ufla.PEGUFLA.model.mensagem.dto.response.MensagemResponseDTO;
import br.ufla.PEGUFLA.model.user.response.UserResponseDTO;
import br.ufla.PEGUFLA.repository.MensagemRepository;
import br.ufla.PEGUFLA.service.MensagemService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.carona.dto.request.CaronaRequestDTO;
import br.ufla.PEGUFLA.model.carona.dto.response.CaronaResponseDTO;
import br.ufla.PEGUFLA.model.carona.dto.response.HistoricoCaronaResponseDTO;
import br.ufla.PEGUFLA.model.enums.Papel;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.service.CaronaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/carona")
@RestController
@RequiredArgsConstructor
public class CaronaController {

    private final CaronaService caronaService;
    private final CaronaRepository caronaRepository;
    private final MensagemService mensagemService;

    @Operation(summary = "Cadastra uma nova carona", description = "Cria uma nova carona.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "carona criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Carona.class))),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "user não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "", content = @Content)})
    @PostMapping
    public ResponseEntity<CaronaResponseDTO> create(@RequestBody CaronaRequestDTO caronaRequestDTO, @AuthenticationPrincipal User user){

        if(user == null || user.getId() == null){
            throw new NullPointerException("usuario nao encontrado");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(this.caronaService.create(caronaRequestDTO, user.getId()));
    }

    @Operation(summary = "Lista carona com paginação e filtros", description = "Retorna uma lista paginada de caronas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Carona.class)))})
    @GetMapping
	public ResponseEntity<List<CaronaResponseDTO>> findAll() {
		List<CaronaResponseDTO> caronaResponseDTOS = this.caronaRepository.findAll().stream()
				.map(CaronaResponseDTO::new).toList();
		return ResponseEntity.status(HttpStatus.OK).body(caronaResponseDTOS);
     }

    @Operation(summary = "Deleta uma carona existente", description = "Deleta as informações de uma carona com base no seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "carona deletado com sucesso", content = @Content),
            @ApiResponse(responseCode = "404", description = "carona não encontrado", content = @Content)})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Carona carona = this.caronaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("veiculo não encontrada"));
        this.caronaRepository.delete(carona);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(summary = "Busca um veiculo por ID", description = "Retorna um veiculo específico com base no seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "veiculo encontrado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Carona.class))),
            @ApiResponse(responseCode = "404", description = "veiculo não encontrado", content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<CaronaResponseDTO> findById(@PathVariable Long id) {
        Carona carona = this.caronaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Carona não encontrada"));
        return ResponseEntity.status(HttpStatus.OK).body(new CaronaResponseDTO(carona));
    }

    @Operation(summary = "cancela uma carona existente", description = "cancela as informações de uma carona com base no seu ID.")
	@GetMapping("/cancelarCarona/{id}")
	public void cancelarCarona(@PathVariable Long id) {
        this.caronaService.cancelarCarona(id);
	}

	@Operation(summary = "busca o historico de carona", description = "busca o historico de carona com base no id do usuario")
	@GetMapping("/historicoCaronas")
	public ResponseEntity<Page<HistoricoCaronaResponseDTO>> historicoCarona(@AuthenticationPrincipal User user,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {

		if (user == null || user.getId() == null) {
			throw new NullPointerException("Passageiro não encontrado");
		}

		Pageable pageable = PageRequest.of(page, size);

		Page<Carona> caronas = this.caronaRepository.findHistoricoByUserId(user.getId(), pageable);

        if(caronas.isEmpty()){
            throw new ModelException("Nao foi encontrado caronas concluidas");
        }

		Page<HistoricoCaronaResponseDTO> responseDTOS = caronas.map(carona -> {
			Papel papel = carona.getId().equals(user.getId()) ? Papel.MOTORISTA : Papel.PASSAGEIRO;

			return new HistoricoCaronaResponseDTO(carona, papel);
		});

		return ResponseEntity.status(HttpStatus.OK).body(responseDTOS);

	}

    @Operation(summary = "Cadastra uma nova Mensagem", description = "Cria uma nova Mensagem.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Mensagem criada com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Mensagem.class))),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "user não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "", content = @Content)})
    @PostMapping("/{caronaId}/mensagens")
    public ResponseEntity<Void> enviarMensagem(@RequestBody @Valid MensagemRequestDTO mensagemRequestDTO, @PathVariable Long caronaId, @AuthenticationPrincipal User user){

        if(user == null || user.getId() == null){
            throw new NullPointerException("usuario nao encontrado");
        }

        this.mensagemService.enviarMensagem(mensagemRequestDTO, caronaId, user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "busca as mensagens existente", description = "busca as mensagem de uma carona com base no seu ID.")
    @GetMapping("/{caronaId}/mensagens")
    public ResponseEntity<List<MensagemResponseDTO>> listarMensagens(@PathVariable Long caronaId, @RequestParam(defaultValue = "0") Long depoisDe, @AuthenticationPrincipal User user){

        if(user == null || user.getId() == null){
            throw new NullPointerException("usuario nao encontrado");
        }

        List<MensagemResponseDTO> mensagens = this.caronaRepository.findNovasMensagensParaParticipante(caronaId, user.getId(), depoisDe)
                .stream()
                .map(mensagem -> new MensagemResponseDTO(
                        mensagem.getId(),
                        mensagem.getTexto(),
                        mensagem.getDataEnvio(),
                        new UserResponseDTO(mensagem.getUser())))
                .toList();

        return ResponseEntity.status(HttpStatus.OK).body(mensagens);
    }
}
