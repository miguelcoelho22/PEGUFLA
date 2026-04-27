package br.ufla.PEGUFLA.model.veiculo;

import br.ufla.PEGUFLA.model.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "veiculo")
@Table(name = "veiculo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo;

    private String marca;

    private String cor;

    @Column(length = 8)
    private String placa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Veiculo(String modelo, String marca, String cor, String placa, User user) {
        this.modelo = modelo;
        this.marca = marca;
        this.cor = cor;
        this.placa = placa;
        this.user = user;
    }
}
