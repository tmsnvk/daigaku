package net.tamasnovak.services.security;

import net.tamasnovak.entities.Account;
import net.tamasnovak.repositories.AccountRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public final class UserDetailsServiceImpl implements UserDetailsService {
  private final AccountRepository accountRepository;

  public UserDetailsServiceImpl(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//    Account account = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
//    List<SimpleGrantedAuthority> roles = new ArrayList<>();
//
//    for (Role role : user.getRoles()) {
//      roles.add(new SimpleGrantedAuthority(role.getName()));
//    }

//    return new User(user.getEmail(), user.getHashedPassword(), roles);
    return null;
  }
}
