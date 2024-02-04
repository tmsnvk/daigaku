package net.tamasnovak.services.security;

import net.tamasnovak.entities.Account;
import net.tamasnovak.entities.Role;
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
    Account account = accountRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    List<SimpleGrantedAuthority> roles = new ArrayList<>();

    for (Role role : account.getRoles()) {
      roles.add(new SimpleGrantedAuthority(role.getName()));
    }

    return new User(account.getEmail(), account.getHashedPassword(), roles);
  }
}
