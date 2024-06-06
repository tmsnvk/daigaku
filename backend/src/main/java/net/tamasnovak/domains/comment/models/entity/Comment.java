package net.tamasnovak.domains.comment.models.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.shared.models.entities.audit.Auditable;

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

  protected Comment() {}

  private Comment(Application application, Account account, String content) {
    this.application = application;
    this.account = account;
    this.content = content;
  }

  public static Comment createComment(Application application, Account account, String content) {
    return new Comment(application, account, content);
  }
}
