package net.tamasnovak.security.service;

import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.account.account.persistence.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public final class UserDetailsServiceImpl implements UserDetailsService {
  private final AccountRepository accountRepository;

  @Autowired
  public UserDetailsServiceImpl(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Account account = accountRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    SimpleGrantedAuthority role = new SimpleGrantedAuthority(account.getRoleName());

    return new User(account.getEmail(), account.getPasswordForGrantedAuthority(), Collections.singleton(role));
  }
}
