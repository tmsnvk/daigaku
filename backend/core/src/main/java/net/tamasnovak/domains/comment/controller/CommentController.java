package net.tamasnovak.domains.comment.controller;

import jakarta.validation.Valid;
import net.tamasnovak.domains.comment.dto.NewComment;
import net.tamasnovak.domains.comment.dto.CommentsPagination;
import net.tamasnovak.domains.comment.service.CommentService;
import net.tamasnovak.validation.annotations.uuidConstraint.UuidConstraint;
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

@RestController
@RequestMapping(path = "/api/comments")
@Validated
public class CommentController {
  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @GetMapping(value = "/{applicationUuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<CommentsPagination> getAllByApplicationUuid(@PathVariable("applicationUuid") @UuidConstraint final String applicationUuid,
                                                                    @RequestParam final int page) {
    final CommentsPagination response = commentService.getAllCommentResponsesByApplicationUuid(applicationUuid, page);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(value = "/{applicationUuid}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HttpStatus> postCommentByApplicationUuid(@PathVariable("applicationUuid") @UuidConstraint final String applicationUuid,
                                                                 @RequestBody @Valid final NewComment requestBody) {
    commentService.postCommentByApplicationUuid(applicationUuid, requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
