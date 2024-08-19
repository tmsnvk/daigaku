package net.tamasnovak.artifact.comment.controller;

import jakarta.validation.Valid;
import net.tamasnovak.artifact.comment.dto.NewComment;
import net.tamasnovak.artifact.comment.dto.CommentsPagination;
import net.tamasnovak.artifact.comment.service.CommentService;
import net.tamasnovak.validation.annotations.validuuid.ValidUUID;
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

  @GetMapping(value = "/{applicationUuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<CommentsPagination> getAllByApplicationUuid(@PathVariable("applicationUuid") @ValidUUID final UUID applicationUuid,
                                                                    @RequestParam final int page) {
    final CommentsPagination response = commentService.getAllCommentResponsesByApplicationUuid(applicationUuid, page);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(value = "/{applicationUuid}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HttpStatus> postCommentByApplicationUuid(@PathVariable("applicationUuid") @ValidUUID final UUID applicationUuid,
                                                                 @RequestBody @Valid final NewComment requestBody) {
    commentService.postCommentByApplicationUuid(applicationUuid, requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
