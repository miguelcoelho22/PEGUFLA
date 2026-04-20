package br.ufla.PEGUFLA.controller;

import br.ufla.PEGUFLA.exception.ModelException;
import br.ufla.PEGUFLA.infra.security.TokenService;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.user.UserRole;
import br.ufla.PEGUFLA.model.user.request.UserRequestLoginDTO;
import br.ufla.PEGUFLA.model.user.request.UserRequestRegisterDTO;
import br.ufla.PEGUFLA.model.user.response.LoginResponseDTO;
import br.ufla.PEGUFLA.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final TokenService tokenService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid UserRequestLoginDTO userRequestLoginDTO) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(userRequestLoginDTO.login(),
				userRequestLoginDTO.password());

		var auth = this.authenticationManager.authenticate(usernamePassword);

		var token = tokenService.generatetoken((User) auth.getPrincipal());

		return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDTO(token));
	}

	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid UserRequestRegisterDTO userRequestRegisterDTO) {
		if (this.userRepository.findByLogin(userRequestRegisterDTO.email()) != null) {
			throw new ModelException("Email ja cadastrado no sistema");
		}

		String encryptedPassword = new BCryptPasswordEncoder().encode(userRequestRegisterDTO.password());
		User user = new User(userRequestRegisterDTO.email(), encryptedPassword, UserRole.USER);

		this.userRepository.save(user);

		return ResponseEntity.status(HttpStatus.OK).build();
	}
}
