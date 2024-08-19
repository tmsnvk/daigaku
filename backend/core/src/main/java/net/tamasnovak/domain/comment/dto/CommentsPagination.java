package net.tamasnovak.domain.comment.dto;

import java.util.List;

public record CommentsPagination(
  int totalPages,
  int currentPage,
  long totalComments,
  List<CommentDetails> comments
) {}
