package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.mensagem.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
}
