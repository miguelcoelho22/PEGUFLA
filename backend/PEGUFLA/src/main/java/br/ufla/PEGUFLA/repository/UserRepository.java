package br.ufla.PEGUFLA.repository;

import br.ufla.PEGUFLA.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {


    Optional<User> findByEmail(String login);
}
