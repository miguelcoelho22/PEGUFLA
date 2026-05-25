package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.infra.exception.NotFoundException;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.model.veiculo.dto.request.VeiculoRequestDTO;
import br.ufla.PEGUFLA.model.veiculo.dto.response.VeiculoResponseDTO;
import br.ufla.PEGUFLA.repository.UserRepository;
import br.ufla.PEGUFLA.repository.VeiculoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VeiculoServiceTest {

    @Mock
    private VeiculoRepository veiculoRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private VeiculoService veiculoService;

    private User mockUser;
    private VeiculoRequestDTO mockRequestDTO;
    private Veiculo mockVeiculo;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(1L);

        mockRequestDTO = new VeiculoRequestDTO("Civic", "Honda", "Preto", "ABC-1234");

        mockVeiculo = new Veiculo("Civic", "Honda", "Preto", "ABC-1234", mockUser);
        mockVeiculo.setId(1L);
    }

    // --- Testes do método CREATE ---

    @Test
    void create_DeveRetornarVeiculoResponseDTO_QuandoUserExistir() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(veiculoRepository.save(any(Veiculo.class))).thenReturn(mockVeiculo);

        // Act
        VeiculoResponseDTO response = veiculoService.create(mockRequestDTO, 1L);

        // Assert
        assertNotNull(response);
        // Ajuste os asserts de acordo com os campos do seu DTO de resposta
        verify(userRepository, times(1)).findById(1L);
        verify(veiculoRepository, times(1)).save(any(Veiculo.class));
    }

    @Test
    void create_DeveLancarNotFoundException_QuandoUserNaoExistir() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> veiculoService.create(mockRequestDTO, 1L));

        assertEquals("User não encontrado", exception.getMessage());
        verify(userRepository, times(1)).findById(1L);
        verify(veiculoRepository, never()).save(any(Veiculo.class));
    }

    // --- Testes do método UPDATE ---

    @Test
    void update_DeveAtualizarERetornarVeiculoResponseDTO_QuandoDadosValidos() {
        // Arrange
        VeiculoRequestDTO updateRequest = new VeiculoRequestDTO("Corolla", "Toyota", "Prata", "XYZ-9876");
        when(veiculoRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(mockVeiculo));
        when(veiculoRepository.existsByPlaca("XYZ-9876")).thenReturn(false);
        when(veiculoRepository.save(any(Veiculo.class))).thenReturn(mockVeiculo);

        // Act
        VeiculoResponseDTO response = veiculoService.update(1L, updateRequest, 1L);

        // Assert
        assertNotNull(response);
        assertEquals("XYZ-9876", mockVeiculo.getPlaca());
        assertEquals("Corolla", mockVeiculo.getModelo());
        verify(veiculoRepository, times(1)).findByIdAndUserId(1L, 1L);
        verify(veiculoRepository, times(1)).existsByPlaca("XYZ-9876");
        verify(veiculoRepository, times(1)).save(mockVeiculo);
    }

    @Test
    void update_DeveLancarNotFoundException_QuandoVeiculoNaoExistirOuNaoPertencerAoUser() {
        // Arrange
        when(veiculoRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.empty());

        // Act & Assert
        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> veiculoService.update(1L, mockRequestDTO, 1L));

        assertEquals("Veiculo não encontrado para este usuário", exception.getMessage());
        verify(veiculoRepository, times(1)).findByIdAndUserId(1L, 1L);
        verify(veiculoRepository, never()).save(any(Veiculo.class));
    }

    @Test
    void update_DeveLancarModelException_QuandoNovaPlacaJaExistir() {
        // Arrange
        VeiculoRequestDTO updateRequest = new VeiculoRequestDTO(null, null, null, "DEF-5678");
        when(veiculoRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(mockVeiculo));
        when(veiculoRepository.existsByPlaca("DEF-5678")).thenReturn(true);

        // Act & Assert
        ModelException exception = assertThrows(ModelException.class,
                () -> veiculoService.update(1L, updateRequest, 1L));

        assertEquals("Esta placa já está cadastrada no sistema", exception.getMessage());
        verify(veiculoRepository, times(1)).findByIdAndUserId(1L, 1L);
        verify(veiculoRepository, times(1)).existsByPlaca("DEF-5678");
        verify(veiculoRepository, never()).save(any(Veiculo.class));
    }

    @Test
    void update_NaoDeveVerificarPlaca_QuandoPlacaNaoForAlterada() {
        // Arrange
        VeiculoRequestDTO updateRequest = new VeiculoRequestDTO("Civic Touring", null, null, "ABC-1234"); // Mesma placa
        when(veiculoRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(mockVeiculo));
        when(veiculoRepository.save(any(Veiculo.class))).thenReturn(mockVeiculo);

        // Act
        veiculoService.update(1L, updateRequest, 1L);

        // Assert
        verify(veiculoRepository, never()).existsByPlaca(anyString());
        assertEquals("Civic Touring", mockVeiculo.getModelo());
        verify(veiculoRepository, times(1)).save(mockVeiculo);
    }
}