package br.ufla.PEGUFLA.service;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.mensagem.Mensagem;
import br.ufla.PEGUFLA.model.mensagem.dto.request.MensagemRequestDTO;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.repository.CaronaRepository;
import br.ufla.PEGUFLA.repository.MensagemRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MensagemService {

    private final CaronaRepository caronaRepository;
    private final MensagemRepository mensagemRepository;
    private final EntityManager entityManager;

    @Transactional
    public void enviarMensagem(MensagemRequestDTO mensagemRequestDTO, Long caronaId, Long userId) {

        boolean autorizado = caronaRepository.isUsuarioAutorizadoEAtivo(caronaId, userId);

        if (!autorizado) {
            throw new ModelException("Usuário não tem permissão para enviar mensagens nesta carona ou ela está inativa.");
        }

        Carona caronaProxy = entityManager.getReference(Carona.class, caronaId);
        User remetenteProxy = entityManager.getReference(User.class, userId);

        Mensagem mensagem = new Mensagem();
        mensagem.setTexto(mensagemRequestDTO.texto());
        mensagem.setDataEnvio(LocalDateTime.now());
        mensagem.setCarona(caronaProxy);
        mensagem.setUser(remetenteProxy);

        mensagemRepository.save(mensagem);
    }
}
