package br.ufla.PEGUFLA.model.carona.dto.response;


import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.Papel;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.user.response.UserResponseDTO;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import br.ufla.PEGUFLA.model.veiculo.dto.response.VeiculoResponseDTO;

import java.time.LocalDateTime;

public record HistoricoCaronaResponseDTO(
        Long id,

        String origem,

        String destino,

        LocalDateTime horarioSaida,

        StatusViagem statusViagem,

        UserResponseDTO user,

        VeiculoResponseDTO veiculo,

        Papel papel
)
{

    public HistoricoCaronaResponseDTO(Carona carona, Papel papel){
        this(carona.getId(), carona.getOrigem(), carona.getDestino(), carona.getHorarioSaida(), carona.getStatusViagem(), new UserResponseDTO(carona.getUser()), new VeiculoResponseDTO(carona.getVeiculo()), papel);
    }
}
