/**
 * Copyright © [Daigaku].
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
 * Service interface managing {@link Account} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface AccountService {
  /**
   * Finds an {@link Account} object by the provided email.
   *
   * @param email The account's email.
   * @return {@link Account}.
   * @throws EntityNotFoundException Thrown if no account is found with the provided email.
   */
  Account findAccountByEmail(String email);

  /**
   * Finds an {@link Account} object by the provided uuid.
   *
   * @param accountUuid The account's uuid.
   * @return {@link Account}.
   * @throws EntityNotFoundException Thrown if no account is found with the provided uuid.
   */
  Account findAccountByUuid(UUID accountUuid);

  /**
   * Fetches the {@link AuthContextResponse} object associated with the provided email. The object contains authentication details for
   * the user.
   *
   * @param email The email of the account whose authentication context is to be retrieved.
   * @return {@link AuthContextResponse}.
   */
  AuthContextResponse fetchAuthContextResponse(String email);

  /**
   * Fetches a {@link LoginResponse} object for the user based on the provided {@link LoginRequest} and {@link Authentication} details.
   *
   * @param requestBody The request body object containing the user's credentials.
   * @param authentication The user's authentication details provided by the Spring Framework.
   * @return {@link LoginResponse}.
   */
  LoginResponse fetchLoginResponse(LoginRequest requestBody, Authentication authentication);

  /**
   * Validates that no {@link Account} exists with the provided email.
   *
   * @param email The email to check for an existing account.
   * @throws DataIntegrityViolationException Thrown if an account with the given email already exists.
   */
  void validateAccountDoesNotExist(String email);
}
