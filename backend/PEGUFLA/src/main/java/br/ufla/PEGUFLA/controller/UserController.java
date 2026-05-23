package br.ufla.PEGUFLA.controller;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.user.response.UserResponseDTO;
import br.ufla.PEGUFLA.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @Operation(summary = "Busca um usuario por ID", description = "Retorna um usuario específico com base no seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "usuario encontrado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "404", description = "usuario não encontrado", content = @Content)})
    @GetMapping()
    public ResponseEntity<UserResponseDTO> getById(@AuthenticationPrincipal User user) {

        if(user == null || user.getId() == null) {
            throw new ModelException("usuario nao encontrado");
        }
        User userEncontrado = this.userRepository.findById(user.getId()).orElseThrow(() -> new NotFoundException("User não encontrado"));
        return ResponseEntity.status(HttpStatus.OK).body(new UserResponseDTO(userEncontrado));
    }
}
