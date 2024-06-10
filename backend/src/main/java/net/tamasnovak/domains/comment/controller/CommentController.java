package net.tamasnovak.domains.comment.controller;

import jakarta.validation.Valid;
import net.tamasnovak.domains.account.pendingAccount.models.dtoRequests.PendingAccountRegistrationDto;
import net.tamasnovak.domains.comment.models.dtoRequests.NewCommentDto;
import net.tamasnovak.domains.comment.models.dtoResponses.CommentsMetaDto;
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
  public ResponseEntity<CommentsMetaDto> getAllByApplicationUuid(@PathVariable("applicationUuid") @UuidConstraint String applicationUuid,
                                                                  @RequestParam int page) {
    CommentsMetaDto response = commentService.getAllCommentDtosByApplicationUuid(applicationUuid, page);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(value = "/{applicationUuid}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HttpStatus> postCommentByApplicationUuid(@PathVariable("applicationUuid") @UuidConstraint String applicationUuid,
                                                                 @RequestBody @Valid NewCommentDto requestBody) {
    commentService.postCommentByApplicationUuid(applicationUuid, requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
