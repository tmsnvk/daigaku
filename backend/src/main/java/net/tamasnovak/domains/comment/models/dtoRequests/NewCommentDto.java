package net.tamasnovak.domains.comment.models.dtoRequests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record NewCommentDto(
  @NotNull(message = "Fill in the comment field.")
  @Pattern(regexp = "^(.|\\s){5,1000}$", message = "Provide a minimum of 5 and a maximum of 1000 characters.")
  String commentContent
) {}
