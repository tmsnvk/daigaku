package net.tamasnovak.domains.comment.controller;

import jakarta.validation.Valid;
import net.tamasnovak.domains.comment.dtoResponse.CommentDto;
import net.tamasnovak.domains.comment.models.dtoRequests.NewCommentDto;
import net.tamasnovak.domains.comment.service.CommentService;
import net.tamasnovak.validation.annotations.uuidConstraint.UuidConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

  @PostMapping(value = "/{applicationUuid}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<CommentDto> postCommentByApplicationUuid(@PathVariable("applicationUuid") @UuidConstraint String applicationUuid,
                                                                 @RequestBody @Valid NewCommentDto requestBody) {
    CommentDto response = commentService.postCommentByApplicationUuid(applicationUuid, requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(response);
  }
}
