package br.ufla.PEGUFLA.model.user.response;

import br.ufla.PEGUFLA.model.user.User;//@formatter:off
public record UserResponseDTO(

        Long id,
        String name,
        String lastName,
        String email
) {
public UserResponseDTO(User user) {
    this(user.getId(), user.getName(), user.getLastName(), user.getEmail());
    }}
