/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 * @since 0.0.1
 */
public record NewCommentRequest(
  @NotNull(message = "Fill in the comment field.")
  @Pattern(regexp = "^(.|\\s){5,1000}$", message = "Provide a minimum of 5 and a maximum of 1000 characters.")
  String comment
) {
}
