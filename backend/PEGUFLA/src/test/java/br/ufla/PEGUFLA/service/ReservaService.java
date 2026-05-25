package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.StatusReserva;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.reserva.Reserva;
import br.ufla.PEGUFLA.model.reserva.dto.request.ReservaRequestDTO;
import br.ufla.PEGUFLA.model.reserva.dto.response.ReservaResponseDTO;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.repository.ReservaRepository;
import br.ufla.PEGUFLA.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CaronaRepository caronaRepository;

    @InjectMocks
    private ReservaService reservaService;

    private User mockPassageiro;
    private User mockMotorista;
    private Carona mockCarona;
    private Reserva mockReserva;
    private Veiculo mockVeiculo;

    @BeforeEach
    void setUp() {
        mockMotorista = new User();
        mockMotorista.setId(1L);

        mockPassageiro = new User();
        mockPassageiro.setId(2L);

        mockVeiculo = new Veiculo();
        mockVeiculo.setId(3L);
        mockVeiculo.setUser(mockMotorista);
        mockVeiculo.setPlaca("XYZ-1234");
        mockVeiculo.setModelo("Civic");
        mockVeiculo.setMarca("Honda");
        mockVeiculo.setCor("Preto");

        mockCarona = new Carona();
        mockCarona.setId(10L);
        mockCarona.setUser(mockMotorista);
        mockCarona.setStatusViagem(StatusViagem.CRIADA);
        mockCarona.setVagasDisponiveis(4);
        mockCarona.setHorarioSaida(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).plusDays(1));
        mockCarona.setVeiculo(mockVeiculo);

        mockReserva = new Reserva();
        mockReserva.setId(100L);
        mockReserva.setUser(mockPassageiro);
        mockReserva.setCarona(mockCarona);
        mockReserva.setStatusReserva(StatusReserva.PENDENTE);
    }

    // --- Testes: CREATE ---

    @Test
    void create_DeveRetornarReservaResponse_QuandoRegrasSatisfeitas() {
        ReservaRequestDTO request = new ReservaRequestDTO(10L);
        when(userRepository.findById(2L)).thenReturn(Optional.of(mockPassageiro));
        when(caronaRepository.findById(10L)).thenReturn(Optional.of(mockCarona));
        when(reservaRepository.existsByUserAndCarona(mockPassageiro, mockCarona)).thenReturn(false);
        when(reservaRepository.save(any(Reserva.class))).thenReturn(mockReserva);

        ReservaResponseDTO response = reservaService.create(request, 2L);

        assertNotNull(response);
        verify(reservaRepository, times(1)).save(any(Reserva.class));
    }

    @Test
    void create_DeveLancarException_QuandoMotoristaTentarReservarPropriaCarona() {
        ReservaRequestDTO request = new ReservaRequestDTO(10L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockMotorista));
        when(caronaRepository.findById(10L)).thenReturn(Optional.of(mockCarona));
        when(reservaRepository.existsByUserAndCarona(mockMotorista, mockCarona)).thenReturn(false);

        ModelException ex = assertThrows(ModelException.class, () -> reservaService.create(request, 1L));
        assertEquals("O motorista da carona não pode reservar sua própria carona.", ex.getMessage());
    }

    @Test
    void create_DeveLancarException_QuandoCaronaJaOcorreu() {
        mockCarona.setHorarioSaida(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")).minusHours(1));
        ReservaRequestDTO request = new ReservaRequestDTO(10L);

        when(userRepository.findById(2L)).thenReturn(Optional.of(mockPassageiro));
        when(caronaRepository.findById(10L)).thenReturn(Optional.of(mockCarona));

        ModelException ex = assertThrows(ModelException.class, () -> reservaService.create(request, 2L));
        assertEquals("Carona já ocorreu", ex.getMessage());
    }

    // --- Testes: APROVAR CARONA ---

    @Test
    void aprovarCarona_DeveAprovarERejeitarDemais_QuandoCaronaFicarCheia() {
        when(reservaRepository.findById(100L)).thenReturn(Optional.of(mockReserva));

        // Simular que o método confirmarReserva() da entidade deixou a carona CHEIA
        mockCarona.setStatusViagem(StatusViagem.CHEIA);

        Reserva outraReservaPendente = new Reserva();
        outraReservaPendente.setStatusReserva(StatusReserva.PENDENTE);

        when(reservaRepository.findByCaronaIdAndStatusReserva(10L, StatusReserva.PENDENTE))
                .thenReturn(List.of(outraReservaPendente));

        reservaService.aprovarCarona(100L, 1L);

        assertEquals(StatusReserva.CONFIRMADA, mockReserva.getStatusReserva());
        assertEquals(StatusReserva.REJEITADA, outraReservaPendente.getStatusReserva());
        verify(reservaRepository, times(1)).findByCaronaIdAndStatusReserva(10L, StatusReserva.PENDENTE);
    }

    @Test
    void aprovarCarona_DeveLancarException_QuandoNaoForMotorista() {
        when(reservaRepository.findById(100L)).thenReturn(Optional.of(mockReserva));

        ModelException ex = assertThrows(ModelException.class, () -> reservaService.aprovarCarona(100L, 2L)); // ID passageiro
        assertEquals("Apenas o motorista da carona pode aprovar reservas.", ex.getMessage());
    }

    // --- Testes: REJEITAR CARONA ---

    @Test
    void rejeitarCarona_DeveMudarStatusParaRejeitada_QuandoSolicitadoPeloMotorista() {
        when(reservaRepository.findById(100L)).thenReturn(Optional.of(mockReserva));

        reservaService.rejeitarCarona(100L, 1L);

        assertEquals(StatusReserva.REJEITADA, mockReserva.getStatusReserva());
    }

    // --- Testes: VISUALIZAR SOLICITACOES ---

    @Test
    void visualizarSolicitacoes_DeveLancarException_QuandoCaronaInvalida() {
        mockCarona.setStatusViagem(StatusViagem.CANCELADA);
        when(caronaRepository.findById(10L)).thenReturn(Optional.of(mockCarona));

        ModelException ex = assertThrows(ModelException.class, () -> reservaService.visualizarSolicitacoesReserva(10L));
        assertEquals("Carona já está CONCLUIDA ou cancelada", ex.getMessage());
    }

    // --- Testes: CANCELAR RESERVA ---

    @Test
    void cancelarReserva_DeveDevolverVaga_QuandoReservaEstavaConfirmada() {
        mockReserva.setStatusReserva(StatusReserva.CONFIRMADA);
        mockCarona.setVagasDisponiveis(2);
        when(reservaRepository.findById(100L)).thenReturn(Optional.of(mockReserva));

        reservaService.cancelarReserva(100L, 2L); // ID do passageiro

        assertEquals(StatusReserva.CANCELADA, mockReserva.getStatusReserva());
        assertEquals(3, mockCarona.getVagasDisponiveis());
    }

    @Test
    void cancelarReserva_DeveAbrirCarona_QuandoCaronaEstavaCheiaEReservaFoiCancelada() {
        mockReserva.setStatusReserva(StatusReserva.CONFIRMADA);
        mockCarona.setVagasDisponiveis(0);
        mockCarona.setStatusViagem(StatusViagem.CHEIA);
        when(reservaRepository.findById(100L)).thenReturn(Optional.of(mockReserva));

        reservaService.cancelarReserva(100L, 2L);

        assertEquals(StatusReserva.CANCELADA, mockReserva.getStatusReserva());
        assertEquals(1, mockCarona.getVagasDisponiveis());
        assertEquals(StatusViagem.CRIADA, mockCarona.getStatusViagem());
    }

    @Test
    void cancelarReserva_DeveApenasCancelar_QuandoReservaEstavaPendente() {
        // Status já é PENDENTE no setUp()
        mockCarona.setVagasDisponiveis(4);
        when(reservaRepository.findById(100L)).thenReturn(Optional.of(mockReserva));

        reservaService.cancelarReserva(100L, 2L);

        assertEquals(StatusReserva.CANCELADA, mockReserva.getStatusReserva());
        assertEquals(4, mockCarona.getVagasDisponiveis()); // Vagas não se alteram
    }

    @Test
    void cancelarReserva_DeveLancarException_QuandoCaronaJaEstiverConcluida() {
        mockCarona.setStatusViagem(StatusViagem.CONCLUIDA);
        when(reservaRepository.findById(100L)).thenReturn(Optional.of(mockReserva));

        ModelException ex = assertThrows(ModelException.class, () -> reservaService.cancelarReserva(100L, 2L));
        assertEquals("Carona já está CONCLUIDA ou cancelada", ex.getMessage());
    }
}