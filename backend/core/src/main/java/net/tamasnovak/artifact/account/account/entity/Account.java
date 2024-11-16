/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.entity;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.dto.AuthContextResponse;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.common.entity.BaseAccount;
import net.tamasnovak.artifact.address.entity.Address;
import net.tamasnovak.artifact.comment.entity.Comment;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Entity class that represents the accounts database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "accounts")
public final class Account extends BaseAccount {
  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "hashed_password", nullable = false)
  private String hashedPassword;

  @OneToOne
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  @OneToMany(mappedBy = "account")
  @JsonManagedReference(value = "account-comment_reference")
  private List<Comment> comments;

  protected Account() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Account(String firstName, String lastName, String email, String hashedPassword, Institution institution, Role role) {
    super(firstName, lastName, email, institution, role);
    this.hashedPassword = hashedPassword;
  }

  /**
   * The default account creator method.
   *
   * @param firstName The account's first name.
   * @param lastName The account's last name.
   * @param email The account's email.
   * @param hashedPassword The account's hashed password.
   * @param institution The account's institution.
   * @param role The account's role.
   * @return {@link Account}.
   */
  public static Account createAccount(
    final String firstName, final String lastName, final String email, final String hashedPassword, final Institution institution,
    final Role role) {
    return new Account(firstName, lastName, email, hashedPassword, institution, role);
  }

  public String getFullName() {
    return this.fullName;
  }

  public String getHashedPassword() {
    return this.hashedPassword;
  }

  /**
   * Creates an {@link AuthContextResponse} object for the authenticated user.
   *
   * @return {@link AuthContextResponse}.
   */
  public AuthContextResponse createAuthContextResponse() {
    return new AuthContextResponse(this.email, this.firstName, this.role.getName());
  }

  /**
   * Creates a {@link LoginResponse} object after the user's login was successfully authenticated.
   *
   * @param token The user's current authentication token.
   * @return {@link LoginResponse}.
   */
  public LoginResponse createLoginResponse(final String token) {
    return new LoginResponse(this.email, this.firstName, this.role.getName(), token);
  }

  /**
   * Verifies that the authenticated {@link Account}'s uuid matches the provided uuid.
   *
   * @param uuidToMatch The uuid to compare against the authenticated account's uuid.
   * @param exceptionMessage The message for the exception if the UUIDs do not match.
   * @throws IllegalArgumentException Thrown if the uuids do not match.
   */
  public void verifyAccountUuidMatch(final UUID uuidToMatch, final String exceptionMessage) {
    if (!this.uuid.equals(uuidToMatch)) {
      throw new IllegalArgumentException(exceptionMessage);
    }
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, uuid, email);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }

    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    Account that = (Account) o;
    return Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid) && Objects.equals(email, that.email);
  }
}
