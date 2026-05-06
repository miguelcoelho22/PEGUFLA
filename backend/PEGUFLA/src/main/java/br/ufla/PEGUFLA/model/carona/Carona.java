package br.ufla.PEGUFLA.model.carona;

import java.time.LocalDateTime;
import java.util.List;

import br.ufla.PEGUFLA.infra.exception.ModelException;
import br.ufla.PEGUFLA.model.enums.StatusViagem;
import br.ufla.PEGUFLA.model.reserva.Reserva;
import br.ufla.PEGUFLA.model.user.User;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "carona")
@Table(name = "carona")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Carona {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String origem;

	@Column(nullable = false)
	private String destino;

	@Column(nullable = false)
	private LocalDateTime horarioSaida;

	@Column(nullable = false)
	private int vagasTotais;

	private int vagasDisponiveis;

	@Enumerated(EnumType.STRING)
	@Column(length = 9, nullable = false)
	private StatusViagem statusViagem;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "veiculo_id", referencedColumnName = "id")
	private Veiculo veiculo;

	@OneToMany(mappedBy = "carona")
	private List<Reserva> reservaList;

	public Carona(String origem, String destino, LocalDateTime horarioSaida, int vagasTotais,
			StatusViagem statusViagem, User user, Veiculo veiculo) {
		this.origem = origem;
		this.destino = destino;
		this.horarioSaida = horarioSaida;
		this.vagasTotais = vagasTotais;
		this.vagasDisponiveis = vagasTotais;
		this.statusViagem = statusViagem;
		this.user = user;
		this.veiculo = veiculo;
	}

	public void confirmarReserva() {
		if (this.vagasDisponiveis <= 0) {
			throw new ModelException("Não há mais vagas disponíveis nesta carona.");
		}

		this.vagasDisponiveis--;

		if(this.vagasDisponiveis == 0) {
			this.statusViagem = StatusViagem.CHEIA;
		}
	}
}
