/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.persistence;

import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link PendingAccount} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface PendingAccountRepository extends JpaRepository<PendingAccount, Long> {
  boolean existsPendingAccountByEmail(String email);
}
