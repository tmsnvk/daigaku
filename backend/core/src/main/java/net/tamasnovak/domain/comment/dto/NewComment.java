package net.tamasnovak.domain.comment.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record NewComment(
  @NotNull(message = "Fill in the comment field.")
  @Pattern(regexp = "^(.|\\s){5,1000}$", message = "Provide a minimum of 5 and a maximum of 1000 characters.")
  String commentContent
) {}
