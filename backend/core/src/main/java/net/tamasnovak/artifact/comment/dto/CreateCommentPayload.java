/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.comment.entity.Comment;

/**
 * Represents a request to create a new {@link Comment}.
 *
 * @param comment The comment content submitted by the authenticated user.
 */
public record CreateCommentPayload(
  @NotNull(message = "Add your comment.")
  @Pattern(regexp = "^(.|\\s){15,1000}$", message = "Provide a minimum of 15 and a maximum of 1000 characters.")
  String comment
) {
}
