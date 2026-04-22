package br.ufla.PEGUFLA.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.user.request.UserRequestLoginDTO;
import br.ufla.PEGUFLA.model.user.request.UserRequestRegisterDTO;
import br.ufla.PEGUFLA.model.user.request.VerifyUserDTO;
import br.ufla.PEGUFLA.repository.UserRepository;
import jakarta.mail.MessagingException;

@Service
public class AuthenticationService {

	private final UserRepository userRepository;

	private final AuthenticationManager authenticationManager;

	private final EmailService emailService;

	public AuthenticationService(UserRepository userRepository, AuthenticationManager authenticationManager,
			EmailService emailService) {
		this.userRepository = userRepository;
		this.authenticationManager = authenticationManager;
		this.emailService = emailService;
	}

	public User signup(UserRequestRegisterDTO dto) {

		String encryptedPassword = new BCryptPasswordEncoder().encode(dto.password());
		User user = new User(dto.name(), dto.lastName(), dto.email(), encryptedPassword);

		user.setVerificationCode(generateVerificationCode());
		user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
		user.setEnabled(false);
		sendVerificationEmail(user);

		return userRepository.save(user);
	}

	public User authenticate(UserRequestLoginDTO dto) {
		User user = this.userRepository.findByEmail(dto.email())
				.orElseThrow(() -> new RuntimeException("Email nao encontrado no repositorio"));

		if (!user.isEnabled()) {
			throw new ModelException("Conta nao verificada, por favor verifique");
		}

		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));

		return user;
	}

	public void verifyUser(VerifyUserDTO verifyUserDTO) {
		Optional<User> optionalUser = userRepository.findByEmail(verifyUserDTO.getEmail());

		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
				throw new ModelException("Codigo de verificação expirado");
			}
			if (user.getVerificationCode().equals(verifyUserDTO.getVerificationCode())) {
				user.setEnabled(true);
				user.setVerificationCode(null);
				user.setVerificationCodeExpiresAt(null);
				this.userRepository.save(user);
			} else {
				throw new ModelException("Codigo de verificação errado");
			}
		} else {
			throw new ModelException("Usuário nao encontrado");
		}
	}

	public void resendVerificationCode(String email) {
		Optional<User> optionalUser = this.userRepository.findByEmail(email);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			if (user.isEnabled()) {
				throw new ModelException("Conta ja esta verificada");
			}
			user.setVerificationCode(generateVerificationCode());
			user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(15));
			sendVerificationEmail(user);
			this.userRepository.save(user);
		} else {
			throw new ModelException("Usuário nao encontrado");
		}
	}

	public void sendVerificationEmail(User user) {
		String subject = "Verificação de conta";
		String verificationCode = user.getVerificationCode();

		String htmlMessage = "<html>" + "<body style=\"font-family: Arial, sans-serif;\">"
				+ "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
				+ "<h2 style=\"color: #333;\">Bem vindo ao PEGUFLA!</h2>"
				+ "<p style=\"font-size: 16px;\">Por favor entre com o código de verificação abaixo para continuar</p>"
				+ "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
				+ "<h3 style=\"color: #333;\">Código de verificação:</h3>"
				+ "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
				+ "</div>" + "</div>" + "</body>" + "</html>";

		try {
			this.emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	private String generateVerificationCode() {
		Random random = new Random();
		int code = random.nextInt(900000) + 100000;
		return String.valueOf(code);
	}
}
