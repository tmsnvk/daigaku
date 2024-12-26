/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.common.entity;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.common.entity.audit.Auditable;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Abstract entity class that represents an ancestor class for account-related entities.
 */
@MappedSuperclass
public abstract class BaseAccount extends Auditable {
  @Column(name = "first_name", nullable = false)
  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{2,100}$", message =
    "Use only letters and spaces. Provide a minimum of 2 and a maximum of " + "100 characters.")
  protected String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank(message = "Provide a last name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{2,100}$", message =
    "Use only letters and spaces. Provide a minimum of 2 and a maximum of " + "100 characters.")
  protected String lastName;

  @Column(name = "email", unique = true, nullable = false)
  @Email(message = "Provide a valid email address.")
  protected String email;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution-account_reference")
  protected Institution institution;

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  @JsonBackReference(value = "role-account_reference")
  protected Role role;

  protected BaseAccount() {
  }

  protected BaseAccount(String firstName, String lastName, String email, Institution institution, Role role) {
    this.firstName = capitaliseName(firstName);
    this.lastName = capitaliseName(lastName);
    this.email = normaliseEmail(email);
    this.institution = institution;
    this.role = role;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public String getEmail() {
    return this.email;
  }

  /**
   * Fetches the {@link Institution}'s id  associated with the authenticated {@link Account} or {@link PendingAccount}.
   *
   * @return The {@link Institution}'s id.
   */
  public long fetchInstitutionId() {
    return this.institution.getId();
  }

  /**
   * Fetches the {@link Institution}'s name associated with the authenticated {@link Account} or {@link PendingAccount}.
   *
   * @return The {@link Institution}'s name.
   */
  public String fetchInstitutionName() {
    return this.institution.getName();
  }

  /**
   * Fetches the {@link Role}'s name associated with the authenticated {@link Account}.
   *
   * @return {@link Role} name.
   */
  public String fetchRoleName() {
    return this.role.getName();
  }

  /**
   * Fetches the {@link Role}'s name associated with the authenticated {@link Account}, excluding its prefix.
   *
   * @return {@link Role} name.
   */
  public String fetchNoPrefixRoleName() {
    return this.role.fetchNameWithoutPrefix();
  }

  /**
   * Capitalises each word in a name.
   * Words separated by spaces and hyphens are capitalised individually.
   *
   * @param name The name to be capitalised.
   * @return The capitalised name.
   */
  private static String capitaliseName(String name) {
    return Arrays.stream(name.trim().split("\\s+"))
                 .map(BaseAccount::capitaliseWord)
                 .collect(Collectors.joining(" "));
  }

  /**
   * Capitalises a name, including each part of a hyphenated word.
   *
   * @param namePart The name to be capitalised.
   * @return The capitalised name.
   */
  private static String capitaliseWord(String namePart) {
    return Arrays.stream(namePart.split("-"))
                 .map((word) -> Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase())
                 .collect(Collectors.joining("-"));
  }

  /**
   * Normalises the user's entered email.
   *
   * @param email The user's email.
   * @return The normalised email.
   */
  private static String normaliseEmail(String email) {
    return email.toLowerCase();
  }
}
