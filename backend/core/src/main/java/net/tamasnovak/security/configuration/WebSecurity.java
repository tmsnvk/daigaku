/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.security.configuration;

import net.tamasnovak.security.authentication.AuthenticationEntryPointJwt;
import net.tamasnovak.security.authentication.AuthenticationTokenFilter;
import net.tamasnovak.security.utilities.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Web security configuration class.
 *
 * @since 0.0.1
 */
@Configuration
@EnableMethodSecurity
public class WebSecurity {
  private final UserDetailsService userDetailsService;
  private final AuthenticationEntryPointJwt unauthorizedHandler;
  private final JwtUtilities jwtUtilities;

  @Autowired
  public WebSecurity(UserDetailsService userDetailsService, AuthenticationEntryPointJwt unauthorizedHandler, JwtUtilities jwtUtilities) {
    this.userDetailsService = userDetailsService;
    this.unauthorizedHandler = unauthorizedHandler;
    this.jwtUtilities = jwtUtilities;
  }

  /**
   * TODO
   *
   * @return
   */
  public AuthenticationTokenFilter authenticationJwtTokenFilter() {
    return new AuthenticationTokenFilter(jwtUtilities, userDetailsService);
  }

  /**
   * TODO
   *
   * @return
   */
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();

    authenticationProvider.setUserDetailsService(userDetailsService);
    authenticationProvider.setPasswordEncoder(passwordEncoder());

    return authenticationProvider;
  }

  /**
   * TODO
   *
   * @return
   */
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  /**
   * TODO
   *
   * @return
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * TODO
   *
   * @return
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable).cors(AbstractHttpConfigurer::disable)
      .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/v1/accounts/**").permitAll()
        .requestMatchers("/api/v1/applications/").authenticated()
        .requestMatchers("/api/v1/applications/students").hasRole("STUDENT")
        .requestMatchers("/api/v1/application-status/**").authenticated()
        .requestMatchers("/api/v1/comments/**").authenticated()
        .requestMatchers("/api/v1/countries/**").authenticated()
        .requestMatchers("/api/v1/final-destination-status/**").authenticated()
        .requestMatchers("/api/v1/institutions/**").permitAll()
        .requestMatchers("/api/v1/interview-status/**").authenticated()
        .requestMatchers("/api/v1/offer-status/**").authenticated()
        .requestMatchers("/api/v1/pending-accounts/**").permitAll()
        .requestMatchers("/api/v1/roles/**").permitAll()
        .requestMatchers("/api/v1/response-status/**").permitAll()
        .requestMatchers("/api/v1/universities/**").authenticated()
        .requestMatchers("/error/**").permitAll()
        .anyRequest().authenticated())
      .authenticationProvider(authenticationProvider())
      .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
