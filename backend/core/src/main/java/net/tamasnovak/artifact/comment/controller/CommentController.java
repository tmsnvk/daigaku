/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.controller;

import java.util.UUID;

import jakarta.validation.Valid;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.comment.dto.CommentPaginationResponse;
import net.tamasnovak.artifact.comment.dto.NewCommentRequest;
import net.tamasnovak.artifact.comment.entity.Comment;
import net.tamasnovak.artifact.comment.service.CommentService;
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

/**
 * Controller class managing REST API requests related to "/api/v1/comments" endpoint.
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/comments")
@Validated
public class CommentController {
  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  /**
   * Fetches a {@link CommentPaginationResponse} object containing the metadata of comments associated with the given {@link Application}
   * as well as the list of {@link Comment} objects of the selected paginated page.
   * The {@link ValidUuid} annotation validates the uuid string.
   *
   * @param applicationUuid The application's uuid associated with the queried comments.
   * @param page The requested page number.
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code and the {@link CommentPaginationResponse}
   * object.
   */
  @GetMapping(value = "/{applicationUuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<CommentPaginationResponse> fetchPaginationByApplicationUuid(
    @PathVariable("applicationUuid") @ValidUuid final String applicationUuid, @RequestParam final int page) {
    final CommentPaginationResponse response = commentService.findAllCommentsByApplicationUuid(UUID.fromString(applicationUuid), page);

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }

  /**
   * Creates a {@link Comment} object that will be associated with the {@link Application} whose uuid is provided.
   * The {@link ValidUuid} annotations validate the uuid string and the {@link NewCommentRequest} object as per its validation criteria.
   *
   * @param uuid The associated application's uuid.
   * @param requestBody The new comment request body.
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code.
   */
  @PostMapping(value = "/{applicationUuid}", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HttpStatus> createCommentByApplicationUuid(
    @ValidUuid @PathVariable("applicationUuid") final String uuid, @Valid @RequestBody final NewCommentRequest requestBody) {
    commentService.createCommentByApplicationUuid(UUID.fromString(uuid), requestBody);

    return ResponseEntity.status(HttpStatus.CREATED)
                         .build();
  }
}
