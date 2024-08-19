package net.tamasnovak.artifact.comment.dto;

import java.util.List;

public record CommentPagination(
  int totalPages,
  int currentPage,
  long totalComments,
  List<CommentDetails> comments
) {}
