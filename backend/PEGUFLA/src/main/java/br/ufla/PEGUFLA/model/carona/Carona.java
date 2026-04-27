package br.ufla.PEGUFLA.model.carona;

import java.time.LocalDateTime;

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

	private String origem;

	private String destino;

	private LocalDateTime horarioSaida;

	private int vagasTotais;

	private int vagasDisponiveis;

	private StatusViagem statusViagem;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "veiculo_id", referencedColumnName = "id")
	private Veiculo veiculo;

	public Carona(String origem, String destino, LocalDateTime horarioSaida, int vagasTotais, int vagasDisponiveis,
			StatusViagem statusViagem, User user, Veiculo veiculo) {
		this.origem = origem;
		this.destino = destino;
		this.horarioSaida = horarioSaida;
		this.vagasTotais = vagasTotais;
		this.vagasDisponiveis = vagasDisponiveis;
		this.statusViagem = statusViagem;
		this.user = user;
		this.veiculo = veiculo;
	}
}
