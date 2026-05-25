package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.carona.dto.request.CaronaRequestDTO;
import br.ufla.PEGUFLA.model.carona.dto.response.CaronaResponseDTO;
import br.ufla.PEGUFLA.model.enums.StatusReserva;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.reserva.Reserva;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.repository.UserRepository;
import br.ufla.PEGUFLA.repository.VeiculoRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CaronaServiceTest {

    @Mock
    private CaronaRepository caronaRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private VeiculoRepository veiculoRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private CaronaService caronaService;

    private User mockUser;
    private Veiculo mockVeiculo;
    private Carona mockCarona;
    private CaronaRequestDTO mockRequestDTO;
    private LocalDateTime horarioFuturo;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("passageiro@estudante.ufla.br");

        mockVeiculo = new Veiculo();
        mockVeiculo.setId(1L);
        mockVeiculo.setUser(mockUser);

        horarioFuturo = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).plusDays(1);

        mockRequestDTO = new CaronaRequestDTO(
                "Lavras",
                "Belo Horizonte",
                horarioFuturo,
                4,
                1L // veiculoId
        );

        mockCarona = new Carona("Lavras", "Belo Horizonte", horarioFuturo, 4, StatusViagem.CRIADA, mockUser, mockVeiculo);
    }

    // --- Testes do método CREATE ---

    @Test
    void create_DeveRetornarCaronaResponseDTO_QuandoDadosValidos() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(veiculoRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(mockVeiculo));
        when(caronaRepository.save(any(Carona.class))).thenReturn(mockCarona);

        CaronaResponseDTO response = caronaService.create(mockRequestDTO, 1L);

        assertNotNull(response);
        verify(caronaRepository, times(1)).save(any(Carona.class));
    }

    @Test
    void create_DeveLancarNotFoundException_QuandoUsuarioNaoEncontrado() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> caronaService.create(mockRequestDTO, 1L));

        assertEquals("User não encontrado", exception.getMessage());
        verify(veiculoRepository, never()).findByIdAndUserId(any(), any());
    }

    @Test
    void create_DeveLancarNotFoundException_QuandoVeiculoNaoPertencerAoUsuario() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(veiculoRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> caronaService.create(mockRequestDTO, 1L));

        assertEquals("Veiculo não encontrado para este usuário", exception.getMessage());
        verify(caronaRepository, never()).save(any());
    }

    @Test
    void create_DeveLancarModelException_QuandoHorarioForNoPassado() {
        LocalDateTime horarioPassado = LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).minusMinutes(5);
        CaronaRequestDTO requestPassado = new CaronaRequestDTO("Lavras", "BH", horarioPassado, 4, 1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(veiculoRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(mockVeiculo));

        ModelException exception = assertThrows(ModelException.class,
                () -> caronaService.create(requestPassado, 1L));

        assertEquals("O horário de saída deve ser no futuro", exception.getMessage());
        verify(caronaRepository, never()).save(any());
    }

    // --- Testes do método ATUALIZAR STATUS ---

    @Test
    void atualizarStatusCaronas_DeveChamarRepositoryComHorarioAtual() {
        caronaService.atualizarStatusCaronas();
        verify(caronaRepository, times(1)).atualizarCaronaExpiradas(any(LocalDateTime.class));
    }

    // --- Testes do método CANCELAR CARONA ---

    @Test
    void cancelarCarona_DeveCancelarCaronaEReservas_EEenviarEmails() throws MessagingException {
        Reserva mockReserva1 = new Reserva();
        mockReserva1.setStatusReserva(StatusReserva.CONFIRMADA);
        mockReserva1.setUser(mockUser);

        Reserva mockReserva2 = new Reserva();
        mockReserva2.setStatusReserva(StatusReserva.PENDENTE); // Não deve enviar e-mail nem cancelar

        mockCarona.setReservaList(List.of(mockReserva1, mockReserva2));

        when(caronaRepository.findById(1L)).thenReturn(Optional.of(mockCarona));

        caronaService.cancelarCarona(1L);

        assertEquals(StatusViagem.CANCELADA, mockCarona.getStatusViagem());
        assertEquals(StatusReserva.CANCELADA, mockReserva1.getStatusReserva());
        assertEquals(StatusReserva.PENDENTE, mockReserva2.getStatusReserva()); // Permanece inalterada

        verify(emailService, times(1)).sendVerificationEmail(
                eq(mockUser.getEmail()),
                eq("Carona Cancelada"),
                anyString()
        );
    }

    @Test
    void cancelarCarona_DeveLancarModelException_QuandoCaronaJaEstiverCancelada() throws MessagingException {
        mockCarona.setStatusViagem(StatusViagem.CANCELADA);
        when(caronaRepository.findById(1L)).thenReturn(Optional.of(mockCarona));

        ModelException exception = assertThrows(ModelException.class,
                () -> caronaService.cancelarCarona(1L));

        assertEquals("Carona já está CONCLUIDA ou cancelada", exception.getMessage());
        verify(emailService, never()).sendVerificationEmail(anyString(), anyString(), anyString());
    }

    @Test
    void cancelarCarona_DeveEngolirException_QuandoEmailFalhar() throws MessagingException {
        // Este teste documenta ativamente o comportamento falho do seu código.
        Reserva mockReserva = new Reserva();
        mockReserva.setStatusReserva(StatusReserva.CONFIRMADA);
        mockReserva.setUser(mockUser);
        mockCarona.setReservaList(List.of(mockReserva));

        when(caronaRepository.findById(1L)).thenReturn(Optional.of(mockCarona));
        doThrow(new MessagingException("Falha no SMTP"))
                .when(emailService).sendVerificationEmail(anyString(), anyString(), anyString());

        // A execução não vai falhar e não vai dar rollback na transação
        assertDoesNotThrow(() -> caronaService.cancelarCarona(1L));

        // O status será atualizado incorretamente, mesmo com a falha de envio
        assertEquals(StatusViagem.CANCELADA, mockCarona.getStatusViagem());
        assertEquals(StatusReserva.CANCELADA, mockReserva.getStatusReserva());
    }
}