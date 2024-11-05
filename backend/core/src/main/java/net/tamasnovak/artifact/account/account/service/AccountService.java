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
import net.tamasnovak.artifact.account.account.dto.AuthContextResponse;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;

/**
 * Service interface for handling database API calls related to the {@link Account} entity.
 *
 * @since 0.0.1
 */
public interface AccountService {
  /**
   * Retrieves an {@link Account} object by the provided email.
   *
   * @param email The account's email.
   * @return A single {@link Account} object.
   * @throws EntityNotFoundException If no account is found with the provided email.
   */
  Account findAccountByEmail(String email);

  /**
   * Retrieves an {@link Account} object by the provided uuid.
   *
   * @param accountUuid The account's uuid.
   * @return A single {@link Account} object.
   * @throws EntityNotFoundException If no account is found with the provided uuid.
   */
  Account findAccountByUuid(UUID accountUuid);

  /**
   * Retrieves the {@link AuthContextResponse} object associated with the provided email.
   * The object contains authentication details for the user.
   *
   * @param email The email of the account whose authentication context is to be retrieved.
   * @return A single {@link AuthContextResponse} object.
   */
  AuthContextResponse fetchAuthContextResponse(String email);

  /**
   * Creates a {@link LoginResponse} object for the user based on the provided {@link LoginRequest} and {@link Authentication} details.
   *
   * @param requestBody The login request object containing user credentials.
   * @param authentication The authentication details of the user provided by the Spring Framework.
   * @return A single {@link LoginResponse} object.
   */
  LoginResponse fetchLoginResponse(LoginRequest requestBody, Authentication authentication);

  /**
   * Checks that no {@link Account} exists with the provided email.
   *
   * @param email The email to check for an existing account.
   * @throws DataIntegrityViolationException If an account with the given email already exists.
   */
  void validateAccountDoesNotExist(String email);
}
