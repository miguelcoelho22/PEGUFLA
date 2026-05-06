package br.ufla.PEGUFLA.model.veiculo.dto.response;

import br.ufla.PEGUFLA.model.user.response.UserResponseDTO;
import br.ufla.PEGUFLA.model.veiculo.Veiculo;

//@formatter:off
public record VeiculoResponseDTO(

        Long id,
        String modelo,
        String marca,
        String cor,
        String placa,
        UserResponseDTO user
) {
public VeiculoResponseDTO(Veiculo save) {
    this(save.getId(), save.getModelo(), save.getMarca(), save.getCor(), save.getPlaca(), new UserResponseDTO(save.getUser()));
    }}
