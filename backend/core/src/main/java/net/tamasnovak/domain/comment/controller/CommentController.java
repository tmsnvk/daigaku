package net.tamasnovak.domain.comment.controller;

import jakarta.validation.Valid;
import net.tamasnovak.domain.comment.dto.NewComment;
import net.tamasnovak.domain.comment.dto.CommentsPagination;
import net.tamasnovak.domain.comment.service.CommentService;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/comments")
@Validated
public class CommentController {
  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @GetMapping(
    value = "/{applicationUuid}",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<CommentsPagination> getAllByApplicationUuid(@PathVariable("applicationUuid") @ValidUuid final String applicationUuid,
                                                                    @RequestParam final int page) {
    final CommentsPagination response = commentService.getAllCommentResponsesByApplicationUuid(UUID.fromString(applicationUuid), page);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(
    value = "/{applicationUuid}",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HttpStatus> postCommentByApplicationUuid(@PathVariable("applicationUuid") @ValidUuid final String applicationUuid,
                                                                 @RequestBody @Valid final NewComment body) {
    commentService.postCommentByApplicationUuid(UUID.fromString(applicationUuid), body);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
