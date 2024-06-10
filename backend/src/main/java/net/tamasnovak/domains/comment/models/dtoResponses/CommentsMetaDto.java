package net.tamasnovak.domains.comment.models.dtoResponses;

import java.util.List;

public record CommentsMetaDto(
  int totalPages,
  int currentPage,
  long totalComments,
  List<CommentDto> comments
) {
//  public CommentsMetaDto(int totalPages, int currentPage, int totalComments, List<CommentDto> comments) {
//    this(
//      totalPages,
//      currentPage,
//      totalComments,
//      comments
//    );
//  }
}
