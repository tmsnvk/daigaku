/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.service;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.dto.AuthContext;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;

/**
 * Service interface that manages the "/api/v1/accounts" endpoint.
 *
 * @since 0.0.1
 */
public interface AccountService {
  /**
   * Retrieves an {@link Account} object by the provided email.
   *
   * @param email The account's email.
   * @return {@link Account}
   * @throws EntityNotFoundException If no account is found with the given email.
   */
  Account findAccountByEmail(String email);

  /**
   * Retrieves an {@link Account} object by the provided uuid.
   *
   * @param uuid The account's uuid.
   * @return {@link Account}
   * @throws EntityNotFoundException If no account is found with the given uuid.
   */
  Account findAccountByUuid(UUID uuid);

  /**
   * Retrieves the {@link AuthContext} object associated with the provided email.
   * The object contains authentication details for the logged-in user.
   *
   * @param email The email of the account whose authentication context is to be retrieved.
   * @return {@link AuthContext}
   */
  AuthContext retrieveAuthContextByAccountEmail(String email);

  /**
   * Creates an {@link LoginResponse} object for the user based on the provided {@link LoginRequest} and {@link Authentication} details.
   *
   * @param requestBody The login request object containing user credentials.
   * @param authentication The authentication details of the user provided by the Spring Framework.
   * @return {@link LoginResponse}
   */
  LoginResponse createLoginResponse(LoginRequest requestBody, Authentication authentication);

  /**
   * Checks that no {@link Account} exists with the provided email.
   *
   * @param email The email to check for an existing account.
   * @throws DataIntegrityViolationException If an account with the given email already exists.
   */
  void checkAccountDoesNotExistByEmail(String email);
}
