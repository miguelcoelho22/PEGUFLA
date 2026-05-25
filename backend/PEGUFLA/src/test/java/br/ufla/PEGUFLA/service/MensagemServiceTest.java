package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.mensagem.Mensagem;
import br.ufla.PEGUFLA.model.mensagem.dto.request.MensagemRequestDTO;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.repository.MensagemRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MensagemServiceTest {

    @Mock
    private CaronaRepository caronaRepository;

    @Mock
    private MensagemRepository mensagemRepository;

    @Mock
    private EntityManager entityManager;

    @InjectMocks
    private MensagemService mensagemService;

    private MensagemRequestDTO mockRequest;
    private Carona mockCaronaProxy;
    private User mockUserProxy;

    @BeforeEach
    void setUp() {
        mockRequest = new MensagemRequestDTO("Estou chegando no ponto de encontro.");
        mockCaronaProxy = new Carona();
        mockCaronaProxy.setId(10L);
        mockUserProxy = new User();
        mockUserProxy.setId(5L);
    }

    @Test
    void enviarMensagem_DeveSalvarMensagem_QuandoUsuarioEstiverAutorizado() {
        // Arrange
        when(caronaRepository.isUsuarioAutorizadoEAtivo(10L, 5L)).thenReturn(true);
        when(entityManager.getReference(Carona.class, 10L)).thenReturn(mockCaronaProxy);
        when(entityManager.getReference(User.class, 5L)).thenReturn(mockUserProxy);

        // Act
        mensagemService.enviarMensagem(mockRequest, 10L, 5L);

        // Assert
        ArgumentCaptor<Mensagem> mensagemCaptor = ArgumentCaptor.forClass(Mensagem.class);
        verify(mensagemRepository, times(1)).save(mensagemCaptor.capture());

        Mensagem mensagemSalva = mensagemCaptor.getValue();

        assertNotNull(mensagemSalva);
        assertEquals("Estou chegando no ponto de encontro.", mensagemSalva.getTexto());
        assertNotNull(mensagemSalva.getDataEnvio());
        assertEquals(mockCaronaProxy, mensagemSalva.getCarona(), "A carona injetada deve ser o proxy do EntityManager");
        assertEquals(mockUserProxy, mensagemSalva.getUser(), "O usuário injetado deve ser o proxy do EntityManager");

        verify(entityManager, times(1)).getReference(Carona.class, 10L);
        verify(entityManager, times(1)).getReference(User.class, 5L);
    }

    @Test
    void enviarMensagem_DeveLancarModelException_QuandoUsuarioNaoEstiverAutorizado() {
        // Arrange
        when(caronaRepository.isUsuarioAutorizadoEAtivo(10L, 5L)).thenReturn(false);

        // Act & Assert
        ModelException exception = assertThrows(ModelException.class,
                () -> mensagemService.enviarMensagem(mockRequest, 10L, 5L));

        assertEquals("Usuário não tem permissão para enviar mensagens nesta carona ou ela está inativa.", exception.getMessage());

        // Garante que não tentou buscar proxies nem salvar nada no banco
        verify(entityManager, never()).getReference(any(), anyLong());
        verify(mensagemRepository, never()).save(any(Mensagem.class));
    }
}