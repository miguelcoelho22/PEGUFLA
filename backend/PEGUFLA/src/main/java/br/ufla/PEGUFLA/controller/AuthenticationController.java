package br.ufla.PEGUFLA.controller;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.security.TokenService;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.user.request.UserRequestLoginDTO;
import br.ufla.PEGUFLA.model.user.request.UserRequestRegisterDTO;
import br.ufla.PEGUFLA.model.user.request.VerifyUserDTO;
import br.ufla.PEGUFLA.model.user.response.LoginResponseDTO;
import br.ufla.PEGUFLA.repository.UserRepository;
import br.ufla.PEGUFLA.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final TokenService tokenService;
	private final AuthenticationService authenticationService;

	@Operation(summary = "Autentica um usuário", description = "Valida as credenciais do usuário e retorna um token JWT para acesso aos endpoints protegidos.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Login realizado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponseDTO.class))),
			@ApiResponse(responseCode = "400", description = "Dados de entrada inválidos", content = @Content),
			@ApiResponse(responseCode = "403", description = "Credenciais incorretas ou acesso negado", content = @Content)})
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid UserRequestLoginDTO userRequestLoginDTO) {
		this.authenticationService.authenticate(userRequestLoginDTO);

		var usernamePassword = new UsernamePasswordAuthenticationToken(userRequestLoginDTO.email(),
				userRequestLoginDTO.password());

		var auth = this.authenticationManager.authenticate(usernamePassword);

		var token = tokenService.generatetoken((User) auth.getPrincipal());

		return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDTO(token));
	}

	@Operation(summary = "Registra um novo usuário", description = "Cria uma nova conta de usuário no sistema PegUFLA.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Usuário registrado com sucesso", content = @Content),
			@ApiResponse(responseCode = "400", description = "Dados de entrada inválidos ou e-mail já cadastrado", content = @Content)})
	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid UserRequestRegisterDTO userRequestRegisterDTO) {
		if (this.userRepository.findByEmail(userRequestRegisterDTO.email()).isPresent()) {
			throw new ModelException("Email ja cadastrado no sistema");
		}

		this.authenticationService.signup(userRequestRegisterDTO);

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@Operation(summary = "Verifica a conta do usuário", description = "Valida o código de verificação enviado para o e-mail do usuário recém-registrado.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Conta verificada com sucesso", content = @Content),
			@ApiResponse(responseCode = "400", description = "Código de verificação inválido ou expirado", content = @Content)})
	@PostMapping("/verify")
	public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDTO verifyUserDTO) {
		try{
			this.authenticationService.verifyUser(verifyUserDTO);
			return ResponseEntity.status(HttpStatus.OK).body("Conta verificada com sucesso!");
		}catch (RuntimeException e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@Operation(summary = "Reenvia o código de verificação", description = "Gera e envia um novo código de verificação para o e-mail especificado.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Código de verificação enviado com sucesso", content = @Content),
			@ApiResponse(responseCode = "400", description = "E-mail não encontrado ou solicitação inválida", content = @Content)})
	@PostMapping("/resend")
	public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
		try{
			this.authenticationService.resendVerificationCode(email);
			return ResponseEntity.status(HttpStatus.OK).body("Codigo de verificação enviado");
		}catch (RuntimeException e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
