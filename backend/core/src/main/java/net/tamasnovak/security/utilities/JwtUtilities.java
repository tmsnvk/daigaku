/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.security.utilities;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * JWT token-related utility class.
 *
 * @since 0.0.1
 */
@Component
public final class JwtUtilities {
  @Value("${tamasnovak.app.jwtSecret}")
  private String jwtSecret;
  @Value("${tamasnovak.app.jwtExpirationMs}")
  private int jwtExpirationMs;
  private static final Logger logger = LoggerFactory.getLogger(JwtUtilities.class);

  /**
   * Token generator.
   *
   * @param authentication Spring Security authentication interface.
   * @return A token string.
   */
  public String generateJwtToken(Authentication authentication) {
    UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

    return Jwts.builder()
               .setSubject((userPrincipal.getUsername()))
               .setIssuedAt(new Date())
               .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(key(), SignatureAlgorithm.HS256)
               .compact();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
  }

  /**
   * Token validator.
   *
   * @param authToken An existing token.
   * @return Boolean.
   */
  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);

      return true;
    } catch (MalformedJwtException exception) {
      logger.error("Invalid JWT token: {}.", exception.getMessage());
    } catch (ExpiredJwtException exception) {
      logger.error("JWT token is expired: {}.", exception.getMessage());
    } catch (UnsupportedJwtException exception) {
      logger.error("JWT token is unsupported: {}.", exception.getMessage());
    } catch (IllegalArgumentException exception) {
      logger.error("JWT claims string is empty: {}.", exception.getMessage());
    }

    return false;
  }
}
