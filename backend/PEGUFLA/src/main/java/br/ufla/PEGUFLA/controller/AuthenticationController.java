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

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid UserRequestLoginDTO userRequestLoginDTO) {
		this.authenticationService.authenticate(userRequestLoginDTO);

		var usernamePassword = new UsernamePasswordAuthenticationToken(userRequestLoginDTO.email(),
				userRequestLoginDTO.password());

		var auth = this.authenticationManager.authenticate(usernamePassword);

		var token = tokenService.generatetoken((User) auth.getPrincipal());

		return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDTO(token));
	}

	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid UserRequestRegisterDTO userRequestRegisterDTO) {
		if (this.userRepository.findByEmail(userRequestRegisterDTO.email()).isPresent()) {
			throw new ModelException("Email ja cadastrado no sistema");
		}

		this.authenticationService.signup(userRequestRegisterDTO);

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@PostMapping("/verify")
	public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDTO verifyUserDTO) {
		try{
			this.authenticationService.verifyUser(verifyUserDTO);
			return ResponseEntity.status(HttpStatus.OK).body("Conta verificada com sucesso!");
		}catch (RuntimeException e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

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
