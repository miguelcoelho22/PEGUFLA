package br.ufla.PEGUFLA.model.user.response;

import br.ufla.PEGUFLA.model.user.User;//@formatter:off
public record UserResponseDTO(
        String name,
        String lastName,
        String email
) {
public UserResponseDTO(User user) {
    this(user.getName(), user.getLastName(), user.getEmail());
    }}
