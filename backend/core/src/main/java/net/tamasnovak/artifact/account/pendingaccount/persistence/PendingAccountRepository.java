/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.persistence;

import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link PendingAccount} entities.
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface PendingAccountRepository extends JpaRepository<PendingAccount, Long> {
  boolean existsPendingAccountByEmail(String email);
}
