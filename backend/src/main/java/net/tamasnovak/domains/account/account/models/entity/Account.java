package net.tamasnovak.domains.account.account.models.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.domains.account.account.models.dtoResponses.ClientAuthContextDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.LoginReturnDto;
import net.tamasnovak.domains.account.shared.models.BaseAccount;
import net.tamasnovak.domains.address.models.entity.Address;
import net.tamasnovak.domains.comment.models.entity.Comment;
import net.tamasnovak.domains.role.models.entity.Role;
import net.tamasnovak.domains.support.institution.models.entity.Institution;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

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

  protected Account() {}

  private Account(String firstName, String lastName, String email, String hashedPassword, Institution institution, Role role) {
    super(firstName, lastName, email, institution, role);
    this.hashedPassword = hashedPassword;
  }

  public static Account createAccount(String firstName, String lastName, String email, String hashedPassword, Institution institution, Role role) {
    return new Account(firstName, lastName, email, hashedPassword, institution, role);
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

  public ClientAuthContextDto getAuthContext() {
    return new ClientAuthContextDto(
      this.email,
      this.firstName,
      this.role.getName()
    );
  }

  public LoginReturnDto getLoginData(String token) {
    return new LoginReturnDto(
      this.email,
      this.firstName,
      this.role.getName(),
      token
    );
  }

  public void verifyAuthAccountUuidAgainstAnother(UUID verifyAgainst, String exceptionMessage) {
    if (!this.uuid.equals(verifyAgainst)) {
      throw new IllegalArgumentException(exceptionMessage);
    }
  }

  @Override
  public int hashCode() {
    return Objects.hash(email, id, uuid);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    Account that = (Account) o;
    return Objects.equals(email, that.email) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
