package net.tamasnovak.entities.account.baseAccount;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.address.Address;
import net.tamasnovak.entities.role.Role;

@Entity
@Table(name = "accounts")
public final class Account extends BaseAccount {
  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "hashed_password", nullable = false)
  private String hashedPassword;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  protected Account() {}

  private Account(String firstName, String lastName, String email, String hashedPassword, Role role) {
    super(firstName, lastName, email, role);
    this.hashedPassword = hashedPassword;
  }

  public static Account createAccount(String firstName, String lastName, String email, String hashedPassword, Role role) {
    return new Account(firstName, lastName, email, hashedPassword, role);
  }

  public String getFullName() {
    return fullName;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public Address getAddress() {
    return address;
  }
}
