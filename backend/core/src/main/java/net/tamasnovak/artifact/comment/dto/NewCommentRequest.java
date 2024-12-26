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
public record NewCommentRequest(
  @NotNull(message = "Fill in the comment field.")
  @Pattern(regexp = "^(.|\\s){5,1000}$", message = "Provide a minimum of 5 and a maximum of 1000 characters.")
  String comment
) {
}
