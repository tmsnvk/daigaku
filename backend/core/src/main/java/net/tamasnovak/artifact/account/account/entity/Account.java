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
import net.tamasnovak.artifact.account.account.dto.AuthContext;
import net.tamasnovak.artifact.account.account.dto.AuthResponse;
import net.tamasnovak.artifact.account.shared.entity.BaseAccount;
import net.tamasnovak.artifact.address.entity.Address;
import net.tamasnovak.artifact.comment.entity.Comment;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Class representing the accounts database entity.
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
   * @param firstName
   * @param lastName
   * @param email
   * @param hashedPassword
   * @param institution
   * @param role
   * @return
   */
  public static Account createAccount(final String firstName, final String lastName, final String email, final String hashedPassword, final Institution institution, final Role role) {
    return new Account(firstName, lastName, email, hashedPassword, institution, role);
  }

  public String getFullName() {
    return this.fullName;
  }

  public String getRoleName() {
    return this.role.getName();
  }

  public String getPasswordForGrantedAuthority() {
    return this.hashedPassword;
  }

  public String getEmail() {
    return this.email;
  }

  /**
   * @return
   */
  public AuthContext createAuthContext() {
    return new AuthContext(this.email, this.firstName, this.role.getName());
  }

  /**
   * @param token
   * @return
   */
  public AuthResponse createAuthResponse(final String token) {
    return new AuthResponse(this.email, this.firstName, this.role.getName(), token);
  }

  /**
   * @param verifyAgainst
   * @param exceptionMessage
   */
  public void verifyAuthAccountUuidAgainstAnother(final UUID verifyAgainst, final String exceptionMessage) {
    if (!this.uuid.equals(verifyAgainst)) {
      throw new IllegalArgumentException(exceptionMessage);
    }
  }

  @Override public int hashCode() {
    return Objects.hash(email, id, uuid);
  }

  @Override public boolean equals(Object o) {
    if (this == o) {
      return true;
    }

    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    Account that = (Account) o;
    return Objects.equals(email, that.email) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
