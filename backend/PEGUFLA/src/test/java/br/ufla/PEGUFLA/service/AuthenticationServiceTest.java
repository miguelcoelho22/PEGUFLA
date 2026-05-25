package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.user.request.*;
import br.ufla.PEGUFLA.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private EmailService emailService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationService authenticationService;

    private User mockUser;
    private UserRequestRegisterDTO registerDTO;

    @BeforeEach
    void setUp() {
        mockUser = new User("Maria", "Souza", "maria@estudante.ufla.br", "senhaCodificada123");
        mockUser.setId(1L);
        registerDTO = new UserRequestRegisterDTO("maria@estudante.ufla.br", "senhaOriginal", "Maria", "Souza");
    }

    // --- Testes: SIGNUP ---

    @Test
    void signup_DeveSalvarUsuarioEEnviarEmail_QuandoEmailForUnico() throws MessagingException {
        when(userRepository.findByEmail(registerDTO.email())).thenReturn(Optional.empty());
        when(passwordEncoder.encode("senhaOriginal")).thenReturn("senhaCodificada123");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User savedUser = authenticationService.signup(registerDTO);

        assertNotNull(savedUser);
        verify(passwordEncoder, times(1)).encode("senhaOriginal");
        verify(userRepository, times(1)).save(any(User.class));
        verify(emailService, times(1)).sendVerificationEmail(eq(registerDTO.email()), anyString(), anyString());
    }

    @Test
    void signup_DeveLancarRuntimeException_EPararFluxo_QuandoEmailFalhar() throws MessagingException {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode("senhaOriginal")).thenReturn("senhaCodificada123");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        // Simula falha do servidor SMTP
        doThrow(new MessagingException("Conexão Recusada")).when(emailService)
                .sendVerificationEmail(anyString(), anyString(), anyString());

        // A RuntimeException indica que o @Transactional fará rollback em produção
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authenticationService.signup(registerDTO));

        assertEquals("Falha na comunicação com o servidor de e-mail.", exception.getMessage());
        // O repositório salvou em memória, mas o framework desfaríá.
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void signup_DeveLancarException_QuandoEmailJaExistir() {
        when(userRepository.findByEmail(registerDTO.email())).thenReturn(Optional.of(mockUser));

        ModelException ex = assertThrows(ModelException.class, () -> authenticationService.signup(registerDTO));

        assertEquals("Email ja registrado", ex.getMessage());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any());
    }

    // --- Testes: AUTHENTICATE ---

    @Test
    void authenticate_DeveAutenticar_QuandoCredenciaisValidas() {
        UserRequestLoginDTO loginDTO = new UserRequestLoginDTO("maria@estudante.ufla.br", "senhaOriginal");
        mockUser.setEnabled(true);
        when(userRepository.findByEmail(loginDTO.email())).thenReturn(Optional.of(mockUser));

        User authUser = authenticationService.authenticate(loginDTO);

        assertNotNull(authUser);
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void authenticate_DeveLancarException_QuandoContaForInativa() {
        UserRequestLoginDTO loginDTO = new UserRequestLoginDTO("maria@estudante.ufla.br", "senhaOriginal");
        mockUser.setEnabled(false);
        when(userRepository.findByEmail(loginDTO.email())).thenReturn(Optional.of(mockUser));

        ModelException ex = assertThrows(ModelException.class, () -> authenticationService.authenticate(loginDTO));

        assertEquals("Conta nao verificada, por favor verifique", ex.getMessage());
        verify(authenticationManager, never()).authenticate(any());
    }

    // --- Testes: VERIFY USER ---

    @Test
    void verifyUser_DeveAtivarConta_QuandoCodigoValidoEDentroDoPrazo() {
        mockUser.setVerificationCode("123456");
        mockUser.setVerificationCodeExpiresAt(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).plusMinutes(5));
        mockUser.setEnabled(false);

        VerifyUserDTO verifyDTO = new VerifyUserDTO("maria@estudante.ufla.br", "123456");
        when(userRepository.findByEmail(verifyDTO.getEmail())).thenReturn(Optional.of(mockUser));

        authenticationService.verifyUser(verifyDTO);

        assertTrue(mockUser.isEnabled());
        assertNull(mockUser.getVerificationCode());
        verify(userRepository, times(1)).save(mockUser);
    }

    // --- Testes: RECUPERAÇÃO E RESET ---

    @Test
    void resetPassword_DeveAtualizarSenha_QuandoDadosCorretos() {
        mockUser.setVerificationCode("654321");
        mockUser.setVerificationCodeExpiresAt(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).plusMinutes(10));

        ResetPasswordDTO resetDTO = new ResetPasswordDTO("maria@estudante.ufla.br", "novaSenha123", "654321");
        when(userRepository.findByEmail(resetDTO.getEmail())).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.encode("novaSenha123")).thenReturn("novaSenhaCriptografada");

        authenticationService.resetPassword(resetDTO);

        assertEquals("novaSenhaCriptografada", mockUser.getPassword());
        assertNull(mockUser.getVerificationCode());
        verify(userRepository, times(1)).save(mockUser);
    }
}