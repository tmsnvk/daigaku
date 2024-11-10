/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.common.entity.audit.Auditable;

/**
 * Entity class that represents the comments database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "comments")
public final class Comment extends Auditable {
  @ManyToOne
  @JoinColumn(name = "application_id", nullable = false)
  @JsonBackReference(value = "application-comment_reference")
  private Application application;

  @ManyToOne
  @JoinColumn(name = "account_id", nullable = false)
  @JsonBackReference(value = "account-comment_reference")
  private Account account;

  @Column(name = "content", nullable = false)
  @NotBlank(message = "Add your comment.")
  @Pattern(regexp = "^(.|\\s){5,1000}$", message = "Provide a minimum of 5 and a maximum of 1000 characters.")
  private String content;

  protected Comment() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Comment(Application application, Account account, String content) {
    this.application = application;
    this.account = account;
    this.content = content;
  }

  /**
   * The default comment creator method.
   *
   * @param application The application the comment is associated with.
   * @param account The account the comment is associated with.
   * @param content The comment content.
   * @return {@link Comment}
   */
  public static Comment createComment(
    final Application application,
    final Account account,
    final String content) {
    return new Comment(application, account, content);
  }
}
