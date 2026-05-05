package br.ufla.PEGUFLA.model.reserva;

import br.ufla.PEGUFLA.model.carona.Carona;
import br.ufla.PEGUFLA.model.enums.StatusReserva;
import br.ufla.PEGUFLA.model.reserva.dto.request.ReservaRequestDTO;
import br.ufla.PEGUFLA.model.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity(name = "reserva")
@Table(name = "reserva")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHoraReserva;

    private StatusReserva statusReserva;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "carona_id", nullable = false)
    private Carona carona;

    public Reserva(LocalDateTime dataHoraReserva, StatusReserva statusReserva, User user, Carona carona) {
        this.dataHoraReserva = dataHoraReserva;
        this.statusReserva = statusReserva;
        this.user = user;
        this.carona = carona;
    }
}
